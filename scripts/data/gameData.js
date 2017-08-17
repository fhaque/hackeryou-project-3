const GAME_DATA = {
    world: {
        gameModes: ['normal', 'clean-poop', 'feed', 'guess-who', 'win', 'lose']
    },

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
            
            dirtyFactor: 0.1, //multiplier for being dirty

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
            asset:      'assets/medium_poop.png',
            id:         '',
            class:      'game-poop',
        }
    }

};