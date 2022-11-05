import $ from "jquery";

const game = {
  insert: 0,
  outline: 0
};



//! Board
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



//! Hide/Remove Tiles Outline
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