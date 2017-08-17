const CONSTANTS = {
    //GAME LOOP CONSTANTS
    maxFPS: 60, //seconds
    msecPerSec: 1000, // msec/sec
    maxGameLogicLag: 240, // # of allowed updates

    //PET CONSTANTS //
    initialPetHappiness: 80,
    initialPetEnergy: 20,
    initialPetPosition: {
        x: 0,
        y: 25
    },
    minPetHappiness: 0,
    maxPetHappiness: 100,
    minPetEnergy: 0,
    maxPetEnergy: 100,

    feedEnergy: 10,
    
    timeHappinessDelta: -0.01,
    timeEnergyDelta: -0.007
};