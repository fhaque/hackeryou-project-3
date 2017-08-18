var guessGame = function(gameResult) {
	$('.characterCards').empty();
	$('.win-or-lost').css(`display`, 'none');
	$('.guess-button').show().off();



	var gameData = [
		{
			name: "Steve Bannon", 
			age: "60 - 70",
			gender: "Male",
			hairColor: "Grey",
			eyeColor: "Blue",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/bannon.png'
		},
		{
			name: "Ben Carson",
			age: "60 - 70",
			gender: "Male",
			hairColor: "Salt and Pepper",
			eyeColor: "Brown",
			politicalParty: "Republican",
			ethnicity: "African-American",
			asset: 'assets/guessGame/ben.png'
		},
		{
			name: "Bernie Sanders",
			age: "70 - 80",
			gender: "Male",
			hairColor: "Grey",
			eyeColor: "Hazel",
			politicalParty: "Democratic",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/bernie.png'
		},
		{
			name: "Hillary Clinton",
			age: "60 - 70",
			gender: "Female",
			hairColor: "Blonde",
			eyeColor: "Blue",
			politicalParty: "Democratic",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/hillary.png'
		},
		{
			name: "Ivanka Trump",
			age: "30 - 40",
			gender: "Female",
			hairColor: "Blonde",
			eyeColor: "Brown",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/ivanka.png'
		},
		{
			name: "Jared Kushner",
			age: "30 - 40",
			gender: "Male",
			hairColor: "Brown",
			eyeColor: "Brown",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/jared.png'
		},
		{
			name: "Jeff Sessions",
			age: "70 - 80",
			gender: "Male",
			hairColor: "Grey",
			eyeColor: "Hazel",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/jeff.png'
		},
		{
			name: "Kellyanne Conway",
			age: "50 - 60",
			gender: "Female",
			hairColor: "Blonde",
			eyeColor: "Blue",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/kelly.png'
		},
		{
			name: "Mike Pence",
			age: "50 - 60",
			gender: "Male",
			hairColor: "Grey",
			eyeColor: "Hazel",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/mike.png'
		},
		{
			name: "Barack Obama",
			age: "50 - 60",
			gender: "Male",
			hairColor: "Salt and Pepper",
			eyeColor: "Brown",
			politicalParty: "Democratic",
			ethnicity: "African-American",
			asset: 'assets/guessGame/obama.png'
		},
		{
			name: "Paul Ryan",
			age: "40 - 50",
			gender: "Male",
			hairColor: "Brown",
			eyeColor: "Blue",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/paul.png'
		},
		{
			name: "Vladimir Putin",
			age: "60 - 70",
			gender: "Male",
			hairColor: "Grey",
			eyeColor: "Blue",
			politicalParty: "United Russia",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/putin.png'
		},
		{
			name: "Donald Trump",
			age: "70 - 80",
			gender: "Male",
			hairColor: "Blonde",
			eyeColor: "Blue",
			politicalParty: "Republican",
			ethnicity: "White",
			asset: 'assets/guessGame/trump.png'
		},
		{
			name: "Ted Cruz",
			age: "40 - 50",
			gender: "Male", 
			hairColor: "Salt and Pepper",
			eyeColor: "Brown",
			politicalParty: "Republican",
			ethnicity: "Caucasian",
			asset: 'assets/guessGame/ted.png'
		}
	];
	


	var newCharacterOrder = gameData.sort(function() {
			return 0.5 -  Math.random();
	});
	var mobileCharacters = newCharacterOrder.slice(0,6)

	if ($(window).width() < 768) {
		var array = mobileCharacters
			
	} else {
		var array = newCharacterOrder;
	}

	
	

	var computerChoice = array[Math.floor(Math.random()*array.length)];
	var chosen = [];
	// console.log(chosen);
	for( var element in computerChoice) {
		chosen.push(computerChoice[element]);
	}

	var ageArray = [];
	var genderArray = [];
	var hairArray = [];
	var eyeArray = [];
	var politicalArray = [];
	var ethnicityArray = [];

	for(var i = 0; i < array.length; i++) {
		var person = array[i];
		// console.log(person);
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

	for (var i = 0; i < ageArray.length; i++) {
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
	};

	for (var i = 0; i < genderArray.length; i++) {
		if (genderArray.includes('Female') === false) {
			$('form.gender').hide();
		}
	}
	for (var i = 0; i < hairArray.length; i++) {
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
	}
	for (var i = 0; i < eyeArray.length; i++) {
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
	} 
	for (var i = 0; i < politicalArray.length; i++) {
		if(politicalArray.includes('Democratic') === false) {
			$('#democratic').hide();
		}
		if(politicalArray.includes('United Russia') === false) {
			$('#UR').hide();
		}
		if (politicalArray.includes('United Russia') === false && politicalArray.includes('Democratic') === false){
			$('.party').hide();
		}
	}
	for (var i = 0; i < ethnicityArray.length; i++) {
		if (ethnicityArray.includes('African-American') === false) {
			$('.ethnicity').hide();
		}
	}

	$('.guess-button').on('click', function(e){
		e.preventDefault();
		var buttonVal = $(this).text();
		var buttonCategory = $(this).data('category');
		compareTraits(buttonVal, buttonCategory);
	});

	var compareTraits = function(trait, category) {
		// console.log(trait);
		// console.log(category);
			if (chosen.includes(trait)) {
				// console.log('has it');
				//  _.find(array, function(item) {return item[category] !== trait});
				$('.card').not(`[data-${category}="${trait}"]`).fadeOut();
			} else if (chosen.includes(trait) === false ) {

				$(`.card[data-${category}="${trait}"]`).fadeOut();
			}
	};
	
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
	






