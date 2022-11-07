import $ from "jquery";

const game = {
  insert: 0,
  outline: 0,
  levels: ["Easy", "Medium", "Hard"],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  pages: ["start", "game", "pause", "details", "scoreboard"]
};


const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];



//! New Game
const $newGame = () => {
  const $new = $("<button>").attr("id", "new-game").text("New Game")
  $("#control").append($new)
}
$newGame();



//! Difficulty Level
const $difficultyLevel = () => {
  $(".difficulty-level").text("Levels:")
  for (let i = 0; i < game.levels.length; i++) {
    const $levels = $("<button>").text(game.levels[i])
    $(".difficulty-level").append($levels)
  }
}
$difficultyLevel()


//! Board with unique grid
const $createBoard = () => {
  for (let i = 1; i <= 81; i++) {
    const $tiles = $("<div>").attr("id", `${i}`).addClass("tile");
    $(".board").append($tiles)
  }
}

$createBoard();

// //! Hide/Remove Tiles Outline
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

//! Render
const $render = (event) => {
  const $completed = []
    $(event).text(game.insert);
    for (let i = 0; i < 81; i++) {
      const x = $(`#${i+1}`).text();
      $completed.push(x)
      console.log($completed.join(""))
    }
    if (game.outline === 1) {
      $(".tile").css("outline", "solid 1px white")
    } else {
      $(".tile").css("outline", "none")
    }
    // Compare
    if ( $completed.join("") === easy[1]) {
      console.log("nice") }
}

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

//! Generate preset numbers (incompleted)
const $game = () => {
  $("#new-game").on("click", () => {
    const completeNum = easy[0].split("");
    for (let i = 0; i < 81; i++) {
      const num = easy[0].split("");
      if (num[i] === "-") {
        continue
      }
      $(`#${i+1}`).text(num[i]);
      $(`#${i+1}`).css("pointer-events", "none")
    }
  })
}
$game()


//TODO To hide
//! Solve Game
const $solveGame = () => {
  const $solve = $("<button>").attr("id", "solve").text("Solve")
  $("#control").append($solve)
  $("#solve").on("click", () => {
    const completeNum = easy[1].split("");
    for (let i = 0; i < 80; i++) {
      const num = easy[1].split("");
      $(`#${i+1}`).text(num[i]);
      $(`#${i+1}`).css("pointer-events", "none")
    }
  })
}
$solveGame()




//! Timer

"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

$("#new-game").on("click", () => start());
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

//! Enter Highscore