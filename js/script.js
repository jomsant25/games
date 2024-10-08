
var imageList = [
    "anger",
    "anxiety",
    "disgust",
    "envy",
    "fear",
    "joy",
    "ennui",
    "sadness"]

let isFlipped = false;
let lockBoard = false;
let cardOne, cardTwo;

const rightSound = 'assets/sounds/correct.wav';  // Correct match sound
// const wrongSound = new Audio('assets/sounds/wrong.wav'); // the sound is annoying


// Shuffle using Fisher-Yates Method
const shuffleImages = () => {
    List = imageList.concat(imageList);
    for(i = List.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random()*(i+1));
        [List[i],List[random]] = [List[random],List[i]];
    }
};

/* Create <div class=cards> <div class=card> <img class=card src=list.item> */
const generateImages = () => {
    List.forEach(item => {
        let game = document.getElementById("container"); //Game Box
        let  cards = document.createElement("div");   
        cards.classList.add("box");  
        cards.setAttribute("data-item",item);

        let frontImg = document.createElement("img");    
        frontImg.classList.add("front-img");
        frontImg.src = `assets/img/babyw-logo-white.png`;

        let backImg = document.createElement("img");    
        backImg.classList.add("back-img");
        backImg.src = `assets/img/${item}.jpg`;

        cards.appendChild(frontImg);
        cards.appendChild(backImg);
        game.appendChild(cards);
    });

    const box = document.querySelectorAll('.box'); // Select all the class cards
    box.forEach(boxImage => {
        boxImage.addEventListener('click',flipImage); // Add a click function on each image
    });
}

function flipImage() { 
    if(lockBoard) return;
    if(this === cardOne) return;

    this.classList.add('flip');

    if (!isFlipped) {
        isFlipped = true;
        cardOne = this;
        return;
    }
        isFlipped = false;
        cardTwo = this;

    checkMatch();
}

function disableCards() { // to prevent the user from clicking before the two cards flipped
    cardOne.removeEventListener('click', flipImage);
    cardTwo.removeEventListener('click', flipImage);

    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');

    resetBoard();
    checkAllFlipped();
}

function checkMatch() {
    if(cardOne.getAttribute('data-item') === cardTwo.getAttribute('data-item')) {
        playSound(rightSound);
        disableCards();
    }
    else {
        lockBoard = true;
        setTimeout(() => {
            // wrongSound.play();  
            unflipCards();     
        }, 300);  
    }  
}

function unflipCards() {

    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        resetBoard();
    }, 500); // Flip back after 0.5 second
}

function resetBoard() {
    isFlipped = false;
    lockBoard = false;
    cardOne = null;
    cardTwo = null;
}

function checkAllFlipped() {
    const allCards = document.querySelectorAll('.box');
    const allFlipped = Array.from(allCards).every(card => 
        card.classList.contains('flip') || card.classList.contains('matched')
    );

    if (allFlipped) {
        coreMemoryImage();
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }
}

function coreMemoryImage() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.play();
}

window.onload = function() {
    shuffleImages();
    generateImages();
}



