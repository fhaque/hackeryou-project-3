//Algorithm adapted and modified from:
// http://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#first-attempt
class GameLoop {
    constructor(domElement, timeStep, minRefreshLength, maxUpdateSteps) {
        //limiter for the frames per second of the game
        this.minRefreshLength = minRefreshLength || (CONSTANTS.msecPerSec / CONSTANTS.maxFPS);

        //number of allowed updates of the game logic before
        //the GameLoop believes it's too far behind the render.
        this.maxUpdateSteps = maxUpdateSteps || CONSTANTS.maxGameLogicLag;

        //the time step that the game logic sees. Seperate from
        //game render time.
        this.timeStep = timeStep || this.minRefreshLength;

        this.lastFrameTime = 0; //time since last animation frame update.

        //accumulates time if not repainting next frame fast enough
        this.repaintTimeBuffer = 0; 

        //hold all the sprites that are in the game
        this.sprites = [];

        //Custom Event Handling Register
        this.eventRegistry = {};

        //register game loop handlers
        this.registerEventListener('remove', this.removeSprite.bind(this));

        //game DOM element
        this.domElement = domElement;
    }

    loop(requestFrameMethod, timestamp) {
        
        //limit the framerate of the game by requesting new frame
        //only if the time past is less than the set minimum refresh
        //length.
        if( timestamp < this.lastFrameTime + this.minRefreshLength ) {
            requestFrameMethod( this.loop.bind(this, requestFrameMethod) );
            return;
        }

        //accumulate time buffer since last frame
        this.repaintTimeBuffer += timestamp - this.lastFrameTime;

        this.lastFrameTime = timestamp;

        //how many updates applied to catch up to the buffer
        let numUpdateSteps = 0;

        //update game logic to catchup with game render time
        while (this.repaintTimeBuffer > this.timeStep) {
           this.update();
           this.repaintTimeBuffer -= this.timeStep;
           if (++numUpdateSteps >= this.maxUpdateSteps) {
               this.panic();
               break;
           }
        }

        this.render();

        requestFrameMethod( this.loop.bind(this, requestFrameMethod) );
    }

    update(timeStep) {
        timeStep = timeStep || this.timeStep;

        for(let i = 0; i < this.sprites.length; i++) {
            if ('update' in this.sprites[i]) {
                this.sprites[i].update(timeStep);
            }
        }

        console.log("looping");
    }

    render() {
        for(let i = 0; i < this.sprites.length; i++) {
            if ('render' in this.sprites[i]) {
                this.sprites[i].render();
            }
        }
    }

    pause() {

    }

    panic() {

    }

    removeSprite(sprite) {
        const index = this.sprites.indexOf(sprite);
        this.sprites.splice(index, 1);
    }

    registerSprites(spriteArray) {
        this.sprites = this.sprites.concat(spriteArray);
    }

    registerEventListener(name, cb) {
        if ( !(name in this.eventRegistry) ) {
            this.eventRegistry[name] = [];
        }
        this.eventRegistry[name].push(cb);
    }

    triggerEvent(name, data) {
        if(name in this.eventRegistry) {
            for(let i = 0; i < this.eventRegistry[name].length; i++) {
                this.eventRegistry[name][i](data);
            }
        }
    }

}