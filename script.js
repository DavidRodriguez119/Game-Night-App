// Global variables for each user
var user1 = {
  username: ``,
  genreSelected: ``,
  plotSelected: ``,
  played: false,
};
var user2 = {  
  username: ``,
  genreSelected: ``,
  plotSelected: ``,
  played: false,
};

// Object to store all the movies within each genre
var movies = {
  animation: {

  },
  action:  {

  },
  horror: {

  },
};

// HTML section IDs into JS variables
var landingPage = document.getElementById(`landing-page`);
var usernamePage = document.getElementById(`username-page`);
var genrePage = document.getElementById(`genre-page`);
var plotPickerPage = document.getElementById(`plot-picker-page`);
var gamePage = document.getElementById(`game-page`);
var winPage = document.getElementById(`win-page`);

// HTML buttons IDs into JS variables
var startButton = document.getElementById(`start-button`);
var submitButton = document.getElementById(`submit-button`);
var genreButton = document.getElementById(`genre-button`);

// When the app is loaded do the following:
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

// Movies Fetch for animation
var animation = [`soul`, `the lion king`, `spirited away`, `spider-man: across the spider-verse`, `kubo and the two strings`];
var animationURL = animation.map((str) => str.replace(/ /g, `+`));
var animationVariables = animation.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < animation.length; i++){
  var requestUrl = `http://www.omdbapi.com/?apikey=b8b94e2d&t=${animationURL[i]}`;
  fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        movies.animation[animationVariables[i]] = data
  });
};

// Movies Fetch for horror
var horror = [`the unholy`, `the conjuring`, `the pope's exorcist`, `annabelle comes home`, `the exorcist`];
var horrorURL = horror.map((str) => str.replace(/ /g, `+`));
var horrorVariables = horror.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < horror.length; i++){
  var requestUrl = `http://www.omdbapi.com/?apikey=b8b94e2d&t=${horrorURL[i]}`;
  fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        movies.horror[horrorVariables[i]] = data
  });
};

// Movies Fetch for action
var action = [`die hard`, `john wick`, `the matrix`, `casino royale`, `the dark knight rises`];
var actionURL = action.map((str) => str.replace(/ /g, `+`));
var actionVariables = action.map((str) => str.replace(/ /g, ``));

for (let i = 0; i < action.length; i++){
  var requestUrl = `http://www.omdbapi.com/?apikey=b8b94e2d&t=${actionURL[i]}`;
  fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        movies.action[actionVariables[i]] = data
  });
};

// Deck of Cards Fetch
var requestUrl = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
});

// Start Button click event listener
startButton.addEventListener(`click`, function(event){
  landingPage.style.display = `none`
  usernamePage.style.display = `block`
});

// Submit usernames Btn click event Listener
submitButton.addEventListener(`click`, function(event){
  event.preventDefault();
  // create variables for the two input HTML tags
  var player1 = document.getElementById(`player-1`);
  var player2 = document.getElementById(`player-2`);
  // check if the users enter their usernames
  if (player1.value === `` || player2.value === ``){
    alert(`Please enter both usernames before submitting`)
  } else {
    // Store the usernames
    user1.username = player1.value;
    user2.username = player2.value;
    // Display the next page
    usernamePage.style.display = `none`
    genrePage.style.display = `flex`
  }
})

// Submit usernames Btn click event Listener
submitButton.addEventListener(`click`, function(event){
  event.preventDefault();
  // create variables for the two input HTML tags
  var player1 = document.getElementById(`player-1`);
  var player2 = document.getElementById(`player-2`);
  // check if the users enter their usernames
  if (player1.value === `` || player2.value === ``){
    alert(`Please enter both usernames before submitting`)
  } else {
    // Store the usernames
    user1.username = player1.value;
    user2.username = player2.value;
    // Display the next page
    usernamePage.style.display = `none`
    genrePage.style.display = `flex`
  }
});

// Genre button event listener
genreButton.addEventListener(`click`, function(event){
  event.preventDefault();
  // Check for valid selection
  if (selectP1.value === "" || selectP2.value === "") {
    alert("Please select genres for both players");
  } else {
    // Store the selected genres
    user1.genreSelected = selectP1.value;
    user2.genreSelected = selectP2.value;
    // Display next page
    genrePage.style.display = `none`;
    plotPickerPage.style.display = `flex`;
  }

});

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

