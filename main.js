import $ from "jquery";

const game = {
  numbers: [1,2,3,4,5,6,7,8,9],
  insert: 0
};




// const enterNumber = () => {
//   $(".sudoku-tile").on("click", () => {
//     $(".sudoku.tile").text("Hi")
//   })
// }


// enterNumber()





// Board
const $createBoard = () => {
  for (let i = 0; i < 9; i++) {
    const $section = $("<div>").addClass("sudoku-section");
    $(".board").append($section);
  } for (let i = 0; i < 9; i++) {
    const $tiles = $("<div>").addClass("sudoku-tile");
    $(".sudoku-section").append($tiles)
  }
}

$createBoard();

// Number Buttons
const $createNum = () => {
  for (let i = 1; i < 10; i++) {
    const $num = $("<button>").addClass("numbers").text(i);
    $(".number-buttons").append($num);
}}

$createNum();


const $render = (event) => {
    $(event).text(game.insert);
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