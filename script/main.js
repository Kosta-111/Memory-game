import {draw} from "./draw.js";
import {Player} from "./player.js";

let player = new Player();
let opened = null;
let cardsCount = 0;
let attempts = 0;

cardsCount = draw(2, 4);

$('form').on('submit', function(e){
    e.preventDefault();
    var name = $('input[name="player"]').val();
    if (name.length < 1) {
        name = "guest";
    }
    player = Player.load(name);
    $('p').text("Hello " + player.showInfo());
    clear();
    var size = $('option:selected').val();
    switch (size) { 
        case "2":
            cardsCount = draw(3, 4);
            break;
        case "3":
            cardsCount = draw(4, 4);
            break;
        case "1":  
        default:
            cardsCount = draw(2, 4);
            break;
    }
});

function clear() {
    opened = null;
    cardsCount = 0;
    attempts = 0;
    $('input[name="attempts"]').val(attempts);
    $('.play-field').empty();
}

$('.play-field').on('click', '.card', async function() {
    let door = $(this).find('.card-front img');
    if (door.hasClass('animate') 
        || $('.active').length > 1) {
        return;
    }
    $(this).addClass('active');
    await addAnimate(door);
    let cat = $(this).find('.card-back img').attr("src");
    
    if (opened == null) {
        opened = cat;
    }
    else {
        compareImgs(cat);
        attempts++;
        $('input[name="attempts"]').val(attempts);
    }
})

async function compareImgs(cat) {
    if (cat == opened) {
        await addAnimate($('.active').find('.card-back img'));
        cardsCount -= 2;
        checkWin();
    }
    else {
        await removeAnimate($('.active').find('.card-front img'));
    }
    $('div').removeClass('active');
    opened = null;
}

function checkWin() {
    if (cardsCount <= 1) {
        player.lastRes = attempts;
        if (player.record == null || player.record > attempts) {
            player.record = attempts;
        }        
        player.save();
        alert("You winner!!!!!");
    }
}

function addAnimate (...images) {
    return new Promise(resolve => {
        images.forEach(img => {
            img.addClass('animate');
        });
        images[0].on('transitionend', () => resolve());
    });
}

function removeAnimate (...images) {
    return new Promise(resolve => {
        images.forEach(img => {
            img.removeClass('animate');
        });
        images[0].on('transitionend', () => resolve());
    });
}