
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

const rightSound = new Audio('assets/sounds/correct.wav');  // Correct match sound
const wrongSound = new Audio('assets/sounds/wrong.wav');
// preload the sound
rightSound.load();
wrongSound.load();

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
        let game = document.getElementById("view"); //Game Box
        let  cards = document.createElement("div");   
        cards.classList.add("cards");  
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

    const box = document.querySelectorAll('.cards'); // Select all the class cards
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

function disableCards() {
    cardOne.removeEventListener('click', flipImage);
    cardTwo.removeEventListener('click', flipImage);

    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');

    resetBoard();
    checkAllFlipped();
}

function checkMatch() {
    if(cardOne.getAttribute('data-item') === cardTwo.getAttribute('data-item')) {
        disableCards();
        rightSound.play();
    }
    else {
        lockBoard = true;
        setTimeout(() => {
            wrongSound.play();  
            unflipCards();     
        }, 300);  
    }  
}

function unflipCards() {

    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        resetBoard();
    }, 1000); // Flip back after 1 second
}

function resetBoard() {
    isFlipped = false;
    lockBoard = false;
    cardOne = null;
    cardTwo = null;
}

function checkAllFlipped() {
    const allCards = document.querySelectorAll('.cards');
    const allFlipped = Array.from(allCards).every(card => 
        card.classList.contains('flip') || card.classList.contains('matched')
    );

    if (allFlipped) {
        setTimeout(() => {
            alert("Congratulations! You've matched all the cards!");
            // resetBoard();
        }, 500);
    }
}

window.onload = function() {
    shuffleImages();
    generateImages();
}

