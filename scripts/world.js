var world = {};

//initialization of game world
// obj: object provided from gameData.js
// domBindingElement: which DOM element is is the container for the world.
// timeStep: update and draw iteration interval length
world.init = function(obj, domBindingElement, timeStep) {
    $.extend(this, obj);
    this.domElement = domBindingElement;

    this.timeStep = timeStep || (CONSTANTS.msecPerSec / CONSTANTS.maxFPS);

    this.gameMode = 'normal';
};

//initializes the game loop
world.loop = function() {
    var self = this;

    return setInterval(function() {
        self.update();
        self.draw();
        
    }, self.timeStep);
};


//method to update the world's game objects at each iteration
// and to check for any game mode conditions.
world.update = function() {
    var self = this;

    // if (self.gameMode === 'feed') {
    //     trump.domElement.droppable();
    // }

    //make cursor default unless in 'clean-poop' mode.
    if(self.gameMode !== 'clean-poop') {
        $('#game-world').css('cursor','default');
    }
    

    //make trump poop randomly
    if (CONSTANTS.poopProbability > Math.random()) {
        trump.poop();
    }

    //check if player won or lost.
    if ( world.gameMode === 'lose' || world.checkIfWon() ) {
        
        //construct dialog box message for loss or won case.
        var resultHTML;
        if (world.gameMode === 'lose') {
            console.log("LOSE");
            resultHTML = `<h2>You Lose! Trump will tweet about your stupidity!</h2>`
        } else if (world.gameMode === 'win') {
            console.log("WIN");
            resultHTML = `<h2>You Won!</h2><h3> Congrats? Trump will consider you for a cabinet position.</h3>`
        }

        //stop game loop
        clearInterval(this.setIntervalID);

        //display dialog box and do some styling hacks.
        $('#game-result')
        .html(resultHTML)
        .dialog().css('display','block')
        .removeAttr('style').parent().addClass('game-result-dialog');

        $('#game-result').css('display', 'block');
        
        $('.game-result-dialog').removeAttr('style');
    
        $('.game-result-dialog').find('.ui-dialog-titlebar').remove();
    }
    


    trump.update();
    poopFactory.update();
};

world.draw = function() {

    trump.draw();
    gameBars.draw();

    poopFactory.draw();
};

world.checkIfWon = function() {
    if (trump.happinessCounter >= CONSTANTS.happinessCounterWinCondition) {
        world.gameMode = 'win';
        return true;
    } else {
        return false;
    }
}