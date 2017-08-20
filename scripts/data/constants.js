const CONSTANTS = {
    //GAME LOOP CONSTANTS
    maxFPS: 60, //seconds
    msecPerSec: 1000, // msec/sec
    maxGameLogicLag: 240, // # of allowed updates

    //GAME WINDOW CONSTANTS
    smallWindowWidth: 768,

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

    petWalkingSpeed: 0.2,

    feedEnergy: 10,
    
    timeHappinessDelta: -0.04,
    timeEnergyDelta: -0.1,

    guessGameLoseHappinessDelta: -10,

    poopProbability: 0.001,

    happinessCounterWinCondition: 400,

    //POOP CONSTANTS
    fallVelocity: 0.3,
};