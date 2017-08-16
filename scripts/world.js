var world = {};

world.init = function(domBindingElement, timeStep) {
    this.domElement = domBindingElement;

    this.timeStep = timeStep || (CONSTANTS.msecPerSec / CONSTANTS.maxFPS);

    this.boundary = {};
    this.boundary.left = 0;
    this.boundary.right = 100;
    this.boundary.bottom = 0;
    this.boundary.top = 100;
};

world.loop = function() {
    var self = this;
    // console.log(self);
    return setInterval(function() {
        console.log("HELLO!");
        self.update();
        self.draw();
        
    }, self.timeStep);
};



world.update = function() {
    trump.update();
};

world.draw = function() {
    // sceneBG.draw();
    trump.draw();
    gameBars.draw();
};