//////////////////////////////////////////////////////////////////////////


// Trump Character


//////////////////////////////////////////////////////////////////////////

var trump = {};
//Initialization function
// obj: accepts Object from gameData.js
// world: accepts a world Object from world.js
trump.init = function(obj, world) {
    //copy properties from object and reference to world
    this.world = world;
    $.extend(this, obj.data);
    $.extend(this, obj.sprite);

    //construct DOM element (jQury Object) and bind to it.
    this.createDomElement();
    this.domElement.css('left', `${this.position.x}%`);
    this.domElement.css('bottom', `${this.position.y}%`);

    //character states
    this.currentMoveState = 'pace';
    this.walkingDirection = 'left';

    this.happinessCounter = 0; //track condition for win.
};

//construct jQuery object of a div with an image.
trump.createDomElement = function() {
    //construct jQuery object and bind to trump object
    this.domElement = $('<div>');
    this.domElement.image = $('<img>');
    this.domElement.append(this.domElement.image);

    //add any game id set by gameData
    if (this.id != '') {
        this.domElement.attr('id', this.id);
    }

    //add any classes set by gameData
    if ('class' in this) {
        this.domElement.addClass(this.class);
    }
    
};

//removes DOM element from the world and page.
trump.removeFromDom = function() {
    if (this.inDom) {
        this.domElement.remove();
        this.inDom = false;
    }
};

//function to add to DOM and world's DOM.
//This is where eventListeners are set for the character.
trump.addToDom = function() {
    var self = this;

    //when game is in 'feed' mode, allow trump DOM element
    //to be droppable.
    if (!this.inDom) {
        trump.domElement.droppable({
            drop: function() {
                self.feed();
                $('.game-food').css('display', 'none');
                self.gameMode = 'normal';  
            }
        });
        
        this.world.domElement.append(this.domElement);
        this.inDom = true;
    }
};

//draw function called by world's draw function during game loop.
// timeStep: not currently used, but specify interval past since last draw
// moveState: not currentl used, but used to tell if there is a sprite
// animation change that needs to happen.
trump.draw = function(timeStep, moveState) {
    timeStep = timeStep || this.world.timeStep;
    this.addToDom();

    this.domElement.image.attr('src', this.asset);
    this.domElement.css('left', `${this.position.x}%`);
    this.domElement.css('bottom', `${this.position.y}%`);

    
};

//update character state in game logic
//timeStep: time interval past since last update.
trump.update = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
    walkingSpeed = CONSTANTS.petWalkingSpeed;

    //Check if Game over by checking if trump is
    //happy and alive.
    if(!this.isAlive() || !this.isHappy()) {
        this.world.gameMode = 'lose';   
    }

    //update Trump's happiness counter if above happiness threshold
    this.updateHappinessCounter();

    //allow standard character movement unless in other gamemodes.
    if (!(this.world.gameMode === 'win') 
        && !(this.world.gameMode === 'lose')
        && !(this.world.gameMode === 'guess-who') ) {
        //move character
        if (this.currentMoveState === 'left') {
            this.moveLeft(walkingSpeed);
        } else if (this.currentMoveState === 'right') {
            this.moveRight(walkingSpeed);
        } else if (this.currentMoveState === 'pace') {
            this.pace(walkingSpeed);
        }

        //time dependent depletion in happiness
        //based on poop on screen and time.
        trump.deltaHappiness(CONSTANTS.timeHappinessDelta - this.dirtyFactor * poopFactory.poopArray.length);

        trump.deltaEnergy(CONSTANTS.timeEnergyDelta);
    }
    
    //shift Trump y-position if smaller screen
    if ($(window).width() < CONSTANTS.smallWindowWidth) {
        this.position.y = 31;
        if ($(window).height() > 400) {
            this.position.y = 25;
        }
    } else {
        this.position.y = 25;
    } 
};

//Change Stats ////////////

trump.isAlive = function() {
    return !this.checkIsDepleted('energy');
};

trump.isHappy = function() {
    return !this.checkIsDepleted('happiness');
};

trump.fullHappiness = function(val) {
    this.happiness.current = this.happiness.max;
}

trump.deltaEnergy = function(delta) {
    this.deltaVal(delta, 'energy');
};

trump.deltaHappiness = function(delta) {
    this.deltaVal(delta, 'happiness');
};

trump.updateHappinessCounter = function() {
    var trumpHappinessPercent = 100 * this.happiness.current / (this.happiness.max - this.happiness.min);
    
    if (trumpHappinessPercent > this.happyTreshold) {
        trump.happinessCounter += 1;
    } 
}

//Function that makes Trump pace left and right.
trump.pace = function(val) {
    if (this.position.x <= this.world.boundary.left + 10) {
        this.moveRight(val);
    } else if (this.position.x >= this.world.boundary.right - 20) {
        this.moveLeft(val);
    } else if (this.walkingDirection === 'left') {
        this.moveLeft(val);
    } else if (this.walkingDirection === 'right') {
        this.moveRight(val);
    }
}

trump.moveLeft = function(val) {
    this.walkingDirection = 'left';
    this.position.x -= val;
    if (this.position.x <= this.world.boundary.left) {
        this.position.x = this.world.boundary.left;
    }
};

trump.moveRight = function(val) {
    this.walkingDirection = 'right';
    this.position.x += val;
    if (this.position.x >= this.world.boundary.right) {
        this.position.x = this.world.boundary.right;
    }
};

//Character/Player action methods ////

trump.poop = function() {
    var poop = poopFactory.createPoop({
                x:trump.position.x, 
                y:trump.position.y - (100 / 2) 
                * (trump.domElement.height() / world.domElement.height()) });
    poop.addToDom();
};

trump.feed = function() {
    this.deltaEnergy(CONSTANTS.feedEnergy);
}

//Helper Methods //////////////
trump.checkIsDepleted = function(propertyName) {
    return this[propertyName].current <= this[propertyName].min;
};

trump.checkIsMaxed = function(propertyName) {
    return this[propertyName].current >= this[propertyName].max;
};

trump.deltaVal = function(delta, propertyName) {
    this[propertyName].current += delta;

    if ( this.checkIsDepleted(propertyName) ) {
        this[propertyName].current = this[propertyName].min;
    }

    if ( this.checkIsMaxed(propertyName) ) {
        this[propertyName].current = this[propertyName].max;
    }
};


//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////


// Health and Energy Bars


//////////////////////////////////////////////////////////////////////////

gameBars = {};

//bind game bars to the character and bind the DOM elements in the game.
// character: game character object that has happiness and energy such as Trump.
gameBars.init = function(character) {
    this.targetCharacter = character;
    this.domElement = $('#game-bars');
    this.domElement.happinessBar = $('#game-happiness-bar .bar__level');
    this.domElement.energyBar = $('#game-energy-bar .bar__level');

};

//update and draw the bar values based on character state.
gameBars.draw = function() {
    var currentHappinessPercentage = 100 * this.targetCharacter.happiness.current / (this.targetCharacter.happiness.max - this.targetCharacter.happiness.min);

    var currentEnergyPercentage = 100 * this.targetCharacter.energy.current / (this.targetCharacter.energy.max - this.targetCharacter.energy.min);

    this.domElement.happinessBar.css('width', `${currentHappinessPercentage}%`);
    this.domElement.energyBar.css('width', `${currentEnergyPercentage}%`);
};

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////


// Poop Factory


//////////////////////////////////////////////////////////////////////////

var poopFactory = {};

poopFactory.init = function(obj, world) {
    this.world = world;
    $.extend(this, obj.data);
    $.extend(this, obj.sprite);

    this.poopArray = [];
};

//create Poop object to put in game world.
// position: initial position of poop in game world.
poopFactory.createPoop = function(position) {
    //bind poop to world and give it position
    const poop = {};
    poop.world = this.world;
    poop.position = position;

    //poop constants
    poop.fallVelocity = CONSTANTS.fallVelocity;
    poop.inDom = false;
    
    //give poop its own DOM element.
    poop.asset = this.asset;
    poop.domElement = this.createDomElement();

    //poop update method to animate falling.
    poop.update = function() {
        this.fall(this.fallVelocity);
        
    };

    poop.draw = function(timeStep) {
        timeStep = timeStep || this.world.timeStep;
        this.addToDom();
    
        this.domElement.image.attr('src', this.asset);
        this.domElement.css('left', `${this.position.x}%`);
        this.domElement.css('bottom', `${this.position.y}%`);
    };

    //positioning poop at each iteration to animate falling.
    // val: fall speed.
    poop.fall = function(val) {
        if (this.position.y <= this.world.boundary.bottom) {
            this.position.y = this.world.boundary.bottom;
        } else {
            this.position.y -= val;
        }
    };

    //add to DOM and contains needed Event Listeners.
    //The even listener will remove poop from DOM and poopFactory's
    // poopArray when player clicks during the 'clean-poop' game state.
    poop.addToDom = function() {
        if (!this.inDom) {
            var self = this;
            //add event listener. Allow poop to be clickable if in
            // 'clean-poop' game mode. Change game mode to 'normal'
            // if all the poop is cleaned.
            this.domElement.on('click', function() {
                if (self.world.gameMode === 'clean-poop') {
                    self.removeFromDom();
                    var index = poopFactory.poopArray.indexOf(self);
                    poopFactory.poopArray.splice(index, 1);

                    //only allow game world to go normal if all the poop
                    //is cleaned.
                    if (poopFactory.poopArray.length === 0) {
                        self.world.gameMode = 'normal';
                    }
                }
            });

            this.world.domElement.append(this.domElement);
            this.inDom = true;
        }
    };

    poop.removeFromDom = function() {
        if (this.inDom) {
            this.domElement.remove();
            this.inDom = false;
        }
    };

    //allow poop to be trackable by poopFactory via poopArray.
    this.poopArray.push(poop);

    return poop;
};

poopFactory.createDomElement = function() {
    var self = this;

    const domElement = $('<div>');
    domElement.image = $('<img>');
    domElement.append(domElement.image);

    if (this.id != '') {
        domElement.attr('id', this.id);
    }

    if ('class' in this) {
        domElement.addClass(this.class);
    }

    return domElement;
};

poopFactory.update = function() {
    for (poop of this.poopArray) {
        poop.update();
    }
};

poopFactory.draw = function() {
    for (poop of this.poopArray) {
        poop.draw();
    }
};

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////


// Food


//////////////////////////////////////////////////////////////////////////
var food = {};
food.init = function(obj, world) {
    this.world = world;
    $.extend(this, obj.data);
    $.extend(this, obj.sprite);

    this.inDom = false;
    this.createDomElement();
};

food.createDomElement = function() {
    
    this.domElement = $('<div>');
    this.domElement.image = $('<img>');
    this.domElement.append(this.domElement.image);

    if (this.id != '') {
        this.domElement.attr('id', this.id);
    }

    if ('class' in this) {
        this.domElement.addClass(this.class);
    }
    
};
    
food.removeFromDom = function() {
    if (this.inDom) {
        this.domElement.remove();
        this.inDom = false;
    }
};

food.addToDom = function() {
    var self = this;

    if (!this.inDom) {
        this.domElement.draggable();
        this.domElement.removeAttr('style');
        
        this.world.domElement.append(this.domElement);
        this.inDom = true;
    }
};

food.draw = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
    this.addToDom();

    this.domElement.image.attr('src', this.asset);
    this.domElement.css('left', `${this.position.x}%`);
    this.domElement.css('bottom', `${this.position.y}%`);
};

food.update = function() {

};