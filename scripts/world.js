var world = {};

world.init = function(obj, domBindingElement, timeStep) {
    $.extend(this, obj);
    this.domElement = domBindingElement;

    this.timeStep = timeStep || (CONSTANTS.msecPerSec / CONSTANTS.maxFPS);

    this.boundary = {};
    this.boundary.left = 0;
    this.boundary.right = 100;
    this.boundary.bottom = 0;
    this.boundary.top = 100;

    this.gameMode = 'normal';
};

world.loop = function() {
    var self = this;
    // console.log(self);
    return setInterval(function() {
        self.update();
        self.draw();
        
    }, self.timeStep);
};



world.update = function() {
    // console.log(world.gameMode);
    var self = this;
    if (self.gameMode === 'feed') {
        // food.addToDom();
        trump.domElement.droppable();
     } else {
        //  food.removeFromDom();
     }

    if(self.gameMode !== 'clean-poop') {
        $('#game-world').css('cursor','default');
    }

    if (CONSTANTS.poopProbability > Math.random()) {
        trump.poop();
    }

    var trumpHappinessPercent = 100 * trump.happiness.current / (trump.happiness.max - trump.happiness.min);

    if (trumpHappinessPercent > 75) {
        trump.happinessCounter += 1;
    } 
    

    if( world.checkIfWon() ) {
        world.gameMode = 'win';
        console.log("WIN");
    }


    trump.update();
    poopFactory.update();
};

world.draw = function() {
    // sceneBG.draw();
    trump.draw();
    gameBars.draw();

    poopFactory.draw();
    // food.draw();
};

world.checkIfWon = function() {
    return trump.happinessCounter >= CONSTANTS.happinessCounterWinCondition;
}