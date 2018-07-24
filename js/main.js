var pokemon;

$(document).ready(function() {
	$.each(pokemons, function(name, index) {
		// Searchability by type
		var types = name + ' ' + pokemons[name].fight_style + ' ';
		$.each(pokemons[name].types, function(i, val) {
			types += val + ' ';
		});

		$('#pokemon').append($('<option>', {
			value: name,
			text: name,
			'data-tokens': types,
		}));
	});

	$('#pokemon').change(function() {
		pokemon = pokemons[$(this).val()];
		getPokemon();
		$('input').val('');
	});

	$('input').keyup(function() {
		updateFields();
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

function updateFields() {
	var level = +$('#level').val();

	$('#hitpoints_iv').html(calcIV(pokemon['hitpoints'], +$('#hitpoints').val(), level));
	$('#attack_iv').html(calcIV(pokemon['attack'], +$('#attack').val(), level));
}

function calcIV(base, current, level) {
	var diff = current - (base + level);

	if (diff >= 0 && diff <= 10) // Brass Pot
		return (diff * 10) + '<sup class="brass">Brass</sup>';
	else if (diff >= 50 && diff <= 100) // Bronze Pot
		return ((diff - 50) * 2) + '<sup class="bronze">Bronze</sup>';
	else if (diff >= 150 && diff <= 250) // Silver Pot
		return (diff - 150) + '<sup class="silver">Silver</sup>';
	else if (diff >= 300 && diff <= 400) // Gold Pot
		return (diff - 300) + '<sup class="gold">Gold</sup>';
	else // Still entering value ?
		return 'N/A';
}
