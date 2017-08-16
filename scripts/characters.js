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
    // console.log(this.world);
    if (!this.inDom) {
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

    if (this.currentMoveState === 'left') {
        this.moveLeft(walkingSpeed);
    } else if (this.currentMoveState === 'right') {
        this.moveRight(walkingSpeed);
    } else if (this.currentMoveState === 'pace') {
        this.pace(walkingSpeed);
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

};


//Helper Methods //////////////
trump.checkIsDepleted = function(propertyName) {
    return this.data[propertyName].current < this.data[propertyName].min;
};

trump.checkIsMaxed = function(propertyName) {
    return this.data[propertyName].current > this.data[propertyName].max;
};

trump.deltaVal = function(delta, propertyName) {
    this.data[propertyName].current += delta;

    if ( this.checkIsDepleted(propertyName) ) {
        this.data[propertyName].current = this.data[propertyName].min;
    }

    if ( this.checkIsMaxed(propertyName) ) {
        this.data[propertyName].current = this.data[propertyName].max;
    }
};


//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////


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

