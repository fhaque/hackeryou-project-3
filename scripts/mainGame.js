$(function() {
    var guessGameResults = {};
    guessGameResults.win = false;

    //create jQuery object of the game's container
    var worldDomElement = $('#game-world');
    
    world.init(GAME_DATA.world, worldDomElement);
    
    //initialize game objects
    trump.init(GAME_DATA.trump, world);
    trump.addToDom();

    food.init(GAME_DATA.food, world);
    food.draw();

    gameBars.init(trump);

    poopFactory.init(GAME_DATA.poop, world);

    //display game instructions
    //initialize game when instructions closes.
    $('#game-instructions').dialog({
        open: function() {
            world.gameMode = 'pause';
            $('#game-buttons').hide();
            
        },
        close: function() {
            $('#game-instructions').dialog('destroy').remove();
            world.gameMode = 'normal';
            world.setIntervalID = world.loop.call(world);
            $('#game-buttons').show(); 

        }
    })
    //Apply styling hacks to the dialog box
    .removeAttr('style').parent().addClass('game-instructions-dialog');
    
    $('.game-instructions-dialog').removeAttr('style');

    $('.game-instructions-dialog').find('.ui-dialog-titlebar').addClass('game-instructions-close');

    //create evenListener for the 'feed' game mode button.
    $('#game-feed').on('click', function(){
        world.gameMode = 'feed';
        $('.game-food').removeAttr('style');
        $('.game-food').css('display', 'block');
        $('.game-food').draggable();
    });

    //create eventListener for the 'clean-poop' game mode button.
    $('#game-clean-poop').on('click', function(){
        world.gameMode = 'clean-poop';
        console.log('clicked');
        $('#game-world').css('cursor','url(assets/sponge-medium.png), auto');
    });

    //create eventListener to initialize the 'guess-who' mode.
    $('#game-play-guess-game').on('click', function() {
        $('.guessGame').dialog({
            width: 800,
            open: function() {
                world.gameMode = 'guess-who';
                guessGame(guessGameResults);
                $('.ui-dialog').removeAttr('style');
                $('.guessGame').css('display', 'flex');  
                $('#game-buttons').hide(); 
            },
            //on close, update Trump happiness.
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
