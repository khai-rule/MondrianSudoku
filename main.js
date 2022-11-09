import $, { removeData } from "jquery";

const game = {
  insert: 0,
  outline: 0,
  levels: ["Easy", "Medium", "Hard"],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  pages: ["start", "game", "pause", "details", "scoreboard"],
  puzzle: 0
};



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


//! New Game Buttons
const $newGame = () => {
  const $new = $("<button>").attr("id", "new-game").text("New Game")
  $("#control").append($new)
}
$newGame();


//! Difficulty Level Buttons
const $difficultyLevel = () => {
  $(".difficulty-level").text("Levels:")
  for (let i = 0; i < game.levels.length; i++) {
    const $levels = $("<button>").text(game.levels[i])
    $(".difficulty-level").append($levels)
  }
}
$difficultyLevel()


//! Board with unique grid ID
const $createBoard = () => {
  for (let i = 1; i <= 81; i++) {
    const $tiles = $("<div>").attr("id", `${i}`).addClass("tile");
    $(".board").append($tiles)
  }
}

$createBoard();

//! Hide/Remove Tiles Outline Button
const $createOutline = () => {
  const $outline = $("<button>").attr("id", "outline").text("Grid")
  $(".buttons").append($outline);
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
    const $num = $("<button>").addClass("numbers").text(i);
    $(".buttons").append($num);
}}
$createNum();

//! Generate Random Number for puzzle index
const randomNum = () => {
  const num = Math.floor(Math.random()*easy.length)
  game.puzzle = num
  return game.puzzle
  }

//! Clear Previous Board
const $reset = () => {
  for (let i = 0; i < 81; i++) {
    $(`#${i+1}`).text("")
  }
}

//TODO To hide
//! Solve Game Button
const $solveGame = () => {
  const $solve = $("<button>").attr("id", "solve").text("Solve")
  $("#control").append($solve)
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
    // Generate Number for puzzle index
    randomNum()
    console.log(game.puzzle)
    game.puzzle = randomNum()
    console.log(`Puzzle ${game.puzzle}`)
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

//! Append Number
const $insert = () => {
  for (let i = 1; i <= 9; i++) {
    $(".numbers").eq(i-1).on("click", () => {
      game.insert = i;
      $(".tile").on("click", (event) => {
        $render(event.currentTarget)
      })  
    })
    }
  }
$insert()

//! Get Time and date
let current = new Date();
console.log(current.toLocaleTimeString()); // time
console.log(current.toLocaleDateString()); // date


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
  const $winBody = $("<p>").text("This is your fastest timing yet! Check out your progress below")
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
}

//TODO Remove
// $winPopUp()

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
    const getTiming = $("#minute").text() + ":" + $("#second").text()
    pause()
    $winPopUp(getTiming)
    // alert(getTiming)
  }
  // Toggle grid
  if (game.outline === 1) {
    $(".tile").css("outline", "solid 1px white")
  } else {
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
  $('#minute').text('00');
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

  $('#minute').text(returnData(minute));
  $('#second').text(returnData(second))
}

// Timer Data
const returnData = (input) => {
  return input >= 10 ? input : `0${input}`
}







localStorage.setItem('myCat', 'hello');
const cat = localStorage.getItem('myCat');
console.log(cat)


