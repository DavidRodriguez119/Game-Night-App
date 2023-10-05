
// Global variables for each user
var user1 = {
  username: ``,
  genreSelected: ``,
  plotSelected: ``,
};
var user2 = {
  username: ``,
  genreSelected: ``,
  plotSelected: ``,
};

// Object to store all the movies within each genre
var movies = {
  animation: {

  },
  action: {

  },
  horror: {

  },
  comedy: {

  },
  romance: {

  }
};

// Store the initial deck in the following variable
var deck;
var cardUser1;
var cardUser2;

// HTML section IDs into JS variables
var landingPage = document.getElementById(`landing-page`);
var usernamePage = document.getElementById(`username-page`);
var genrePage = document.getElementById(`genre-page`);
var plotPickerPage = document.getElementById(`plot-picker-page`);
var gamePage = document.getElementById(`game-page`);
var winPage = document.getElementById(`win-page`);
var usernameDisplayP1 = document.getElementsByClassName(`username-display-p1`);
var usernameDisplayP2 = document.getElementsByClassName(`username-display-p2`);

// HTML buttons IDs into JS variables
var startButton = document.getElementById(`start-button`);
var submitButton = document.getElementById(`submit-button`);
var genreButton = document.getElementById(`genre-button`);
var plotButton = document.getElementById(`plot-picker-button`);
var deckImg = document.getElementById(`deck-img`);

// HTML plot picker forms into JS variables
var plotPickerP1 = document.getElementById(`plot-picker-p1`);
var plotPickerP2 = document.getElementById(`plot-picker-p2`);
var againButton = document.getElementById(`again-button`);

// Game elements into JS Variables
var gameResults = document.getElementById(`game-results`);
var player1Card = document.getElementById(`player-1-card`);
var player2Card = document.getElementById(`player-2-card`);
var timerNum = document.getElementById(`timer`);
var card1Text = document.getElementById(`card1-text`);
var card2Text = document.getElementById(`card2-text`);

// hide all pages but landing page on default
usernamePage.style.display = 'none';
genrePage.style.display = 'none';
plotPickerPage.style.display = 'none';
gamePage.style.display = 'none';
winPage.style.display = 'none';

// Modals IDs to JS variables
var usernamesModal = document.getElementById(`modal1`);
var genreModal = document.getElementById(`modal2`);
var plotsModal = document.getElementById(`modal3`);

// Create the empty p tag and call dislpay function on page load
var lastTimeP = document.createElement("p");
displayLastWinner();
// FUnction to dislpay the last winner if it exists, is called on page load and when you play again
function displayLastWinner() {
  if (localStorage.getItem("lastWinner" && "lastMovie") !== null) {
    var previousWinner = localStorage.getItem("lastWinner");
    var previousMovie = localStorage.getItem("lastMovie")
    lastTimeP.textContent = "Last time you played " + previousWinner + " won and you watched " + previousMovie + "!  Who will win this time?"
    landingPage.appendChild(lastTimeP);
  };
}

// When the app is loaded do the following:
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

// Movies Fetch for animation
var animation = [`soul`, `the lion king`, `spirited away`, `spider-man: across the spider-verse`, `kubo and the two strings`, `onward`, `inside out`, `shrek`, `big hero 6`, `how to train your dragon`];
var animationURL = animation.map((str) => str.replace(/ /g, `+`));
var animationVariables = animation.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < animation.length; i++) {
  var requestUrl = `https://www.omdbapi.com/?apikey=b8b94e2d&t=${animationURL[i]}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movies.animation[animationVariables[i]] = data
    });
};

// Movies Fetch for horror
var horror = [`the unholy`, `the conjuring`, `the pope's exorcist`, `annabelle comes home`, `the exorcist`, `american psycho`, `halloween`, `barbarian`, `the ring`, `insidious`];
var horrorURL = horror.map((str) => str.replace(/ /g, `+`));
var horrorVariables = horror.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < horror.length; i++) {
  var requestUrl = `https://www.omdbapi.com/?apikey=b8b94e2d&t=${horrorURL[i]}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movies.horror[horrorVariables[i]] = data
    });
};

// Movies Fetch for action
var action = [`die hard`, `john wick`, `the matrix`, `casino royale`, `the dark knight rises`, `upgrade`, `terminator 2`, `red dawn`];
var actionURL = action.map((str) => str.replace(/ /g, `+`));
var actionVariables = action.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < action.length; i++) {
  var requestUrl = `https://www.omdbapi.com/?apikey=b8b94e2d&t=${actionURL[i]}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movies.action[actionVariables[i]] = data
    });
};

// Movies Fetch for comedy
var comedy = [`step brothers`, `airplane`, `strays`, `anger management`, `21 jump street`, `that's my boy`, `the 40-year-old virgin`, `borat`, `bridesmaids`, `happy gilmore`, `hot rod`];
var comedyURL = comedy.map((str) => str.replace(/ /g, `+`));
var comedyVariables = comedy.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < comedy.length; i++) {
  var requestUrl = `https://www.omdbapi.com/?apikey=b8b94e2d&t=${comedyURL[i]}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movies.comedy[comedyVariables[i]] = data
    });
};

var romance = [`a star is born`, `the notebook`, `la la land`, `the vow`, `brokeback mountain`, `titanic`, `me before you`, `a walk to remember`, `across the universe`];
var romanceURL = romance.map((str) => str.replace(/ /g, `+`));
var romanceVariables = romance.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < romance.length; i++) {
  var requestUrl = `https://www.omdbapi.com/?apikey=b8b94e2d&t=${romanceURL[i]}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movies.romance[romanceVariables[i]] = data
    });
};
// Deck of Cards Fetch
var requestUrl = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    deck = data
  });

// Start Button click event listener
startButton.addEventListener(`click`, function (event) {
  landingPage.style.display = `none`
  usernamePage.style.display = `block`
});

// Submit usernames Btn click event Listener
submitButton.addEventListener(`click`, function (event) {
  event.preventDefault();
  // create variables for the two input HTML tags
  var player1 = document.getElementById(`player-1`);
  var player2 = document.getElementById(`player-2`);
  // check if the users enter their usernames
  if (player1.value === `` || player2.value === ``) {
    // var elems = usernamesModal;
    var modalInstance = M.Modal.init(usernamesModal);
    modalInstance.open();
  } else {
    // Store the usernames
    user1.username = player1.value;
    user2.username = player2.value;
    // Display the next page
    usernamePage.style.display = `none`;
    genrePage.style.display = `flex`;
  }
  setUsernameDisplays();
})
var checkboxContainer
// Genre button event listener
genreButton.addEventListener(`click`, function (event) {
  event.preventDefault();
  // Check for valid selection
  if (selectP1.value === "" || selectP2.value === "") {
    var modalInstance = M.Modal.init(genreModal);
    modalInstance.open();
  } else {
    // Store the selected genres
    user1.genreSelected = selectP1.value;
    user2.genreSelected = selectP2.value;

    var genreSelectedObject1 = Object.keys(movies[user1.genreSelected]);
    var genreSelectedObject2 = Object.keys(movies[user2.genreSelected]);

    // Function to randomly shuffle the array fed into it
    function shuffle(array) {
      let currentIndex = array.length;
      // While loop that uses the Fisher Yates Shuffle
      while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  }
  // Calls the function and passes in each genre array
  shuffle(genreSelectedObject1);
  shuffle(genreSelectedObject2);
  // Pulls out the first 5 options from the shuffled array
  var randomPlotP1 = genreSelectedObject1.slice(0, 5);
  var randomPlotP2 = genreSelectedObject2.slice(0, 5);

  // Display plots based on user1 genre
  for (let i = 0; i < randomPlotP1.length; i++) {
    // Create elements 
    var containerP = document.createElement(`p`);
    var label = document.createElement(`label`);
    var checkbox = document.createElement(`input`);
    checkbox.setAttribute(`type`, `radio`);
    checkbox.setAttribute(`name`, `checkbox-p1`)
    containerP.setAttribute(`class`, 'checkbox-container');
    var plotText = document.createElement(`span`);
    // Select the i plot
    var plot = movies[user1.genreSelected][randomPlotP1[i]].Plot
    // add content to the span tag
    plotText.textContent = plot;
    // append elements
    plotPickerP1.appendChild(containerP);
    containerP.appendChild(label);
    label.append(checkbox, plotText);
  };
  // Display plots based on user2 genre
  for (let i = 0; i < randomPlotP2.length; i++) {
    // Create elements 
    var containerP = document.createElement(`p`);
    var label = document.createElement(`label`);
    var checkbox = document.createElement(`input`);
    checkbox.setAttribute(`type`, `radio`);
    checkbox.setAttribute(`name`, `checkbox-p2`);
    containerP.setAttribute(`class`, 'checkbox-container');
    var plotText = document.createElement(`span`);
    // Select the i plot
    var plot = movies[user2.genreSelected][randomPlotP2[i]].Plot
    // add content to the span tag
    plotText.textContent = plot;
    // append elements
    plotPickerP2.appendChild(containerP);
    containerP.appendChild(label);
    label.append(checkbox, plotText);
  };

  // Display next page
  genrePage.style.display = `none`;
  plotPickerPage.style.display = `flex`;
  checkboxContainer = document.getElementsByClassName("checkbox-container");
});

plotButton.addEventListener(`click`, function (event) {
  event.preventDefault();
  // Grab all checkboxes
  var checkBoxesP1 = plotPickerP1.querySelectorAll(`input[type="radio"]`);
  var checkBoxesP2 = plotPickerP2.querySelectorAll(`input[type="radio"]`);
  // Create boolean variable for validation
  var isCheckedP1 = false;
  var isCheckedP2 = false;
  // Loop using if statement to check for 1 box to be checked, change variable to true, and store index of checkbox for plot text later
  for (let i = 0; i < checkBoxesP1.length; i++) {
    if (checkBoxesP1[i].checked) {
      isCheckedP1 = true;
      var checkedP1 = i;
      break;
    }
  }
  // Conditional statement to check if one is checked
  if (!isCheckedP1) {
    var modalInstance = M.Modal.init(plotsModal);
    modalInstance.open();
    // Return to prevent double alerts
    return;
  } else {
    // Loop using if statement to check for 1 box to be checked, change variable to true, and store index of checkbox for plot text later
    for (let i = 0; i < checkBoxesP2.length; i++) {
      if (checkBoxesP2[i].checked) {
        isCheckedP2 = true;
        var checkedP2 = i;
        break;
      }
    }
    // Conditional statement to check if one is checked
    if (!isCheckedP2) {
      var modalInstance = M.Modal.init(plotsModal);
      modalInstance.open();
    } else {
      // Grab the spans containing plots
      var spanP1 = plotPickerP1.querySelectorAll(`span`);
      var spanP2 = plotPickerP2.querySelectorAll(`span`);
      // Grab the span that corresponds to the checked box
      var checkedSpanP1 = spanP1[checkedP1];
      var checkedSpanP2 = spanP2[checkedP2];
      // Store the plot within
      user1.plotSelected = checkedSpanP1.textContent;
      user2.plotSelected = checkedSpanP2.textContent;
      // Hide current page and display next
      plotPickerPage.style.display = `none`;
      gamePage.style.display = `flex`;
    }
  }
});

var clicks = 0
function drawCards() {
  clicks++;
  gameResults.textContent = ``
  if (clicks <= 2) {
    // When the image is clicked, draw a card for user1
    var requestUrl = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // save the usefull information to the respective user
        if (clicks === 1) {
          cardUser1 = data.cards[0];
          // Show image for player 1
          player1Card.setAttribute(`src`, cardUser1.image)
          player1Card.style.display = `block`
          card1Text.textContent = `${user1.username} - ${cardUser1.value} of ${cardUser1.suit}`
          // Display instructions for player 2
          document.getElementById(`user-playing`).textContent = user2.username
        } else {
          cardUser2 = data.cards[0];
          // Show image for player 2
          player2Card.style.display = `block`
          player2Card.setAttribute(`src`, cardUser2.image);
          card2Text.textContent = `${user2.username} - ${cardUser2.value} of ${cardUser2.suit}`
          game();
        }
      });
  } else {
    deckImg.removeEventListener(`click`, game);
  };
};

// deck image event listener
deckImg.addEventListener(`click`, drawCards);

// Grab select elements
var selectP1 = document.getElementById("select-p1");
var selectP2 = document.getElementById("select-p2");

// Loop for player 1 genre selector
for (var genre in movies) {
  var option = document.createElement("option");
  option.setAttribute("value", genre);
  option.textContent = genre;
  selectP1.appendChild(option);
};

// Loop for player 2 genre selector
for (var genre in movies) {
  var option = document.createElement("option");
  option.setAttribute("value", genre);
  option.textContent = genre;
  selectP2.appendChild(option);
};

// Again Btn event Listener
againButton.addEventListener(`click`, function (event) {
  // Hide the cards and winner 
  player1Card.setAttribute(`src`, ``)
  player1Card.style.display = `none`
  player2Card.setAttribute(`src`, ``)
  player2Card.style.display = `none`
  card1Text.textContent = ``;
  card2Text.textContent = ``;

  gameResults.textContent = ``
  document.querySelector(`#timer-text`).style.display = `none`
  timerNum.textContent = ``;

  // reset the clicks variable
  clicks = 0;
  var checkboxLength = checkboxContainer.length;

  for (let i = 0; i < checkboxLength; i++) {
    checkboxContainer[0].remove();
  };
  // Display the Start page
  winPage.style.display = `none`;
  landingPage.style.display = `flex`;
  // Call function to display last winner message
  displayLastWinner();
});

// Function to update username displays after they are entered
function setUsernameDisplays() {
  for (let i = 0; i < usernameDisplayP1.length; i++) {
    usernameDisplayP1[i].textContent = user1.username;
  }
  for (let i = 0; i < usernameDisplayP2.length; i++) {
    usernameDisplayP2[i].textContent = user2.username;
  };
};

function game() {
  var value1;
  var value2;
  // Assign the value to the card of user1
  if (cardUser1.value === `ACE`) {
    value1 = 11;
  } else if (cardUser1.value === `KING` || cardUser1.value === `JACK` || cardUser1.value == `QUEEN`) {
    value1 = 10
  } else {
    value1 = parseInt(cardUser1.value)
  }
  // Assign the value to the card of user2
  if (cardUser2.value === `ACE`) {
    value2 = 11;
  } else if (cardUser2.value === `KING` || cardUser2.value === `JACK` || cardUser2.value == `QUEEN`) {
    value2 = 10
  } else {
    value2 = parseInt(cardUser2.value)
  }

  // compare & show game results

  if (value1 == value2) {
    gameResults.textContent = `TIE! Play again.`
    document.getElementById(`user-playing`).textContent = user1.username
    clicks = 0
    deckImg.addEventListener(`click`, drawCards);
    return;
  } else if (value1 > value2) {
    gameResults.textContent = `${cardUser1.value} beats ${cardUser2.value}. ${user1.username} wins!`
    winner = user1;
  } else if (value1 < value2) {
    gameResults.textContent = `${cardUser2.value} beats ${cardUser1.value}. ${user2.username} wins!`
    winner = user2;
  }
  document.querySelector(`#timer-text`).style.display = `block`
  timer();
  displayWin();
}

// timer to change from game page to win page
function timer() {
  var timeLeft = 5;

  var timeInterval = setInterval(function () {
    // Display seconds in screen
    timerNum.textContent = timeLeft;

    // reduce time
    timeLeft--;

    // checki when time is 0
    if (timeLeft < 0) {
      // stop the time
      clearInterval(timeInterval);
      gamePage.style.display = `none`
      winPage.style.display = `flex`
    }
  }, 1000)
};

var winner;
// Function to  display winning movie info to win page
function displayWin() {
  // Grab win page elements into JS variables
  var winnerH2 = document.getElementById("winner-h2");
  var winningMovieH3 = document.getElementById("winning-movie");
  var winningMoviePosterImg = document.getElementById("movie-poster");
  var winningMovieInfoP = document.getElementById("winning-movie-info");
  // Display the winner  to the win page
  winnerH2.textContent = "Congratulations " + winner.username + "!";
  // Initialize all variables needed
  var winningPlot = winner.plotSelected;
  let winningTitle = null;
  let winningPoster = null;
  let winningDirector = null;
  let winningYear = null;
  // Loop to get the genres in the movies object
  for (let genre in movies) {
    let movieGenre = movies[genre];
    // Loop to get the movies in the genres
    for (movieKey in movieGenre) {
      let movie = movieGenre[movieKey];
      // Check if winning plot matches plot in object
      if (movie.Plot === winningPlot) {
        // Set variables equal to matching movie plots info
        winningTitle = movie.Title;
        winningPoster = movie.Poster;
        winningDirector = movie.Director;
        winningYear = movie.Year;
        // Break loop when maching
        break;
      }
    }
    // Break outer loop as well when matching
    if (winningTitle) {
      break;
    }
  }
  // Display info to win page
  winningMovieH3.textContent = winningTitle;
  winningMoviePosterImg.setAttribute("src", winningPoster);
  winningMovieInfoP.textContent = "Fun Fact: " + winningTitle + " was released in " + winningYear + " and was directed by " + winningDirector + ".";

  // Locally store the last winner and title
  localStorage.setItem("lastWinner", winner.username);
  localStorage.setItem("lastMovie", winningTitle);
};