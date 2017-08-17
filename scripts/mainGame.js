$(function() {


    var worldDomElement = $('#game-world');
    
    world.init(GAME_DATA.world, worldDomElement);
    
    trump.init(GAME_DATA.trump, world);
    
    trump.addToDom();

    gameBars.init(trump);

    poopFactory.init(GAME_DATA.poop, world);
    
    setTimeout(() => trump.poop(), 1000);

    setTimeout(() => trump.poop(), 1600);

    // setTimeout(() => {world.gameMode = 'lose'}, 2000);

    world.gameMode = 'clean-poop';

    world.loop.call(world);
});
