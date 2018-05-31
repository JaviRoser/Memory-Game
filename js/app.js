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
let numberOfMoves = document.querySelector(".moves");
let reset = document.querySelector(".restart");
let star = document.querySelectorAll(".fa-star")
/*Variables*/
let moves = 0;

/*Arrays*/
let openCards = []; // Array to hold open Cards
let stars = [...star];

/*Initialize the game*/
startGame();

function startGame() {
	numberOfMoves.textContent = '0';

	moves = 0;
	resetStars();
	shuffle(cardSymbols);
	AddCardSymbols();
	flipCards();
	// starRating();

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

/*Shuffle Function*/

function AddCardSymbols() {
	deck.innerHTML = '';
	let cardContent = '';
	for (let symbol of cardSymbols) {
		cardContent += `<li class="card" data-card="${symbol}"> <i class="fa fa-${symbol}"></i> </li>`;
	}
	deck.innerHTML = cardContent;
}


/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 
 

/*Get all the cards from the deck*/


// /*Flip Cards Function & check if they are a match
function flipCards() {
	//Spread Operator

	let deckOfcards = [...cards]; //Contains list of card Symbols
	for (let card of deckOfcards) {
		card.addEventListener('click', function () {
			if (!card.classList.contains('show')) {
				openCards.push(card);
				card.classList.add('show', 'animated', 'flipInX');
				matchedCards();
			}

		});
	}
}

/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match*/

function matchedCards() {

	numberofMoves();
	if (openCards.length === 2) {

		if (openCards[0].dataset.card === openCards[1].dataset.card) {

			openCards[0].classList.add('match', 'animated', 'pulse');
			openCards[1].classList.add('match', 'animated', 'pulse');
			openCards[0].classList.remove('show', 'flipInX');
			openCards[1].classList.remove('show', 'flipInX');
			//Prevent user from clicking the matched cards
			openCards[0].style.pointerEvents = 'none';
			openCards[1].style.pointerEvents = 'none';
			openCards = []; //Empty array
			allMatchedCards();


		} else {
			unmatchedCards();

		}


	}


}


/*+ increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
function numberofMoves() {
	moves++;
	numberOfMoves.textContent = moves;
	starRating();

}


function unmatchedCards() {
	//Mike Wales FEND P3: Memory Game with Mike Wales
	openCards[0].classList.remove('animated', 'flipInX');
	openCards[1].classList.remove('animated', 'flipInX');
	openCards[0].classList.add('unmatch', 'animated', 'shake');
	openCards[1].classList.add('unmatch', 'animated', 'shake');
	setTimeout(() => {
		openCards.forEach(function (card) {
			// card.classList.add('unmatch');
			card.classList.remove('show', 'unmatch', 'animated', 'flipInX', 'shake');

		});
		openCards = [];

	}, 1000);
}

/*Start Rating function*/
function starRating() {
	// NumberofMoves();


	console.log(moves);
	if (moves > 16) {
		star[2].style.visibility = "hidden";

		stars.splice(2, 1);
	}
	if (moves >= 35) {
		star[1].style.visibility = "hidden";

		stars.splice(1, 1);
	}
	console.log("my start lenght is" + stars.length); //show me how many starts have in the array

}

function resetStars() {
	star[2].style.visibility = "visible";
	star[1].style.visibility = "visible";
}


function allMatchedCards() {
	let matchCard = deck.getElementsByClassName("match");

	if (matchCard.length == 16) {
		// Get the modal
		/*Courtesy of W3School*/
		let modal = document.getElementById('congratulations');

		// Get the <span> element that closes the modal
		let span = document.getElementsByClassName("close")[0];

		//Add number of moves to the modal Display
		let numberOfMovesContent = document.querySelector(".numofMoves");
		numberOfMovesContent.textContent = "Number of Moves: " + moves;

		//Add number of stars to the modal
		let rating = document.querySelector(".starRating");


		if (stars.length < 2) {
			rating.textContent = textConten = "You got " + stars.length + " star";
		} else {
			rating.textContent = textContent = "You got " + stars.length + " stars";
		}


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

			}
		}


	}
}


// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)


/*
	Reset Function( fix this)
*/

reset.addEventListener('click', startGame);