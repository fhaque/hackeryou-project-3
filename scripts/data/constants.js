const CONSTANTS = {
    //GAME LOOP CONSTANTS
    maxFPS: 60, //seconds
    msecPerSec: 1000, // msec/sec
    maxGameLogicLag: 240, // # of allowed updates

    //PET CONSTANTS //
    initialPetHappiness: 70,
    initialPetEnergy: 60,
    initialPetPosition: {
        x: 0,
        y: 25
    },
    minPetHappiness: 0,
    maxPetHappiness: 100,
    minPetEnergy: 0,
    maxPetEnergy: 100,

    feedEnergy: 10,
    
    timeHappinessDelta: -0.02,
    timeEnergyDelta: -0.07,

    guessGameLoseHappinessDelta: -10,

    poopProbability: 0.001,

    happinessCounterWinCondition: 400
};