$(function() {


    var worldDomElement = $('#game-world');
    
    world.init(worldDomElement);
    
    trump.init(GAME_DATA.trump, world);
    
    trump.addToDom();

    // sceneBG.init(GAME_DATA.sceneBG, world);

    // sceneBG.addToDom();

    // console.log(trump.domElement.parent());
    // console.log(trump);
    
    setTimeout(world.loop.bind(world), 1500);

});
