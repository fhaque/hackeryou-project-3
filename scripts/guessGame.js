//Guess Who game function
// gameResult: object to pass in that will be modified 
// 			   to gameResult.win = boolean
var guessGame = function(gameResult) {
	//reset DOM elements.
	$('.characterCards').empty();
	$('.win-or-lost').css(`display`, 'none');
	$('.guess-button').show().off();

	var gameData = GAME_DATA.guessGameData;

	//randomize character order
	var newCharacterOrder = gameData.sort(function() {
			return 0.5 -  Math.random();
	});
	
	
	//change the game characters allowed when on smaller screen
	var mobileCharacters = newCharacterOrder.slice(0,6);

	if ($(window).width() < CONSTANTS.smallWindowWidth) {
		var array = mobileCharacters;	
	} else {
		var array = newCharacterOrder;
	}

	//pick a random winning character.
	var computerChoice = array[Math.floor(Math.random()*array.length)];
	var chosen = [];
	for( var element in computerChoice) {
		chosen.push(computerChoice[element]);
	}

	//Dynamically add character card DOM elements
	var ageArray = [];
	var genderArray = [];
	var hairArray = [];
	var eyeArray = [];
	var politicalArray = [];
	var ethnicityArray = [];

	for(var i = 0; i < array.length; i++) {
		var person = array[i];

		$('.characterCards').append(
			`<div class="card" 
					data-age="${person.age}"
					data-gender="${person.gender}" 
					data-hairColor="${person.hairColor}"
					data-eyeColor="${person.eyeColor}"
					data-politicalParty="${person.politicalParty}"
					data-ethnicity="${person.ethnicity}">
			<img src="${person.asset}" alt="Photo of ${person.name}"> 
			<h2>${person.name}</h2>
			</div>`);
		ageArray.push(person.age);
		genderArray.push(person.gender);
		hairArray.push(person.hairColor);
		eyeArray.push(person.eyeColor);
		politicalArray.push(person.politicalParty);
		ethnicityArray.push(person.ethnicity);
	};

<<<<<<< HEAD
		if (ageArray.includes('30 - 40') === false){
			$('#max-40').hide();
		}
		if (ageArray.includes('40 - 50') === false){
			$('#max-50').hide();
		}
		if (ageArray.includes('50 - 60') === false){
			$('#max-60').hide();
		}
		if (ageArray.includes('60 - 70') === false){
			$('#max-70').hide();
		}
		if (ageArray.includes('70 - 80') === false){
			$('#max-80').hide();
		}
		if (genderArray.includes('Female') === false) {
			$('form.gender').hide();
		}
		if (hairArray.includes('Grey') === false) {
			$('#grey').hide();
		}
		if (hairArray.includes('Salt and Pepper') === false) {
			$('#salt-pepper').hide();
		}
		if (hairArray.includes('Blonde') === false) {
			$('#blonde').hide();
		}
		if (hairArray.includes('Brown') === false) {
			$('#brown').hide();
		}
		if (eyeArray.includes('Blue') === false) {
			$('#blue').hide();
		}
		if (eyeArray.includes('Brown') === false) {
			$('#brown').hide();
		}
		if (eyeArray.includes('Green') === false) {
			$('#green').hide();
		}
		if (eyeArray.includes('Hazel') === false) {
			$('#hazel').hide();
		}
		if(politicalArray.includes('Democratic') === false) {
			$('#democratic').hide();
		}
		if(politicalArray.includes('United Russia') === false) {
			$('#UR').hide();
		}
		if (politicalArray.includes('United Russia') === false && politicalArray.includes('Democratic') === false){
			$('.party').hide();
		}
		if (ethnicityArray.includes('African-American') === false) {
			$('.ethnicity').hide();
		}
=======

	if (ageArray.includes('30 - 40') === false){
		$('#max-40').hide();
	}
	if (ageArray.includes('40 - 50') === false){
		$('#max-50').hide();
	}
	if (ageArray.includes('50 - 60') === false){
		$('#max-60').hide();
	}
	if (ageArray.includes('60 - 70') === false){
		$('#max-70').hide();
	}
	if (ageArray.includes('70 - 80') === false){
		$('#max-80').hide();
	}


	if (genderArray.includes('Female') === false) {
		$('form.gender').hide();
	}
	

	if (hairArray.includes('Grey') === false) {
		$('#grey').hide();
	}
	if (hairArray.includes('Salt and Pepper') === false) {
		$('#salt-pepper').hide();
	}
	if (hairArray.includes('Blonde') === false) {
		$('#blonde').hide();
	}
	if (hairArray.includes('Brown') === false) {
		$('#brown').hide();
	}
	

	if (eyeArray.includes('Blue') === false) {
		$('#blue').hide();
	}
	if (eyeArray.includes('Brown') === false) {
		$('#brown').hide();
	}
	if (eyeArray.includes('Green') === false) {
		$('#green').hide();
	}
	if (eyeArray.includes('Hazel') === false) {
		$('#hazel').hide();
	}
>>>>>>> 86aead0d762ddc4194d8bf8d3b0b11052eb870b8


	if(politicalArray.includes('Democratic') === false) {
		$('#democratic').hide();
	}
	if(politicalArray.includes('United Russia') === false) {
		$('#UR').hide();
	}
	if (politicalArray.includes('United Russia') === false && politicalArray.includes('Democratic') === false){
		$('.party').hide();
	}
	

	if (ethnicityArray.includes('African-American') === false) {
		$('.ethnicity').hide();
	}
	
	//when a guess button is clicked, check the guess traits against
	// displayed characters.
	$('.guess-button').on('click', function(e){
		e.preventDefault();
		var buttonVal = $(this).text();
		var buttonCategory = $(this).data('category');
		compareTraits(buttonVal, buttonCategory);
	});

	//if any trait doesn't match with the chosen trait, remove card.
	var compareTraits = function(trait, category) {
			if (chosen.includes(trait)) {
				$('.card').not(`[data-${category}="${trait}"]`).fadeOut();
			} else if (chosen.includes(trait) === false ) {
				$(`.card[data-${category}="${trait}"]`).fadeOut();
			}
	};
	
	//on selecting a card, determine if player won or lost.
	 $('.card').on('click', function() {
	 	var name = $(this).find('h2').text();
	 	if ( name === computerChoice.name ) {
			 gameResult.win = true;
			 $('.win-or-lost').text(`Winner!`);
	 	} else {
			 gameResult.win = false;
			 $('.win-or-lost').text(`Loser!`);
	 	}
		 $('.win-or-lost').css('padding', '10px 20px');
		 $('.win-or-lost').css(`display`, 'block');
	 });
};
	






