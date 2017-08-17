$(function() {

    var guessGameResults = {};
    guessGameResults.win = false;


    var worldDomElement = $('#game-world');
    
    world.init(GAME_DATA.world, worldDomElement);
    
    trump.init(GAME_DATA.trump, world);
    
    trump.addToDom();

    gameBars.init(trump);

    poopFactory.init(GAME_DATA.poop, world);
    
    setTimeout(() => trump.poop(), 1000);

    setTimeout(() => trump.poop(), 1600);

    // setTimeout(() => {world.gameMde = 'lose'}, 2000);

    world.gameMode = 'clean-poop';

    world.loop.call(world);

    $('#game-play-guess-game').on('click', function() {
        $('.guessGame').dialog({
            width: 800,
            open: function() {
                guessGame(guessGameResults);
                world.gameMode = 'guess-who';
                $('.ui-dialog').removeAttr('style');
                $('.guessGame').css('display', 'flex');  
                $('#game-buttons').hide(); 
                // $('.win-or-lost').css(`display`, 'block');  
            },
            close: function() {
                world.gameMode = 'normal';
                $('#game-buttons').show();
                if (guessGameResults.win === true) {
                    trump.fullHappiness();
                } else {
                    trump.deltaHappiness(CONSTANTS.guessGameLoseHappinessDelta);
                }
                // $('.win-or-lost').css(`display`, 'none');
                $('.characterCards').empty();
            }
        });
    });
    
});
