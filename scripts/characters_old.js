///////////////////////////////////////////////////////
var sprite = {};
sprite.init = function(obj, world) {
    $.extend(this, obj);
    this.world = world;

    this.inDom = false;

    this.createDomElement();
};

sprite.createDomElement = function() {

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

sprite.removeFromDom = function() {
    if (this.inDom) {
        this.domElement.remove();
        this.inDom = false;
    }
};

sprite.addToDom = function() {
    console.log(this.world);
    if (!this.inDom) {
        this.world.domElement.append(this.domElement);
        // this.domElement.appendTo(this.world.domElement);
        this.inDom = true;
    }
};

sprite.draw = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
    sprite.addToDom();

    // console.log(this);

    this.domElement.image.attr('src', this.asset);
};

sprite.update = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
};


///////////////////////////////////////////////////////
var pet = {};
pet.init = function(obj, world) {
    $.extend(this, obj.data);

    $.extend(this, sprite);
    sprite.init.call(this, obj.sprite, world);
};

//Helper Methods //////////////
pet.checkIsDepleted = function(propertyName) {
    return this.data[propertyName].current < this.data[propertyName].min;
};

pet.checkIsMaxed = function(propertyName) {
    return this.data[propertyName].current > this.data[propertyName].max;
};

pet.deltaVal = function(delta, propertyName) {
    this.data[propertyName].current += delta;

    if ( this.checkIsDepleted(propertyName) ) {
        this.data[propertyName].current = this.data[propertyName].min;
    }

    if ( this.checkIsMaxed(propertyName) ) {
        this.data[propertyName].current = this.data[propertyName].max;
    }
};

///////////////////////////////////////////////////////

var trump = {};

trump.init = function(obj, world) {
    $.extend(this, pet);
    pet.init.call(this, obj, world);
};

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

trump.poop = function() {

};

trump.draw = function(timeStep) {
    timeStep = timeStep || this.world.timeStep;
    sprite.addToDom();

    // console.log(this);

    this.domElement.image.attr('src', this.asset);
}

///////////////////////////////////////////////////////