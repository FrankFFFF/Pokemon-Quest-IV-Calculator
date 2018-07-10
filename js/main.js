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
	$('#pokemon').val("Omanyte");
	getPokemon("Omanyte");
	updateFields();
});

function getPokemon(name) {
	var pokemon = pokemons[name];

	$('#pokemon_img').attr('src', 'https://www.serebii.net/quest/pokemon/' + pokemon.dex + '.png');
	$('#hitpoints').attr('placeholder', pokemon['hitpoints'] + ' - ' + (pokemon['hitpoints'] + 500));
	$('#hitpoints').attr('min', pokemon['hitpoints']);
	$('#hitpoints').attr('max', pokemon['hitpoints'] + 500);
	$('#attack').attr('placeholder', pokemon['attack'] + ' - ' + (pokemon['attack'] + 500));
	$('#attack').attr('min', pokemon['attack']);
	$('#attack').attr('max', pokemon['attack'] + 500);
}

function updateFields() {
	formdata = {};

	$("form").serializeArray().forEach(function(obj, index) {
		formdata[obj.name] = obj.value;
	});

	var pokemon = pokemons[formdata['pokemon']];
	$('#hitpoints_iv').text(calcIV(pokemon['hitpoints'], +formdata['hitpoints'], +formdata['level']));
	$('#attack_iv').text(calcIV(pokemon['attack'], +formdata['attack'], +formdata['level']));
}

function calcIV(base_attack, current_attack, level) {
	base_attack += level;
	var diff = current_attack - base_attack;

	if (diff >= 0 && diff <= 10) // Brass Pot
		return (diff * 10) + '% (brass)';
	else if (diff >= 50 && diff <= 100) // Bronze Pot
		return ((diff - 50) * 2) + '% (bronze)';
	else if (diff >= 100 && diff <= 250) // Silver Pot (serebii says it's a range of 100, but i have multiple pokemon in the range of 150 - mobile edition)
		return (diff - 150) + '% (silver)';
	else if (diff >= 251 && diff <= 299) // No pokemon should be in this range (maybe silver, but have yet to find any)
		return '¯\\_(ツ)_/¯';
	else if (diff >= 300 && diff <= 400) // Gold Pot
		return (diff - 300) + '% (gold)';
	else // Still entering value ?
		return `N/A`;
}
