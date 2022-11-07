import $ from "jquery";

const game = {
  insert: 0,
  outline: 0,
  levels: ["Easy", "Medium", "Hard"],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
  for (let i = 1; i <= 81; i++) {
    const $tiles = $("<div>").attr("id", `${i}`).addClass("tile");
    $(".board").append($tiles)
  }
}

$createBoard();

// //! Hide/Remove Tiles Outline
const $createOutline = () => {
  const $outline = $("<button>").attr("id", "outline").text("Outline")
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
    $(event).text(game.insert);
    if (game.outline === 1) {
      $(".tile").css("outline", "solid 1px white")
    } else {
      $(".tile").css("outline", "none")
    }
    
}


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



//! Generate Numbers
// const $game = () => {
//   $("#new-game").on("click", () => {
//     for (let i = 0; i < 4; i++) {
//       $(".sudoku-tile").eq(Math.floor(Math.random()*9)).text(game.numbers[Math.floor(Math.random()*9)])
//     }
//   })
// }
// $game()


// //! Generate random number to random tiles
// const $game = () => {
//   $("#new-game").on("click", () => {
//     for (let i = 1; i <= 9; i++) {
//         $(`#${Math.floor(Math.random()*81)}`).text(game.numbers[i]);
//     }
//   })
// }

// $game()


// //! Generate preset numbers (completed)
// const $game = () => {
//   $("#new-game").on("click", () => {
//     for (let i = 0; i < 81; i++) {
//       const num = easy[1].split("");
//       $(`#${i+1}`).text(num[i]);
//     }
//   })
// }
// $game()

//! Generate preset numbers (incompleted)
const $game = () => {
  $("#new-game").on("click", () => {
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






