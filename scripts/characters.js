var trump = {};
trump.init = function(obj, world) {
    this.world = world;
    $.extend(this, obj.data);
    $.extend(this, obj.sprite);

    this.createDomElement();
    this.domElement.css('left', `${this.position.x}%`);
    this.domElement.css('bottom', `${this.position.y}%`);

    this.currentMoveState = 'pace';
    this.walkingDirection = 'left';
};

trump.createDomElement = function() {
    
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
    
trump.removeFromDom = function() {
    if (this.inDom) {
        this.domElement.remove();
        this.inDom = false;
    }
};

trump.addToDom = function() {
    var self = this;

    if (!this.inDom) {
        this.domElement.on('click', function() {
            if(self.world.gameMode === 'feed') {
                self.feed();
                self.world.gameMode = 'normal';
            }
        });
        

        this.world.domElement.append(this.domElement);
        this.inDom = true;
    }
};

trump.draw = function(timeStep, moveState) {
    timeStep = timeStep || this.world.timeStep;
    this.addToDom();

    this.domElement.image.attr('src', this.asset);
    this.domElement.css('left', `${this.position.x}%`);
    this.domElement.css('bottom', `${this.position.y}%`);
};

trump.update = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
    walkingSpeed = 0.2; // 0.2: good for 60fps

    //Check if Game over by checking if trump is
    //happy and alive.
    if(!this.isAlive() || !this.isHappy()) {
        this.world.gameMode = 'lose';
    }

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
        trump.deltaHappiness(CONSTANTS.timeHappinessDelta - this.dirtyFactor * poopFactory.poopArray.length);

        trump.deltaEnergy(CONSTANTS.timeEnergyDelta);
    }
    

    
};

//Change Stats ////////////

trump.isAlive = function() {
    return !this.checkIsDepleted('energy');
};

trump.isHappy = function() {
    return !this.checkIsDepleted('happiness');
};

trump.deltaEnergy = function(delta) {
    this.deltaVal(delta, 'energy');
};

trump.deltaHappiness = function(delta) {
    this.deltaVal(delta, 'happiness');
};

trump.pace = function(val) {
    if (this.position.x <= this.world.boundary.left + 10) {
        this.moveRight(val);
    } else if (this.position.x >= this.world.boundary.right - 50) {
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

//////////////////////////////////////////////////////////////////////////


// Health and Energy Bars


//////////////////////////////////////////////////////////////////////////

gameBars = {};

gameBars.init = function(character) {
    this.targetCharacter = character;
    this.domElement = $('#game-bars');
    this.domElement.happinessBar = $('#game-happiness-bar .bar__level');
    this.domElement.energyBar = $('#game-energy-bar .bar__level');

    // console.log(this.domElement);
};

gameBars.draw = function() {
    var currentHappinessPercentage = 100 * this.targetCharacter.happiness.current / (this.targetCharacter.happiness.max - this.targetCharacter.happiness.min);

    var currentEnergyPercentage = 100 * this.targetCharacter.energy.current / (this.targetCharacter.energy.max - this.targetCharacter.energy.min);

    // this.domElement.happinessBar.css('background-color', 'green');
    this.domElement.happinessBar.css('width', `${currentHappinessPercentage}%`);
    this.domElement.energyBar.css('width', `${currentEnergyPercentage}%`);
};


//////////////////////////////////////////////////////////////////////////


// Poop


//////////////////////////////////////////////////////////////////////////

var poopFactory = {};
poopFactory.init = function(obj, world) {
    this.world = world;
    $.extend(this, obj.data);
    $.extend(this, obj.sprite);

    this.poopArray = [];
};

poopFactory.createPoop = function(position) {
    const poop = {};
    poop.world = this.world;
    poop.position = position;

    poop.fallVelocity = 0.3;
    poop.inDom = false;
    
    poop.asset = this.asset;
    poop.domElement = this.createDomElement();

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

    poop.fall = function(val) {
        if (this.position.y <= this.world.boundary.bottom) {
            this.position.y = this.world.boundary.bottom;
        } else {
            this.position.y -= val;
        }
    };

    poop.addToDom = function() {
        // console.log(this.world);
        if (!this.inDom) {
            var self = this;
            //add event listener
            this.domElement.on('click', function() {
                if (self.world.gameMode === 'clean-poop') {
                    self.removeFromDom();
                    var index = poopFactory.poopArray.indexOf(self);
                    poopFactory.poopArray.splice(index, 1);

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


// Background Scene 


//////////////////////////////////////////////////////////////////////////

// var sceneBG = {};
// sceneBG.init = function(obj, world) {
//     this.world = world;
//     $.extend(this, obj.data);
//     $.extend(this, obj.sprite);

//     this.createDomElement();
//     this.domElement.css('left', `${this.position.x}%`);
//     this.domElement.css('bottom', `${this.position.y}%`);
// };

// sceneBG.createDomElement = function() {
    
//             this.domElement = $('<div>');
//             this.domElement.image = $('<img>');
//             this.domElement.append(this.domElement.image);
    
//             if (this.id != '') {
//                 this.domElement.attr('id', this.id);
//             }
    
//             if ('class' in this) {
//                 this.domElement.addClass(this.class);
//             }
    
//     };
    
// sceneBG.removeFromDom = function() {
//     if (this.inDom) {
//         this.domElement.remove();
//         this.inDom = false;
//     }
// };

// sceneBG.addToDom = function() {
//     // console.log(this.world);
//     if (!this.inDom) {
//         this.world.domElement.append(this.domElement);
//         this.inDom = true;
//     }
// };

// sceneBG.update = function() {

// };

// sceneBG.draw = function(timeStep, moveState) {
//     timeStep = timeStep || this.world.timeStep;
//     this.addToDom();

//     this.domElement.image.attr('src', this.asset);
//     this.domElement.css('left', `${this.position.x}%`);
//     this.domElement.css('bottom', `${this.position.y}%`);
// };

