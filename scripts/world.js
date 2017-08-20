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
    
        // if( world.checkIfWon() ) {
        //     world.gameMode = 'win';
            

        //     clearInterval(this.setIntervalID);

        //     $('#game-result')
        //     .html('<h2>Congrats? Trump will consider you for a cabinet position.</h2>')
        //     .dialog()
        //     .removeAttr('style').parent().addClass('game-result-dialog');

        //     $('#game-result').css('display', 'block');
            
        //     $('.game-result-dialog').removeAttr('style');
        
        //     $('.game-result-dialog').find('.ui-dialog-titlebar').remove();
        // }

        if ( world.gameMode === 'lose' || world.checkIfWon() ) {
            

            var resultHTML;
            if (world.gameMode === 'lose') {
                console.log("LOSE");
                resultHTML = `<h2>You Lose! Trump will tweet about your stupidity!</h2>`
            } else if (world.gameMode === 'win') {
                console.log("WIN");
                resultHTML = `<h2>You Won!</h2><h3> Congrats? Trump will consider you for a cabinet position.</h3>`
            }

            clearInterval(this.setIntervalID);

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
    // sceneBG.draw();
    trump.draw();
    gameBars.draw();

    poopFactory.draw();
    // food.draw();
};

world.checkIfWon = function() {
    if (trump.happinessCounter >= CONSTANTS.happinessCounterWinCondition) {
        world.gameMode = 'win';
        return true;
    } else {
        return false;
    }
}