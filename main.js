// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach(letter => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.append(theLetter);
  span.className = 'letter-box';
  lettersContainer.append(span);
});

// object of words + categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Dark Shadows", "Inception", "Parasite", "Interstellar", "Secret Window", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Johnny Depp", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Germany", "France", "Italy", "China", "Egypt", "colombia"]
}

// get random property
let allkeys = Object.keys(words);

// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allkeys.length);

// category
let randomPropName = allkeys[randomPropNumber];

// category words
let randomPropValue = words[randomPropName];

// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;


// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depend on word
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.append(emptySpan);
});

// select gues spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  // select the chose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        })
      }
    })
    // outside loop
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

// end game function
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  div.append(divText);
  div.className = 'popup';
  document.body.append(div);
}