/*
 * Create a list that holds all of your cards
 */

let cardSymbols = [
  "diamond",
  "paper-plane-o",
  "anchor",
  "bolt",
  "bicycle",
  "cube",
  "leaf",
  "bomb"
];

cardSymbols = [...cardSymbols, ...cardSymbols];

/*Selectors*/
let deck = document.querySelector(".deck"),
  cards = document.querySelector(".deck").children,
  numberOfMoves = document.querySelector(".moves"),
  reset = document.querySelector(".restart"),
  star = document.querySelectorAll(".fa-star");

/*
	Modal Selectors
	Popup Modal (Number of moves && time to win the game)
*/
let modal = document.getElementById("congratulations"),
  numberOfMovesContent = document.querySelector(".numofMoves"),
  yourTime = document.querySelector(".yourTime"),
  rating = document.querySelector(".starRating"),
  timer = document.querySelector(".timer");

/*Variables*/
let moves,
  second = 0,
  currentTimer = 0;

/*Arrays*/
let openCards = [], // Array to hold open Cards
  stars = [...star]; //Hold rating stars

/*
	Initialize the game
*/

startGame();

function startGame() {
  moves = 0;
  numberOfMoves.textContent = "0";
  resetStars();
  shuffle(cardSymbols);
  AddCardSymbols();
  flipCards();
  openCards = [];
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// shuffle the list of cards using the provided "shuffle" method below

// *   - loop through each card and create its HTML
// *   - add each card's HTML to the page

function AddCardSymbols() {
  deck.innerHTML = "";
  let cardContent = "";
  for (let symbol of cardSymbols) {
    cardContent += `<li class="card" data-card="${symbol}"> <i class="fa fa-${symbol}"></i> </li>`;
  }
  deck.innerHTML = cardContent;
}

/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

/*	-Flip Cards Function & check if they are a match
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match*/

function flipCards() {
  let deckOfcards = [...cards]; //Contains list of card Symbols
  for (let card of deckOfcards) {
    card.addEventListener("click", () => {
      if (!card.classList.contains("show")) {
        openCards.push(card);
        if (openCards.length <= 2) {
          card.classList.add("show", "animated", "flipInX");
          matchedCards();
        } else {
          //Prevent user from clicking more than 2 cards
          card.classList.remove("show", "animated", "flipInX");
        }
      }
    });
  }
}

function matchedCards() {
  //Courtesy of Mike Wales FEND P3: Memory Game with Mike Wales

  if (openCards.length === 2) {
    numberofMoves();
    if (openCards[0].dataset.card === openCards[1].dataset.card) {
      openCards[0].classList.add("match", "animated", "pulse");
      openCards[1].classList.add("match", "animated", "pulse");
      openCards[0].classList.remove("show", "flipInX");
      openCards[1].classList.remove("show", "flipInX");
      //Prevent user from clicking the two matched cards
      openCards[0].style.pointerEvents = "none";
      openCards[1].style.pointerEvents = "none";
      openCards = []; //Empty array
      allMatchedCards(); //If the user match the 16 symbols call this function
    } else {
      unmatchedCards();
    }
  }
}

/* 
	if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/

function unmatchedCards() {
  openCards[0].classList.remove("animated", "flipInX");
  openCards[1].classList.remove("animated", "flipInX");
  openCards[0].classList.add("unmatch", "animated", "shake");
  openCards[1].classList.add("unmatch", "animated", "shake");
  setTimeout(() => {
    openCards.forEach(function(card) {
      card.classList.remove("show", "unmatch", "animated", "flipInX", "shake");
    });
    openCards = [];
  }, 1000);
}

/*
	Increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*/

function numberofMoves() {
  moves++;
  numberOfMoves.textContent = moves;

  moves === 1 && (currentTimer = setInterval(startTimer, 500));
  starRating();
}

/*
	Start Rating function
*/
function starRating() {
  //	Reduce Rating to two star
  moves > 15 && ((star[2].style.visibility = "hidden"), stars.splice(2, 1));

  //	Reduce Rating to one star
  moves >= 25 && ((star[1].style.visibility = "hidden"), stars.splice(1, 1));
}

function resetStars() {
  star[2].style.visibility = "visible";
  star[1].style.visibility = "visible";
}

/*
	allMatchedCards function: Check if all the cards have
	been matched 
*/
function allMatchedCards() {
  let matchCard = deck.getElementsByClassName("match");

  if (matchCard.length === 16) {
    /*Get the modal (Courtesy of W3School)*/
    stopTimer();

    //	Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    let button = document.querySelector(".playAgain");

    //	Add number of moves to the modal display
    numberOfMovesContent.textContent = "Number of Moves: " + moves;

    //	Add time to the modal display
    yourTime.textContent = "Time: " + timer.innerHTML;

    //	Add number of stars to the modal
    if (stars.length < 2) {
      rating.textContent = "You earned " + stars.length + " star";
    } else {
      rating.textContent = "You earned " + stars.length + " stars";
    }
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        resetTimer();
      }
    };

    // 	Play again button
    button.onclick = function() {
      startGame();
      resetTimer();
      modal.style.display = "none";
    };
  }
}

/* 
	Start Timer Function: Initialize the timer
*/

function startTimer() {
  let hour = Math.floor(second / 3600);
  let min = Math.floor((second - hour * 3600) / 60);
  let seconds = second - (hour * 3600 + min * 60);
  ++second;
  //	Change the Timer format after 10 seconds

  if (seconds < 10) {
    timer.innerHTML = `0${min}:0${seconds}`;
  } else {
    timer.innerHTML = `0${min}:${seconds}`;
  }

  if (min > 9) {
    timer.innerHTML = `${min}:${seconds}`;
  }
}

/*
	Reset Timer
*/

function resetTimer() {
  clearInterval(currentTimer);
  second = 0;
  timer.innerHTML = "00:00";
}
/*
	Stop timer 
 */
function stopTimer() {
  clearInterval(currentTimer);
}

/*
	Reset Button Function
*/

reset.addEventListener("click", () => {
  startGame();
  resetTimer();
});
