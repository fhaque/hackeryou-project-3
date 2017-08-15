//Algorithm adapted and modified from:
// http://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#first-attempt
class GameLoop {
    constructor(timeStep) {
        //limiter for the frames per second of the game
        this.minRefreshLength = CONSTANTS.msecPerSec / CONSTANTS.maxFPS;

        //the time step that the game physics/data model sees.
        this.timeStep = timeStep || this.minRefreshLength;

        this.lastFrameTime = 0; //time since last animation frame update.

        //accumulates time if not repainting next frame fast enough
        this.repaintTimeBuffer = 0; 
        
        

    }

    loop(requestFrameMethod, timestamp) {
        //limit the framerate of the game by requesting new frame
        //only if the time past is less than the set minimum refresh
        //length.
        if( timestamp < this.lastFrameTime + this.minRefreshLength ) {
            requestFrameMethod( this.loop.bind(this, requestFrameMethod) );
            return;
        }

        


        requestFrameMethod( this.loop.bind(this, requestFrameMethod) );
    }

    pause() {

    }

}