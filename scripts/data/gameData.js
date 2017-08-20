const GAME_DATA = {
    world: {
        gameModes: ['normal', 'clean-poop', 'feed', 'guess-who', 'win', 'lose'],
        boundary: {
            left: 0,
            right: 100,
            bottom: 0,
            top: 100
        },
    },

    trump: {
        data: {
            states: ['happy', 'angry', 'dirty', 'normal', 'pause'],
            
            happiness: {
                current:    CONSTANTS.initialPetHappiness,
                min:        CONSTANTS.minPetHappiness,
                max:        CONSTANTS.maxPetHappiness,
            },

            energy: {
                current:    CONSTANTS.initialPetEnergy,
                min:        CONSTANTS.minPetEnergy,
                max:        CONSTANTS.maxPetEnergy,
            },
            
            dirtyFactor: 0.05, //multiplier for being dirty

            happyTreshold : 75,

        },
        sprite: {
            position:   CONSTANTS.initialPetPosition,
            asset:      'assets/trump_sample.png',
            id:         'game-trump',
            moveStates: ['left', 'right', 'jumpTo', 'pace']
        }
    },

    sceneBG: {
        data: {},
        sprite: {
            position:   {x: 0, y: 0},
            asset:      '../assets/cartoon-office-BG.jpg',
            id:         'game-sceneBG',
        }
    },

    poop: {
        data: {},
        sprite: {
            position:   CONSTANTS.initialPetPosition,
            asset:      'assets/donmoji-smile.png',
            id:         '',
            class:      'game-poop',
        }
    },

    food: {
        data: {},
        sprite: {
            position:   {x: 10, y: 0},
            asset:      'assets/twitter-bird.png',
            id:         '',
            class:      'game-food'
        }
    },

    guessGameData: [
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
    ],
    

};