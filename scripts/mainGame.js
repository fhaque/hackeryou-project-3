var game = new GameLoop( $('body') );

const trump = new Pet(GAME_DATA.trump, game);
const sceneBG = new Sprite(GAME_DATA.sceneBG.sprite, game);

// const poop = new Poop(GAME_DATA.poop, game);

trump.domElement.css('left', '50%');
trump.domElement.css('top', '50%');

game.registerSprites([trump, sceneBG]);

game.poopHandler = function(data) {
    const poop = new Poop(GAME_DATA.poop, this);
    this.registerSprites([poop]);

    // data.relativeTo.domElement.append(poop.domElement);

    poop.domElement.css('left', `${data.startingPosition.x+ 50}%`);
    // poop.domElement.css('top', `${data.startingPosition.y}%`);
}

game.registerEventListener('poop', game.poopHandler.bind(game));




game.loop(window.requestAnimationFrame.bind(this), 0);


setTimeout(() => trump.poop(), 1500);