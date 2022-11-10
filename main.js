import $, { removeData } from "jquery";

const game = {
  insert: 0,
  outline: 0,
  levels: ["Easy", "Medium", "Hard"],
  selectedLevel: "Easy",
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  pages: "start",
  puzzle: 0,
  pause: 0,
};

//! Easy Level
const easy = [
  [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ],
  [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ],
  [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ],
];


const artworkEasy = [
  [
    "https://i.ibb.co/B6CyX8Z/Composition-II-in-Red-Blue-and-Yellow-1929.jpg",
    "https://i.ibb.co/Kr7HRc7/Composition-II-in-Red-Blue-and-Yellow-1929.png"
  ],
  [
    "https://i.ibb.co/Z8Rstk2/Composition-C-1935.jpg",
    "https://i.ibb.co/wSZq4Tx/Composition-C-1935.png"
  ],
  [
    "https://i.ibb.co/3kkxSnc/Tableau-II-1922.jpg",
    "https://i.ibb.co/jDdn7Mq/Tableau-II-1922.png" 
  ]
]

//! Hard Level

const artworkHard = [
  [
    "https://i.ibb.co/TWyMFcG/New-York-City-I-1942-by-Piet-Mondrian.jpg",
    "https://i.ibb.co/HBkFxnt/New-York-City-I-1942.png"
  ]
]

//! Difficulty Level Buttons
const $difficultyLevel = () => {
  const $levelsTitle = $("<p>").text("Levels: ")
  $(".difficulty-level").append($levelsTitle)
  for (let i = 0; i < game.levels.length; i++) {
    const $levels = $("<p>").addClass("levels").text(game.levels[i])
    $(".difficulty-level").append($levels)
  }
}
$difficultyLevel()

//! Show Selected Level
const showSelectedLevel = () => {
  // Show active level selection
  if (game.selectedLevel === "Easy") {
    $(".levels").eq(0).css("color", "black").css("font-weight", "500");
    $(".levels").eq(1).css("color", "grey").css("font-weight", "400");
    $(".levels").eq(2).css("color", "grey").css("font-weight", "400");
    } else if (game.selectedLevel === "Medium") {
    $(".levels").eq(1).css("color", "black").css("font-weight", "500");
    $(".levels").eq(0).css("color", "grey").css("font-weight", "400");
    $(".levels").eq(2).css("color", "grey").css("font-weight", "400");
    } else {
    $(".levels").eq(2).css("color", "black").css("font-weight", "500");
    $(".levels").eq(1).css("color", "grey").css("font-weight", "400");
    $(".levels").eq(0).css("color", "grey").css("font-weight", "400");
  }
}
showSelectedLevel();

//! Board with unique grid ID
const $createBoard = () => {
  for (let i = 1; i <= 81; i++) {
    const $tiles = $("<div>").attr("id", `${i}`).addClass("tile");
    $(".board").append($tiles)
  }
}
$createBoard();

//! New Game Buttons
const $newGame = () => {
  const $new = $("<p>").attr("id", "new-game").text("New Game")
  $("#control").append($new)
}
$newGame();

//! Hide/Remove Tiles Outline Button
const $createOutline = () => {
  const $outline = $("<p>").attr("id", "outline").text("Grid").css("color", "grey")
  $("#control").append($outline);
  $("#outline").on("click", () => {
    if (game.outline === 0) {
      game.outline = 1;
      $render();
    } else if (game.outline === 1) {
      game.outline = 0;
      $render()
    }
  })
}
$createOutline()

//! Number Buttons
const $createNum = () => {
  for (let i = 1; i < 10; i++) {
    const $num = $("<p>").addClass("numbers").text(i);
    $("#numbers").append($num);
}}
$createNum();

//! Append Number
const $insert = () => {
  for (let i = 1; i <= 9; i++) {
    $(".numbers").eq(i-1).on("click", () => {
      game.insert = i;
      $(".numbers").css("color", "grey").css("font-weight", "400")
      $(".numbers").eq(i-1).css("color", "black").css("font-weight", "500")
      $(".tile").on("click", (event) => {
        $render(event.currentTarget)
      })  
    })
    }
  }
$insert()

//! Pause 
const $pause = () => {
  $("#pause").on("click", () => {
    //? Pause
    if (game.pause === 0) {
      // Pause Timer
      pause();
      // Hide other buttons
      $("#numbers").hide();
      $("#outline").hide();
      $("#new-game").hide();
      $(".difficulty-level").hide()
      $(".tile").hide()
      // Highlight button
      $("#pause").css("font-weight", "500")
      // Change text to Resume
      $("#pause").text("Resume")
      game.pause = 1;
      // Show indication time is paused
      $("#timer").css("color", "grey")
      //? Resume
    } else {
      // Resume Timer
      start();
      // Show other Buttons
      $("#numbers").show();
      $("#outline").show();
      $("#new-game").show();
      $(".difficulty-level").show()
      $(".tile").show()
      // Unhighlight button
      $("#pause").css("font-weight", "400")
      // Revert Text
      $("#pause").text("Pause")
      game.pause = 0
      // Show indication time is resumed
      $("#timer").css("color", "black")
    }
    
  })
}
$pause();

//! Enlarge Label and Pause
const $label = () => {
  $("#label").on("click", () => {
    //? Pause
      pause();
      // Hide other buttons
      $("#numbers").hide();
      $("#outline").hide();
      $("#new-game").hide();
      $(".difficulty-level").hide()
      $(".tile").hide()
      // Highlight button
      $("#pause").css("font-weight", "500")
      // Change text to Resume
      $("#pause").text("Resume")
      // Show indication time is paused
      $("#timer").css("color", "grey")
      game.pause = 1;
      $("#label-popup").css("background-color", "rgb(0,0,0,.5)").css("position", "absolute");
      $("#label-popup").css("z-index", "2");
      $("#label-enlarge").attr("src", artworkEasy[game.puzzle][1])
      $("#label-popup").show()
    }
  )
}
$label();

//! Close Label and Resume
const $closeLabel = () => {
  $("#label-popup").on("click", () => {
    // Resume Timer
    start();
    // Show indication time is resumed
    $("#timer").css("color", "black")
    // Show other Buttons
    $("#numbers").show();
    $("#outline").show();
    $("#new-game").show();
    $(".difficulty-level").show()
    $(".tile").show()
    // Unhighlight button
    $("#pause").css("font-weight", "400")
    // Revert Text
    $("#pause").text("Pause")
    game.pause = 0
    $("#label-popup").hide()
  })
}
$closeLabel()

//! Generate Random Number for puzzle index
const randomNum = () => {
  const num = Math.floor(Math.random()*easy.length)
  game.puzzle = num
  return game.puzzle
  }

//! Reset Previous Board
const $reset = () => {
  for (let i = 0; i < 81; i++) {
    $(`#${i+1}`).text("")
    $(`#${i+1}`).css("pointer-events", "auto")
  }
}

//? Hidden at the top center of the page
//! Solve Game Button
const $solveGame = () => {
  const $solve = $("<button>").attr("id", "solve").text("Solve")
  $("body").append($solve)
}
$solveGame()


//! Generate Puzzle
const $game = () => {
  $("#new-game").on("click", () => {
    // Reset Timer
    resetTimer()
    // Start New Timer
    start()
    // Reset Board
    $reset()
    // Show Pause Button
    $("#pause").css("color", "black")
    // Generate Number for puzzle index
    randomNum()
    game.puzzle = randomNum()
    // Change Artwork
    $(".board").css("background-image", `url(${artworkEasy[game.puzzle][0]})`)
    // Change Label
    $("#label").attr("src", artworkEasy[game.puzzle][1])
    // Insert Numbers from data
    const completeNum = easy[game.puzzle][0].split("");
    for (let i = 0; i < 81; i++) {
      const num = easy[game.puzzle][0].split("");
      // Ignore (-)
      if (num[i] === "-") {
        continue
      }
      $(`#${i+1}`).text(num[i]);
      $(`#${i+1}`).css("pointer-events", "none")
    }
  })
  $("#solve").on("click", () => {
    // Insert Numbers from data
    const completeNum = easy[game.puzzle][1].split("");
    for (let i = 0; i < 81; i++) {
      const num = easy[game.puzzle][1].split("");
      $(`#${i+1}`).text(num[i]);
      $(`#${i+1}`).css("pointer-events", "none")
      $render()
    }
  })
}
$game()

//! Select Level
const $selectLevel = () => {
  $(".levels").eq(2).on("click", () => {
    game.selectedLevel = "Hard";
    $(".board").css("background-image", `url(${artworkHard[0][0]})`);
    $("#label").attr("src", `${artworkHard[0][1]}`);
    showSelectedLevel();
    // Reset Timer
    resetTimer()
    // pause New Timer
    pause()
    // Reset Board
    $reset()
    // Hide Pause Button
    $("#pause").css("color", "#FBFBF9")
  })
  $(".levels").eq(1).on("click", () => {
    game.selectedLevel = "Medium";
    showSelectedLevel()
    // Reset Timer
    resetTimer()
    // pause New Timer
    pause()
    // Reset Board
    $reset()
    // Hide Pause Button
    $("#pause").css("color", "#FBFBF9")
  })
  $(".levels").eq(0).on("click", () => {
    game.selectedLevel = "Easy";
    $(".board").css("background-image", `url(${artworkEasy[0][0]})`)
    $("#label").attr("src", `${artworkEasy[0][1]}`);
    showSelectedLevel()
    // Reset Timer
    resetTimer()
    // pause New Timer
    pause()
    // Reset Board
    $reset()
    // Hide Pause Button
    $("#pause").css("color", "#FBFBF9")
  })
}
$selectLevel();

//! Get Time and date
let current = new Date();
current.toLocaleTimeString(); // time
current.toLocaleDateString(); // date


//! Win Pop up
const $winPopUp = (timer) => {
  // Darken Background
  $("#win").css("background-color", "rgb(0,0,0,.5)").css("position", "absolute")
  $("#win").css("z-index", "2")
  // Create White Block
  const $winBlock = $("<div>").attr("id", "winBlock")
  $("#win").append($winBlock)
  // Text
  const $winHeader = $("<h2>").text("CONGRATULATION")
  const $winSubHeader = $("<h4>").text(`You have completed
  easy mode in ${timer} mins.`)
  const $winBody = $("<p>").text("This is your fastest timing yet! Check out your progress below.")
  $("#winBlock").append($winHeader).append($winSubHeader).append($winBody)
  const $addLine = $("<hr>")
  $("#winBlock").append($addLine)
// Records
const $records = $("<div>").attr("id", "records")
//? Date
const $saveDate = $("<p>").text(`${current.toLocaleDateString()}`)
$($records).append($saveDate)
//? Time
const $saveTime = $("<p>").text(`${current.toLocaleTimeString()}`)
$($records).append($saveTime)
//? Timer
const $saveTimer = $("<h4>").attr("id", "saveTimer").text(`${timer}`)
$($records).append($saveTimer)
$("#winBlock").append($records)
  // Exit
  $("#win").on("click", () => {
    resetTimer()
    $reset()
    $("#win").hide();
  })
}


//! Render
const $render = (event) => {
  const $completed = []
  // Add selected number to tile
  $(event).text(game.insert);
  // Compare to win
  for (let i = 0; i < 81; i++) {
    const x = $(`#${i+1}`).text();
    $completed.push(x)
  } if ($completed.join("") === easy[game.puzzle][1]) {
    // Pop Up
    const getTiming = $("#minute").text() + $("#second").text()
    pause()
    $("#win").show();
    $winPopUp(getTiming);
    
  }
  // Toggle grid
  if (game.outline === 1) {
    $("#outline").css("color", "black")
    $(".tile").css("outline", "solid 1px white")
  } else {
    $("#outline").css("color", "grey")
    $(".tile").css("outline", "none")
  }
}

//! Timer
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

// Start Timer
const start = () => {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

// Pause Timer
const pause = () => {
  clearInterval(cron);
}

// Reset Timer
const resetTimer = () => {
  minute = 0;
  second = 0;
  millisecond = 0;
  $('#minute').text('00:');
  $('#second').text('00');
}

// Timer
const timer = () => {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }

  $('#minute').text(returnData(minute + ":"));
  $('#second').text(returnData(second))
}

// Timer Data
const returnData = (input) => {
  return input >= 10 ? input : `0${input}`
}


