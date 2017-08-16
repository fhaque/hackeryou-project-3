$(function() {


    var worldDomElement = $('#game-world');
    
    world.init(worldDomElement);
    
    trump.init(GAME_DATA.trump, world);
    
    trump.addToDom();

    gameBars.init(trump);
    
    setTimeout(world.loop.bind(world), 1500);


    


});
