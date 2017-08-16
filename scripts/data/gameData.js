const GAME_DATA = {
    trump: {
        data: {
            states: ['happy', 'angry', 'dirty', 'normal'],
            
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
            
            dirtyLimit: 2, //number of poops

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
            asset:      'assets/cartoon-office-BG.png',
            id:         'game-sceneBG',
        }
    },

    poop: {
        data: {},
        sprite: {
            position:   CONSTANTS.initialPetPosition,
            asset:      'assets/small_poop.png',
            id:         '',
            class:      'game-poop',
        }
    }

};