var game = null;

$(document).ready(function(){
    game = new MemoryMatchOOP();
    game.initializeApp();
});

class MemoryMatchOOP{
    constructor(){
        this.gotCorrect = 0;
        this.gotWrong = 0;
        this.triedNum = 0;
        this.accuracy = 0;
        this.gameWinLoseCount = 0;
        this.soundOn = false;
        this.matchPlayed = 0;
        this.playAdder = true;

        this.first_clickedCard = null;
        this.second_clickedCard = null;
        this.gameActivityObject = null;
    }

    initializeApp(){
        $('.cardBack').mouseover(this.gameActivityObject.hoverMusic);
        clickHandler();
        $('.modal-btn').click(nextLevel);
        $('.reset').click(reset);
        $('.mute').click(soundOnOff);
    }

    soundOnOff(){
        this.soundOn = !this.soundOn;
        if(this.soundOn){
            $('.mute > img').attr('src', './images/extra/speater.svg');
            this.gameActivityObject.themeMusic();
        } else {
            $('.mute > img').attr('src', './images/extra/speakerMute.png');
            this.gameActivityObject.themeMusic();
        }
    }

    reset(){
        this.gotCorrect = 0;
        this.gotWrong = 0;
        this.triedNum = 0;
        this.accuracy = 0;
        this.gameWinLoseCount = 0;
        this.playAdder = true;

        this.first_clickedCard = null;
        this.second_clickedCard = null;
        $('.correct').text(gotCorrect).css('font-size', '40px').css('color', 'green');
        $('.wrong').text(gotWrong).css('font-size', '40px').css('color', 'red');
        $('.accuracy').text(accuracy).css('font-size', '40px').css('color', 'blue');
        $('.cardBack').show();

    }

    clickHandler(){
        $('.cardBack').click(function(){
            if(playAdder){
                matchPlayed++;
                $('.playedNum').text(matchPlayed);
            }
            playAdder = false;
            if(first_clickedCard === null){
                first_clickedCard = $(this);
                $(this).hide();
            } else {
                second_clickedCard = $(this);
                $(this).hide();
                var isSame = checkForSimilarity();
                if(isSame){
                    first_clickedCard.hide();
                    second_clickedCard.hide();
                    first_clickedCard = null;
                    second_clickedCard = null;
                } else {
                    first_clickedCard.show(1000);
                    second_clickedCard.show(1000);
                    first_clickedCard = null;
                    second_clickedCard = null;
                }
            }
        });
    }
    checkForSimilarity(){
        if(first_clickedCard.parent('.card').find('.cardFront img').attr('src') === second_clickedCard.parent('.card').find('.cardFront img').attr('src')){
            gameActivityObject.matchMusic();
            // var newDiv = $('<div>').addClass('infoUnhide');
            // $('.infoSection').append(newDiv);
            gotCorrect++;
            triedNum = gotCorrect + gotWrong;
            $('.correct').text(gotCorrect).css('font-size', '40px').css('color', 'green');
            calAccuracy();
            gameWinLoseCount++;
            if(gameWinLoseCount === 9){
                playAdder = true;
                gameActivityObject.winMusic();
                $('.card').attr('id', 'gamePlayAnimation');
                var animationEnd = document.getElementById('gamePlayAnimation');
                // animationEnd.addEventListener("webkitAnimationEnd", myfunction);
                animationEnd.addEventListener("animationend", afterAnimation);
                function afterAnimation(){
                    $('.gamePlay > *').css('display', 'none');
                    $('.modal').show();
                }

            }
            return true;
        } else {
            gameActivityObject.notMatchMusic();
            gotWrong++;
            triedNum = gotCorrect + gotWrong;
            $('.wrong').text(gotWrong).css('font-size', '40px').css('color', 'red');
            calAccuracy();
            return false;
        }
        // console.log(first_clickedCard.parent('.card').find('.cardFront img').attr('src'));
    }

    calAccuracy(){
        this.accuracy = ((this.gotCorrect/this.triedNum) * 100).toFixed(2) + '%';

        $('.accuracy').text(this.accuracy).css('font-size', '40px').css('color', 'blue');
    }

    gameActivityObject = {
        soundsTheme: new Audio('./sounds/harryPTheme.mp3'),
        themeMusic: function () {
            if (soundOn) {
                this.soundsTheme.play();
                this.soundsTheme.loop = true;
            } else {
                debugger;
                this.soundsTheme.pause();
            }
        },
        hoverMusic: function () {
            if (soundOn) {
                var sounds = new Audio('./sounds/hoverClick.mp3');
                sounds.play();
            }
        },
        notMatchMusic: function () {
            if (soundOn) {
                var sounds = new Audio('./sounds/noMatch.mp3');
                sounds.play();
            }

        },
        matchMusic: function () {
            if (soundOn) {
                var sounds = new Audio('./sounds/match.mp3');
                sounds.play();
            }

        },
        winMusic: function () {
            if (soundOn) {
                var sounds = new Audio('./sounds/win.mp3');
                sounds.play();
            }

        }
    }

}