var pictures = [
    'images/characters/chang.jpg',
    'images/characters/dracoM.jpg',
    'images/characters/dumbledore.jpg',
    'images/characters/hagrid.png',
    'images/characters/hannah.jpg',
    'images/characters/harry.jpg',
    'images/characters/hermione.jpg',
    'images/characters/snape.png',
    'images/characters/voldemort.jpg'
]

function nextLevel(){
    $('.modal').hide();
    reset();
    $('.card').removeAttr('id');
    $('.gamePlay *').attr({
        'style': {
            'display':'relative'
        }
    });
    $('.cardBack > img').attr({
        'src': 'images/backgrounds/snowAnimation.gif'
    });
    var shufArray = getShuffledArray();
    dynamicPicturesBoard(shufArray);
}

function getShuffledArray(){
    //this array has been doubled with two copies of itself
    var copyOfPictures = [...pictures, ...pictures];
    var shufA = [];
    for( var i = 0; i < pictures.length*2; i++){
        var ranN = Math.floor(Math.random() * copyOfPictures.length);
        shufA.push(copyOfPictures[ranN]);
        copyOfPictures.splice(ranN, 1);
    }
    return shufA;
}

function dynamicPicturesBoard(shufArray){
    var allImgDivs = $('.cardFront > img');

    for(var j = 0; j < shufArray.length; j++){
        $(allImgDivs[j]).attr('src', shufArray[j]);
    }
}
