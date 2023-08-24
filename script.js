//declaring the brard and amount of pairs and arranging them in an array
const board = document.querySelector(".board");
const numOfPairs = 15; // essentially 30 cards
const cards = []; //15 pairs of cards - 1,1,2,2,3,3--15,15
let attempts = 0;
let timer = 0;

let timerInterval = setInterval(() => {
	timer++;
	const date = new Date(timer * 1000);
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	document.querySelector(".timer").innerHTML = `${
		minutes < 10 ? "0" + minutes : minutes
	}: ${seconds < 10 ? "0" + seconds : seconds}`;
}, 1000);

// styling the board
board.style.gridTemplateColumns = "repeat(6, 1fr)";

//establishing the cards array
for (let i = 1; i <= numOfPairs; i++) {
	cards.push(i, i);
}
// a check- console.log(cards);

//establishing the board
for (let i = 1; i <= numOfPairs * 2; i++) {
	const randCard = Math.floor(Math.random() * cards.length); // randomize an index of the cards array
	// a check- console.log(cards[randCard]);

	const divCard = document.createElement("div");
	divCard.innerHTML = `<span>${cards[randCard]}</span>`;
	board.appendChild(divCard);

	// a check- console.log(divBoard);

	cards.splice(randCard, 1); // remove the chosen card from the array and the board

	//adding an event handler to the cards
	divCard.addEventListener("click", function () {
		const showingCards = board.querySelectorAll(".showing");

		if (showingCards.length < 2) {
			// Allow flipping only if less than 2 cards are already showing

			divCard.classList.add("showing");
			const chosenCards = board.querySelectorAll(".showing");

			//check if there are 2 cards already showing and declaring there indexes
			if (chosenCards.length === 2) {
				const firstCard = chosenCards[0];
				const secondCard = chosenCards[1];
				document.querySelector(".counter").innerHTML = ++attempts;

				//check if the values of the cards are the same
				if (firstCard.innerText === secondCard.innerText) {
					setTimeout(() => {
						firstCard.classList.remove("showing");
						secondCard.classList.remove("showing");
						firstCard.classList.add("hidden");
						secondCard.classList.add("hidden");
						clearBoard();
					}, 1000);
				} else {
					setTimeout(() => {
						firstCard.classList.remove("showing");
						secondCard.classList.remove("showing");
					}, 1000);
				}
			}
		}
	});
}

function clearBoard() {
	const unsolvedCards = board.querySelectorAll("div:not(.hidden)");
	if (!unsolvedCards.length) {
		clearInterval(timerInterval);
		confetti({
			particleCount: 100,
			spread: 70,
			decay: 0.9,
			origin: { y: 0.6 },
		});
	}
}
