/*
 * Create a list that holds all of your cards
 */


const cardSymbols = ["diamond",
	"paper-plane-o",
	"anchor",
	"bolt",
	"cube",
	"leaf",
	"bicycle",
	"bomb",
	"diamond",
	"paper-plane-o",
	"anchor",
	"bolt",
	"cube",
	"leaf",
	"bicycle",
	"bomb"
];

/*Selectors*/
let deck = document.querySelector(".deck");
let cards = document.querySelector(".deck").children;
let openCards = []; // Array to hold open Cards
const numberOfMoves = document.querySelector(".moves");

/*Variables*/
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


startGame();

function startGame() {
	let shuffleCards = shuffle(cardSymbols);
	numberOfMoves.textContent = '0';
	AddCardSymbols();
	moves = 0;
}


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

/*Shuffle Function*/

function AddCardSymbols() {
	deck.innerHTML = '';
	let cardContent = '';
	for (let symbol of cardSymbols) {
		cardContent += `<li class="card" data-card="${symbol}"> <i class="fa fa-${symbol}"></i> </li>`;
	}
	deck.innerHTML = cardContent;
}
/*
 * set up the event listener for a card. If a card is clicked:
 
 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*Get all the cards from the deck*/


//Spread Operator
let deckOfcards = [...cards]; //Contains list of card Symbols
// /*Flip Cards Function
// function flipCard(){
for (let card of deckOfcards) {
	card.addEventListener('click', function (e) {

		if (!card.classList.contains('open') && !card.classList.contains('show')) {
			openCards.push(card);
			card.classList.add('open', 'show');
			console.log(openCards.length);
			// clickedCards.push(card);
			// numberOfMoves.textContent=clickedCards.length;

			if (openCards.length == 2) {
				//hide

				if (openCards[0].dataset.card === openCards[1].dataset.card) {

					openCards[0].classList.add('match');
					openCards[1].classList.add('match');
					openCards[0].classList.remove('open', 'show');
					openCards[1].classList.remove('open', 'show');

					// openCards[2].classList.remove('open', 'show','match');

					console.log("this is a match");
					// console.log(openCards[0].dataset.card);
					// console.log(openCards[1].dataset.card);
					openCards = [];
					allMatchedCards();
				} else {
					//Mike Wales FEND P3: Memory Game with Mike Wales
					setTimeout(function () {
						openCards.forEach(function (card) {
							card.classList.remove('open', 'show');
						});
						openCards = [];
					}, 1000);
					moves += 1; //Counting moves
					numberOfMoves.textContent = moves;
				}

			}


		}


		// matchedCards();
	});
}

// }


/*Match two cards(Verify if the two cards that were pushed into openCards Array are a match*/

function allMatchedCards() {
	let matchCard = deck.getElementsByClassName("match");
	if (matchCard.length == 16) {
		// Get the modal
		/*Courtesy of W3School*/
		let modal = document.getElementById('congratulations');

		// Get the <span> element that closes the modal
		let span = document.getElementsByClassName("close")[0];
		let numberOfMovesContent = document.querySelector("numofMoves");
		numberOfMovesContent.textContent = moves;
		modal.style.display = "block";


		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
			startGame();
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
				startGame();
			}
		}


	}
}


// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)


/*
	Reset Function
*/

const reset = document.querySelector(".restart");

reset.addEventListener('click', function (e) {
	for (let card of deckOfcards) {
		card.classList.remove("open", "show");
		// console.log (card);
	};

	// startGame();

});