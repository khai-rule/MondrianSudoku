import $ from "jquery";

const game = {
  insert: 0,
  outline: 0,
  levels: ["Easy", "Medium", "Hard"],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};


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



//! Board
// const $createBoard = () => {
//   for (let i = 0; i < 9; i++) {
//     const $section = $("<div>").addClass("sudoku-section");
//     $(".board").append($section);
//   } for (let i = 0; i < 9; i++) {
//     const $tiles = $("<div>").addClass("sudoku-tile");
//     $(".sudoku-section").append($tiles)
//   }
// }

//? Board with unique grid
const $createBoard = () => {
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      const $tiles = $("<div>").attr("id", `${i}-${j}`).addClass("tile");
      $(".board").append($tiles)
    }
  }
}

$createBoard();

// //! Hide/Remove Tiles Outline
// const $createOutline = () => {
//   const $outline = $("<button>").attr("id", "outline").text("Outline")
//   $(".buttons").append($outline);
//   $("#outline").on("click", () => {
//     if (game.outline === 0) {
//       game.outline = 1;
//       $render();
//     } else if (game.outline === 1) {
//       game.outline = 0;
//       $render()
//     }
//   })
// }

// $createOutline()





//! Number Buttons
const $createNum = () => {
  for (let i = 1; i < 10; i++) {
    const $num = $("<button>").addClass("numbers").text(i);
    $(".buttons").append($num);
}}

$createNum();

//! Render
const $render = (event) => {
    $(event).text(game.insert);
    if (game.outline === 1) {
      $(".sudoku-tile").css("outline", "solid 1px white")
      $(".sudoku-section").css("outline", "solid 2px white")
    } else {
      $(".sudoku-tile").css("outline", "none")
      $(".sudoku-section").css("outline", "none")
    }
    
}


const $insert = () => {
  for (let i = 1; i <= 9; i++) {
    $(".numbers").eq(i-1).on("click", () => {
      game.insert = i;
      $(".sudoku-tile").on("click", (event) => {
        $render(event.currentTarget)
      })
    })
    }
  }
$insert()



//! Generate Numbers
const $game = () => {
  $("#new-game").on("click", () => {
    for (let i = 0; i < 4; i++) {
      $(".sudoku-tile").eq(Math.floor(Math.random()*9)).text(game.numbers[Math.floor(Math.random()*9)])
    }
  })
}
$game()