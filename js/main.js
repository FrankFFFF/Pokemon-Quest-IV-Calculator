var pokemon;

$(document).ready(function() {
	$.each(pokemons, function(name, i) {
		// Searchability by type
		var types = name + ' ' + pokemons[name].fight_style + ' ';
		$.each(pokemons[name].types, function(j, type) {
			types += type + ' ';
		});

		$('#pokemon').append($('<option>', {
			value: name,
			text: name,
			'data-tokens': types
		}));
	});

	$('#pokemon').change(function() {
		pokemon = pokemons[$(this).val()];
		getPokemon();
		$('input').val('');
	});

	$('input').keyup(function() {
		updateFields(this.id);
	})

	pokemon = pokemons[$('#pokemon').val()];
	getPokemon();

	$('#pokemon').attr({
		'class': 'selectpicker',
		'data-live-search': true
	}).selectpicker('render');

	// HACK: tmp, or table overflow
	$('#level').parent().css('width', '20%');
});

function getPokemon() {
	var serebii = 'https://www.serebii.net/quest/pokemon/' + pokemon.dex;

	$('#serebii')
		.attr('href', serebii + '.shtml')
		.children().attr('src', serebii + '.png');

	$('#hitpoints').attr({
		'placeholder': pokemon['hitpoints'] + ' - ' + (pokemon['hitpoints'] + 500),
		'min': pokemon['hitpoints'],
		'max': pokemon['hitpoints'] + 500
	});

	$('#attack').attr({
		'placeholder': pokemon['attack'] + ' - ' + (pokemon['attack'] + 500),
		'min': pokemon['attack'],
		'max': pokemon['attack'] + 500
	});
}

function updateFields(field) {
	var level = +$('#level').val();

	if (!level) {
		$('#level').focus();
		return;
	}

	$('#' + field + '_iv').html(calcIV(pokemon[field], +$('#' + field).val(), level));
}

function calcIV(base, current, level) {
	var diff = current - (base + level),
		iv = {
			'value': 0,
			'pot': ''
		};

	if (diff >= 0 && diff <= 10) // Brass Pot
		result = {
			'value': (diff * 10),
			'pot': 'brass'
		}
	else if (diff >= 50 && diff <= 100) // Bronze Pot
		result = {
			'value': ((diff - 50) * 2),
			'pot': 'bronze'
		}
	else if (diff >= 150 && diff <= 250) // Silver Pot
		result = {
			'value':(diff - 150),
			'pot': 'silver'
		}
	else if (diff >= 300 && diff <= 400) // Gold Pot
		result = {
			'value': (diff - 300),
			'pot': 'gold'
		}
	else // Still entering value ?
		return 'N/A';

	return result.value + '<sup class="' + result.pot +'">' + result.pot + '</sup>'
}
