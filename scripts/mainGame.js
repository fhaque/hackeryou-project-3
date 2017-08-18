// document.body.requestFullscreen();

$(function() {
    $('#game-instructions').dialog().removeAttr('style').parent().addClass('game-instructions-dialog');
    $('.game-instructions-dialog').removeAttr('style');

    $('.game-instructions-dialog').find('.ui-dialog-titlebar').addClass('game-instructions-close');



    var guessGameResults = {};
    guessGameResults.win = false;


    var worldDomElement = $('#game-world');
    
    world.init(GAME_DATA.world, worldDomElement);
    
    trump.init(GAME_DATA.trump, world);
    
    trump.addToDom();

    food.init(GAME_DATA.food, world);
    food.draw();

    gameBars.init(trump);

    poopFactory.init(GAME_DATA.poop, world);
    
    setTimeout(() => trump.poop(), 1000);

    setTimeout(() => trump.poop(), 1600);


    $('#game-feed').on('click', function(){
        world.gameMode = 'feed';
        $('.game-food').removeAttr('style');
        $('.game-food').css('display', 'block');
        $('.game-food').draggable();
    });

    $('#game-clean-poop').on('click', function(){
        world.gameMode = 'clean-poop';
        console.log('clicked');
        $('#game-world').css('cursor','url(assets/sponge-medium.png), auto');
    });
    // setTimeout(() => {world.gameMde = 'lose'}, 2000);

    world.gameMode = 'normal';

    world.loop.call(world);

    $('#game-play-guess-game').on('click', function() {
        $('.guessGame').dialog({
            width: 800,
            open: function() {
                world.gameMode = 'guess-who';
                guessGame(guessGameResults);
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
            }
        });
    });
    
});
