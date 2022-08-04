let game = document.getElementById('game');
let character = document.getElementById('character');
let interval;
let both = 0;
let counter = 0;
let score = document.querySelector('#score');

let counterArray = []

// move user with keyboard

function moveLeft() {
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (characterXpos > 4) {
        character.style.left = characterXpos - 1 + 'px';
    }
}

function moveRight() {
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (characterXpos < 234) {
        character.style.left = characterXpos + 1 + 'px';
    } 
}

document.addEventListener('keydown', function(e) {
    if (both == 0) {
        both++;
        if (e.key == 'ArrowLeft') {
            charMove = setInterval(moveLeft, 1);
        }
        if (e.key == 'ArrowRight') {
            charMove = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener('keyup', function(e) {
    clearInterval(charMove);
    both = 0;
});

// move user on mobile or with click

let charMove;

function moveLeftMobile() {
    
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (characterXpos > 4) {
        charMove = setInterval(moveLeft, 10);
    }   
}

function moveRightMobile() {
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (characterXpos < 234) {
        charMove = setInterval(moveRight, 10);
    }   
}

document.addEventListener('touchend', function(e) {
    clearInterval(charMove);
    both = 0;
});

// draw blocks and holes on game board + track score

let blocks = setInterval(function() {

    let prevBlockTop = 0;
    let prevHoleTop = 0;
    let prevBlock = document.getElementById('block' + (counter - 1));
    let prevHole = document.getElementById('hole' + (counter - 1));

    if (counter > 0) {
        prevBlockTop = parseInt(window.getComputedStyle(prevBlock).getPropertyValue('top'));
        prevHoleTop = parseInt(window.getComputedStyle(prevHole).getPropertyValue('top'));
    }

    if (prevBlockTop < 250 || counter == 0) {
        let block = document.createElement('div');
        block.setAttribute('class', 'block');
        block.setAttribute('id', 'block' + counter);
        block.style.top = prevBlockTop + 50 + 'px';

        let hole = document.createElement('div');
        hole.setAttribute('class', 'hole');
        hole.setAttribute('id', 'hole' + counter);
        hole.style.top = prevHoleTop + 50 + 'px';

        let randomPosition = Math.floor(Math.random() * 210);
        hole.style.left = randomPosition + 'px';

        game.appendChild(block);
        game.appendChild(hole);
        counterArray.push(counter);
        counter++;
        score.textContent = counter;
    }

    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let drop = 0;

    // game over + display final score 

    if (characterTop <= 0) {
        alert('Game Over! Final Score: ' + counter);
        clearInterval(blocks);
        clearInterval(charMove);
    }

    for (i = 0; i < counterArray.length; i++) {
        let current = counterArray[i];
        let currentBlock = document.getElementById('block' + current);
        let currentHole = document.getElementById('hole' + current);
        let currentBlockTop = parseFloat(window.getComputedStyle(currentBlock).getPropertyValue('top'));
        currentHoleLeft = parseFloat(window.getComputedStyle(currentHole).getPropertyValue('left'));
        currentBlock.style.top = currentBlockTop - 0.5 + 'px';
        currentHole.style.top = currentBlockTop - 0.5 + 'px';

        // count blocks toward score but remove from array once above game board

        if (currentBlockTop < -10) {
            counterArray.shift();
            currentBlock.remove();
            currentHole.remove();
        }

        // do not let user drop unless into a hole

        if (currentBlockTop - 11 < characterTop && currentBlockTop > characterTop) {
            drop++;
            if (currentHoleLeft <= characterLeft && currentHoleLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    
    if (drop == 0) {
        if (characterTop < 285) {
            character.style.top = characterTop + 1 + 'px'
        } 
    }   else {
            character.style.top = characterTop - 1 + 'px';
        }
}, 10);
