var pokemon;

$(document).ready(function() {
	$.each(pokemons, function(name, index) {
		// Searchability by type
		var types = name + ' ';
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
		updateFields();
	});

	$('input').keyup(function() {
		updateFields();
	})

	pokemon = pokemons[$('#pokemon').val()];
	getPokemon();
	updateFields();

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
	}).val('');

	$('#attack').attr({
		'placeholder': pokemon['attack'] + ' - ' + (pokemon['attack'] + 500),
		'min': pokemon['attack'],
		'max': pokemon['attack'] + 500
	}).val('');
}

function updateFields() {
	var level = +$('#level').val();

	$('#hitpoints_iv').html(calcIV(pokemon['hitpoints'], +$('#hitpoints').val(), level));
	$('#attack_iv').html(calcIV(pokemon['attack'], +$('#attack').val(), level));
}

function calcIV(base, current, level) {
	var diff = current - (base + level),
		pot = '<span class="pot ';

	if (diff >= 0 && diff <= 10) // Brass Pot
		pot += 'brass">' + (diff * 10) + '% (Brass)';
	else if (diff >= 50 && diff <= 100) // Bronze Pot
		pot += 'bronze">' + ((diff - 50) * 2) + '% (Bronze)';
	else if (diff >= 100 && diff <= 250) // Silver Pot (serebii says it's a range of 100, but i have multiple pokemon in the range of 150 - mobile edition)
		pot += 'silver">' + (diff - 150) + '% (Silver)';
	else if (diff >= 251 && diff <= 299) // No pokemon should be in this range (maybe silver, but have yet to find any)
		pot += '">¯\\_(ツ)_/¯';
	else if (diff >= 300 && diff <= 400) // Gold Pot
		pot += 'gold">' + (diff - 300) + '% (Gold)';
	else // Still entering value ?
		pot += '">N/A';

	return pot + '</span>';
}
