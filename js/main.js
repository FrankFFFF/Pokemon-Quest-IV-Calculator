$(document).ready(function() {
	// Add each of the pokemon options to the select element
	Object.keys(pokemons).forEach(function(pokemon, index) {
		$('#pokemon').append($('<option>', {
			value: pokemon,
			text: '#' + pokemons[pokemon].dex + ' - ' + pokemon
		}));
	});

	$('#pokemon').change(function() {
		getPokemon($(this).val());
		updateFields();
	});

	$('input').change(function() {
		updateFields();
	})

	// Make Omanyte the default Pokemon.
	$('#pokemon').val('Omanyte');
	getPokemon('Omanyte');
	updateFields();
});

function getPokemon(name) {
	var pokemon = pokemons[name], serebii = 'https://www.serebii.net/quest/pokemon/' + pokemon.dex;

	$('#serebii').attr('href', serebii + '.shtml').children().attr('src', serebii + '.png');

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
	var formdata = pokemon = {};

	$("form").serializeArray().forEach(function(obj, index) {
		formdata[obj.name] = obj.value;
	});

	pokemon = pokemons[formdata['pokemon']];
	$('#hitpoints_iv').html(calcIV(pokemon['hitpoints'], +formdata['hitpoints'], +formdata['level']));
	$('#attack_iv').html(calcIV(pokemon['attack'], +formdata['attack'], +formdata['level']));
}

function calcIV(base_attack, current_attack, level) {
	base_attack += level;
	var diff = current_attack - base_attack, pot = '<span class="pot ';

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
