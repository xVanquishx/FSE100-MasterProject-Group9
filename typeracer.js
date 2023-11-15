let button;
let gameStarted = false;
let currentSlide = "slide1";

let easyButton;
let mediumButton;
let hardButton;

// Declare easy
let storyInput;
let userInput = "";
let story = "In a forgotten forest, fireflies with wings of rainbow hues emerged at midnight.";
let correctInput = story.split("");
let totalTypedCharacters = 0;
let correctCharacters = 0;

// Declare medium
let mediumStoryInput;
let mediumUserInput = "";
let mediumStory = "In a forgotten forest, fireflies with wings of rainbow hues emerged at midnight. Their gentle glow was said to\nheal broken hearts. A curious scientist embarked on a quest to capture their magic but found\n friendship instead. The forest's secret remained, but the world gained a little more love.";
let mediumCorrectInput = mediumStory.split("");
let mediumTotalTypedCharacters = 0;
let mediumCorrectCharacters = 0;

// Declare hard
let hardStoryInput;
let hardUserInput = ""; // Declare a variable for the user's input
let hardStory = "Amidst the labyrinthine meanderings of the archaic university's ivy-cladwalls, Dr. Pemberton, an erudite\n polymath with an insatiable appetite for knowledge, embarked on anaudacious experiment toelucidate the\n enigmatic realms of quantum entanglement, employing a bevy of intricate apparatuses, culminating in a\n symphony of superlative discoveries that resonated through the annals of science.";
let hardCorrectInput = hardStory.split(""); // Convert the story to an array of characters
let hardTotalTypedCharacters = 0; // Count of all characters typed by the user
let hardCorrectCharacters = 0; // Count of correctly typed characters

function setup() {
  createCanvas(640, 400);
  button = createButton('Start Game');
  button.position(120, 120);
  button.mousePressed(startGame);
  button.size(400, 150);
  button.style('background-color', 'gold');
  button.style('color', 'purple');
  button.style('font-size', '50px');

  //Easy
  easyButton = createButton("Easy");
  easyButton.position(75, 310);
  easyButton.style('background-color', 'green');
  easyButton.style('color', 'black');
  easyButton.style('font-size', '15px');
  easyButton.hide();
  easyButton.mousePressed(easyChallenge);

  //Medium
  mediumButton = createButton("Medium");
  mediumButton.position(285, 310);
  mediumButton.style('background-color', 'gold');
  mediumButton.style('color', 'black');
  mediumButton.style('font-size', '15px');
  mediumButton.hide();
  mediumButton.mousePressed(mediumChallenge);

  // Hard
  hardButton = createButton("Hard");
  hardButton.position(525, 310);
  hardButton.style('background-color', 'red');
  hardButton.style('color', 'black');
  hardButton.style('font-size', '15px');
  hardButton.hide();
  hardButton.mousePressed(hardChallenge);

  // Easy
  storyInput = createInput();
  storyInput.position(50, 310);
  storyInput.size(570, 70);
  storyInput.input(handleInput);
  textSize(12);
  storyInput.hide();

  // Medium
  mediumStoryInput = createInput();
  mediumStoryInput.position(50, 310);
  mediumStoryInput.size(570, 70);
  mediumStoryInput.input(mediumHandleInput);
  textSize(12);
  mediumStoryInput.hide();
  
  // Hard
  hardStoryInput = createInput();
  hardStoryInput.position(50, 310);
  hardStoryInput.size(570, 70);
  hardStoryInput.input(hardHandleInput);
  textSize(12);
  hardStoryInput.hide();
}

function draw() {
  background(0);
//Start Game slide
  if (currentSlide === "slide1") {
    fill(255);
    textSize(40);
    text("W", 150, 150);
  } 
  //Choose difficulty slide
  else if (currentSlide === "slide2") {
    // Draw the difficulty selection slide
    fill(255);
    textSize(40);
    text("Choose Difficulty", 170, 70);
    // Draw buttons for difficulty levels here
    fill('green');
    circle(100, 320, 110);
    fill("red");
    circle(550, 320, 110);
    fill(255, 204, 0);
    circle(320, 320, 110);
  } 
  //Easy challenge slide
  else if (currentSlide === "slide3") {
    // Draw the "Easy" typing challenge slide
    fill("gold");
    stroke(255);
    rect(width * 0.13, height * 0.01, width * 0.6, height * 0.2);
    // Draw the "Accuracy" text
    fill("white");
    textSize(40);
    text("Accuracy", 185, 58);
    // Draw the "Mode" text
    fill("white");
    textSize(20);
    text("Mode:", 480, 58);
    // Draw the yellow circle
    fill("green");
    circle(590, 50, 90);
    // Draw the "Easy" text
    fill(255);
    textSize(15);
    text("Easy", 572, 55);
    // Draw the black rectangle
    fill(220);
    stroke(255);
    rect(width * 0.08, height * 0.3, width * 0.9, height * 0.20);
    // Draw the story text
    fill("black");
    textSize(12);
    text(story, 55, 140);
    // Draw the "Challenge" rectangle
    fill("blue");
    stroke(255);
    rect(width * 0.009, height * 0.21, width * 0.1, height * 0.1);
     // Draw the "Write this story in the box below" label
    fill("white");
    textSize(16);
    text("Write this story in the box below:", 80, 105);

    // Draw the "Challenge" label
    fill("white");
    textSize(12);
    text("Challenge", 10, 105);

    // Display user's input with highlighting
    fill("white");
    textSize(12);
    let x = 55;
    let y = 220;
    for (let i = 0; i < correctInput.length; i++) {
      if (i < totalTypedCharacters) {
        if (userInput[i] === correctInput[i]) {
          fill("white");
        } else {
          fill("red");
        }
        text(userInput[i], x, y);
      } else {
        fill("white");
        text(correctInput[i], x, y);
      }
      x += textWidth(correctInput[i]);
    }

    // Calculate and display accuracy
    let accuracy = correctCharacters / totalTypedCharacters;
    fill("green");
    textSize(15);
    text(`Accuracy: ${(accuracy * 100).toFixed(2)}%`, 500, 300);
  } 
  //Medium challenge slide
  else if (currentSlide === "slide4") {
    // Draw the gold rectangle
    fill("gold");
    stroke(255);
    rect(width * 0.13, height * 0.01, width * 0.6, height * 0.2);
    // Draw the "Accuracy" text
    fill("white");
    textSize(40);
    text("Accuracy", 185, 58);
    // Draw the "Mode" text
    fill("white");
    textSize(20);
    text("Mode:", 480, 58);
    // Draw the yellow circle
    fill(255, 204, 0);
    circle(590, 50, 90);
    // Draw the "Hard" text
    fill(255);
    textSize(15);
    text("Medium", 563, 55);
    // Draw the black rectangle
    fill(220);
    stroke(255);
    rect(width * 0.08, height * 0.3, width * 0.9, height * 0.20);
    // Draw the story text
    fill("black");
    textSize(12);
    text(mediumStory, 55, 140);
    // Draw the "Challenge" rectangle
    fill("blue");
    stroke(255);
    rect(width * 0.009, height * 0.21, width * 0.1, height * 0.1);
    // Draw the "Challenge" label
    fill("white");
    textSize(12);
    text("Challenge", 10, 105);
     // Draw the "Write this story in the box below" label
    fill("white");
    textSize(16);
    text("Write this story in the box below:", 80, 105);
    // Display user's input with highlighting
    fill("white");
    textSize(12);
    let x = 55;
    let y = 220;
    for (let i = 0; i < mediumCorrectInput.length; i++) {
      if (i < mediumTotalTypedCharacters) {
        if (mediumUserInput[i] === mediumCorrectInput[i]) {
          fill("white");
        } else {
          fill("red");
        }
        text(mediumUserInput[i], x, y);
      } else {
        fill("white");
        text(mediumCorrectInput[i], x, y);
      }
      if (x > width * 0.9) {
      x = 55;
      y += 20; 
    }
      x += textWidth(mediumCorrectInput[i]);
    }

    // Calculate and display accuracy
    let accuracy = mediumCorrectCharacters / mediumTotalTypedCharacters;
    fill("green");
    textSize(15);
    text(`Accuracy: ${(accuracy * 100).toFixed(2)}%`, 500, 300);
  }
  //Hard challenge slide
  else if (currentSlide === "slide5"){
     // Draw the gold rectangle
   fill("gold");
  stroke(255);
  rect(width * 0.13, height * 0.01, width * 0.6, height * 0.2);
  // Draw the "Accuracy" text
  fill("white");
    textSize(40);
    text("Accuracy", 185, 58);
   // Draw the "Mode" text
  fill("white");
    textSize(20);
    text("Mode:", 480, 58);
  // Draw the yellow circle
  fill("red");
  circle(590, 50, 90);
  // Draw the "Hard" text
   fill(255);
    textSize(15); 
    text("Hard", 572, 55);
  // Draw the black rectangle
  fill(220);
  stroke(255);
  rect(width * 0.08, height * 0.3, width * 0.9, height * 0.20);
   // Draw the story text
  fill("black");
    textSize(12);
    text(hardStory, 55, 140);
  // Draw the "Challenge" rectangle
  fill("blue");
  stroke(255);
  rect(width * 0.009, height * 0.21, width * 0.1, height * 0.1);
  // Draw the "Challenge" label
  fill("white");
    textSize(12);
    text("Challenge", 10, 105);
     // Draw the "Write this story in the box below" label
    fill("white");
    textSize(16);
    text("Write this story in the box below:", 80, 105);

  // Display user's input with highlighting
  fill("white");
  textSize(12);
  let x = 55;
  let y = 220;
  for (let i = 0; i < hardCorrectInput.length; i++) {
    if (i < hardTotalTypedCharacters) {
      if (hardUserInput[i] === hardCorrectInput[i]) {
        fill("white");
      } else {
        fill("red");
      }
      text(hardUserInput[i], x, y);
    } else {
      fill("white");
      text(hardCorrectInput[i], x, y);
    }
    if (x > width * 0.9) {
      x = 55;
      y += 20;
    }
    x += textWidth(hardCorrectInput[i]);
  }

  // Calculate and display accuracy
  let accuracy = hardCorrectCharacters / hardTotalTypedCharacters;
  fill("green");
  textSize(15);
  text(`Accuracy: ${(accuracy * 100).toFixed(2)}%`, 500, 300);
  }
}

//Start game function
function startGame() {
  gameStarted = true;
  currentSlide = "slide2";
  button.hide();
  easyButton.show();
  mediumButton.show();
  hardButton.show();
}

//Easy challenge function
function easyChallenge() {
  gameStarted = true;
  currentSlide = "slide3";
  easyButton.hide();
  storyInput.show();
}

//Medium challenge function
function mediumChallenge() {
  gameStarted = true;
  currentSlide = "slide4";
  mediumButton.hide();
  mediumStoryInput.show();
}
//Hard challenge function
function hardChallenge(){
  gameStarted = true;
  currentSlide = "slide5";
  hardButton.hide();
  hardStoryInput.show();
}
//Handle Input for Easy Challenge
function handleInput() {
  userInput = storyInput.value();
  totalTypedCharacters = userInput.length;
  correctCharacters = 0;

  for (let i = 0; i < totalTypedCharacters; i++) {
    if (userInput[i] === correctInput[i]) {
      correctCharacters++;
    }
  }
}
//Handle Input for Medium Challenge
function mediumHandleInput() {
  mediumUserInput = mediumStoryInput.value();
  mediumTotalTypedCharacters = mediumUserInput.length;
  mediumCorrectCharacters = 0;

  for (let i = 0; i < mediumTotalTypedCharacters; i++) {
    if (mediumUserInput[i] === mediumCorrectInput[i]) {
      mediumCorrectCharacters++;
    }
  }
}
//Handle Input for Hard Challenge
function hardHandleInput() {
  hardUserInput = hardStoryInput.value();
  hardTotalTypedCharacters = hardUserInput.length;
  hardCorrectCharacters = 0;

  for (let i = 0; i < hardTotalTypedCharacters; i++) {
    if (hardUserInput[i] === hardCorrectInput[i]) {
      hardCorrectCharacters++;
    }
  }
  }