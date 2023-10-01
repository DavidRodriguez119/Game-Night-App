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
    deck = data
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
  setUsernameDisplays();
})

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

    var genreSelectedObject1 = Object.keys(movies[user1.genreSelected]);
    var genreSelectedObject2 = Object.keys(movies[user2.genreSelected]);
    // Display plots based on user1 genre
    for (let i = 0; i < genreSelectedObject1.length; i++){
      // Create elements 
      var containerP = document.createElement(`p`);
      var label = document.createElement(`label`);
      var checkbox = document.createElement(`input`);
      checkbox.setAttribute(`type`, `checkbox`);
      var plotText = document.createElement(`span`);
      // Select the i plot
      var plot = movies[user1.genreSelected][genreSelectedObject1[i]].Plot
      // add content to the span tag
      plotText.textContent = plot;
      // append elements
      plotPickerP1.appendChild(containerP);
      containerP.appendChild(label);
      label.append(checkbox, plotText);
    };    
    // Display plots based on user2 genre
    for (let i = 0; i < genreSelectedObject2.length; i++){
      // Create elements 
      var containerP = document.createElement(`p`);
      var label = document.createElement(`label`);
      var checkbox = document.createElement(`input`);
      checkbox.setAttribute(`type`, `checkbox`);
      var plotText = document.createElement(`span`);
      // Select the i plot
      var plot = movies[user2.genreSelected][genreSelectedObject2[i]].Plot
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
  }
});

plotButton.addEventListener(`click`, function(event){
  event.preventDefault();
  // Grab all checkboxes
  var checkBoxesP1 = plotPickerP1.querySelectorAll(`input[type="checkbox"]`);
  var checkBoxesP2 = plotPickerP2.querySelectorAll(`input[type="checkbox"]`);
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
    alert("Please select one plot per player");
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
      alert("Please select one plot per player");
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
// deck image event listener
deckImg.addEventListener(`click`, function game(event){
  clicks++;
  if (clicks <= 2){
    // When the image is clicked, draw a card for user1
    var requestUrl = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // save the usefull information to the respective user
        if (clicks === 1){
          cardUser1 = data.cards[0];
          document.getElementById(`player-1-card`).setAttribute(`src`, cardUser1.image)
          document.getElementById(`user-playing`).textContent = user2.username
        } else {
          cardUser2 = data.cards[0];
          document.getElementById(`player-2-card`).setAttribute(`src`, cardUser2.image)
        }

      });
  } else {
    deckImg.removeEventListener(`click`, game);
  };
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

// Again Btn event Listener
againButton.addEventListener(`click`, function(event){
  winPage.style.display = `none`;
  landingPage.style.display = `flex`;
  user1.played = false;
  user2.played = false;
});

// Function to update username displays after they are entered
function setUsernameDisplays() {
  for (let i = 0; i < usernameDisplayP1.length; i++) {
    usernameDisplayP1[i].textContent = user1.username;
  }
  for (let i = 0; i < usernameDisplayP2.length; i++) {
    usernameDisplayP2[i].textContent = user2.username;
  }
}

