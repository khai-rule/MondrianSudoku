import $ from "jquery";
import compositionC from "./imgs/Composition C, 1935.jpg";
import compositionCText from "./imgs/Composition C, 1935.png";
import composition2 from "./imgs/Composition II in Red, Blue, and Yellow, 1929.jpg";
import composition2Text from "./imgs/Composition II in Red, Blue, and Yellow, 1929.png";
import nyc1 from "./imgs/New York City I, 1942.jpg";
import nyc1Text from "./imgs/New York City I, 1942.png";
import tableau2 from "./imgs/Tableau II, 1922.jpg";
import tableau2Text from "./imgs/Tableau II, 1922.png";

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

$difficultyLevel();
showSelectedLevel();
$createBoard();
$selectLevel();
$newGame();
$createOutline();
$pause();
$label();
$solveGame();
$closeLabel();
$game();

//! Easy Level
const easy = [
	[
		"---96--5-2-135-9-66-5---3--826-----3-1468-725-374--6-8-----7-6--59--68-----5--234",
		"483962157271358946695714382826175493914683725537429618142837569359246871768591234",
	],
	[
		"39--6-84----3-9---42-7--3-6-----41-91---86-7-26-17---8--24---5775----91----6572--",
		"397562841681349725425718396578234169143968572269175438832491657756823914914657283",
	],
	[
		"-9-1--2-3853-921--162--794-97624-38-2------1---48-5-29-319284--7---13-92-----48--",
		"497186253853492167162357948976241385285739614314865729531928476748613592629574831",
	],
];

const artworkEasy = [
	[composition2, composition2Text],
	[compositionC, compositionCText],
	[tableau2, tableau2Text],
];

console.table(artworkEasy);

//! Hard Level

const artworkHard = [[nyc1, nyc1Text]];

//! Difficulty Level Buttons
function $difficultyLevel() {
	const $levelsTitle = $("<p>").text("Levels: ");
	$(".difficulty-level").append($levelsTitle);
	for (let i = 0; i < game.levels.length; i++) {
		const $levels = $("<p>").addClass("levels").text(game.levels[i]);
		$(".difficulty-level").append($levels);
	}
}

//! Show Selected Level
function showSelectedLevel() {
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

//! Board with unique grid ID
function $createBoard() {
	for (let i = 1; i <= 81; i++) {
		const $tiles = $("<div>").attr("id", `${i}`).addClass("tile");
		$(".board").append($tiles);
	}
}

//! New Game Buttons
function $newGame() {
	const $new = $("<p>").attr("id", "new-game").text("New Game");
	$("#control").append($new);
}

//! Hide/Remove Tiles Outline Button
function $createOutline() {
	const $outline = $("<p>")
		.attr("id", "outline")
		.text("Grid")
		.css("color", "grey");
	$("#control").append($outline);
	$("#outline").on("click", () => {
		if (game.outline === 0) {
			game.outline = 1;
			$render();
		} else if (game.outline === 1) {
			game.outline = 0;
			$render();
		}
	});
}

//! Number Buttons
function $createNum() {
	for (let i = 1; i < 10; i++) {
		const $num = $("<p>").addClass("numbers").text(i);
		$("#numbers").append($num);
	}
}
$createNum();

//! Append Number
function $insert() {
	for (let i = 1; i <= 9; i++) {
		$(".numbers")
			.eq(i - 1)
			.on("click", () => {
				game.insert = i;
				$(".numbers").css("color", "grey").css("font-weight", "400");
				$(".numbers")
					.eq(i - 1)
					.css("color", "black")
					.css("font-weight", "500");
				$(".tile").on("click", (event) => {
					$render(event.currentTarget);
				});
			});
	}
}
$insert();

//! Pause
function $pause() {
	$("#pause").on("click", () => {
		//? Pause
		if (game.pause === 0) {
			// Pause Timer
			pause();
			// Hide other buttons
			$("#numbers").hide();
			$("#outline").hide();
			$("#new-game").hide();
			$(".difficulty-level").hide();
			$(".tile").hide();
			// Highlight button
			$("#pause").css("font-weight", "500");
			// Change text to Resume
			$("#pause").text("Resume");
			game.pause = 1;
			// Show indication time is paused
			$("#timer").css("color", "grey");
			//? Resume
		} else {
			// Resume Timer
			start();
			// Show other Buttons
			$("#numbers").show();
			$("#outline").show();
			$("#new-game").show();
			$(".difficulty-level").show();
			$(".tile").show();
			// Unhighlight button
			$("#pause").css("font-weight", "400");
			// Revert Text
			$("#pause").text("Pause");
			game.pause = 0;
			// Show indication time is resumed
			$("#timer").css("color", "black");
		}
	});
}

//! Enlarge Label and Pause
function $label() {
	$("#label").on("click", () => {
		//? Pause
		pause();
		// Hide other buttons
		$("#numbers").hide();
		$("#outline").hide();
		$("#new-game").hide();
		$(".difficulty-level").hide();
		$(".tile").hide();
		// Highlight button
		$("#pause").css("font-weight", "500");
		// Change text to Resume
		$("#pause").text("Resume");
		// Show indication time is paused
		$("#timer").css("color", "grey");
		game.pause = 1;
		$("#label-popup")
			.css("background-color", "rgb(0,0,0,.5)")
			.css("position", "absolute");
		$("#label-popup").css("z-index", "2");
		$("#label-enlarge").attr("src", artworkEasy[game.puzzle][1]);
		$("#label-popup").show();
	});
}

//! Close Label and Resume
function $closeLabel() {
	$("#label-popup").on("click", () => {
		// Resume Timer
		start();
		// Show indication time is resumed
		$("#timer").css("color", "black");
		// Show other Buttons
		$("#numbers").show();
		$("#outline").show();
		$("#new-game").show();
		$(".difficulty-level").show();
		$(".tile").show();
		// Unhighlight button
		$("#pause").css("font-weight", "400");
		// Revert Text
		$("#pause").text("Pause");
		game.pause = 0;
		$("#label-popup").hide();
	});
}

//! Generate Random Number for puzzle index
function randomNum() {
	const num = Math.floor(Math.random() * easy.length);
	game.puzzle = num;
	return game.puzzle;
}

//! Reset Previous Board
function $reset() {
	for (let i = 0; i < 81; i++) {
		$(`#${i + 1}`).text("");
		$(`#${i + 1}`).css("pointer-events", "auto");
	}
}

//? Hidden at the top center of the page
//! Solve Game Button
function $solveGame() {
	const $solve = $("<button>").attr("id", "solve").text("Solve");
	$("body").append($solve);
}

//! Generate Puzzle
function $game() {
	$("#new-game").on("click", () => {
		// Reset Timer
		resetTimer();
		// Start New Timer
		start();
		// Reset Board
		$reset();
		// Show Pause Button
		$("#pause").css("color", "black");
		// Generate Number for puzzle index
		randomNum();
		game.puzzle = randomNum();
		// Change Artwork
    //TODO
		$(".board").css("background-image", `url("${artworkEasy[game.puzzle][0]}")`);
		// Change Label
		$("#label").attr("src", artworkEasy[game.puzzle][1]);
		// Insert Numbers from data
		const completeNum = easy[game.puzzle][0].split("");
		for (let i = 0; i < 81; i++) {
			const num = easy[game.puzzle][0].split("");
			// Ignore (-)
			if (num[i] === "-") {
				continue;
			}
			$(`#${i + 1}`).text(num[i]);
			$(`#${i + 1}`).css("pointer-events", "none");
		}
	});
	$("#solve").on("click", () => {
		// Insert Numbers from data
		const completeNum = easy[game.puzzle][1].split("");
		for (let i = 0; i < 81; i++) {
			const num = easy[game.puzzle][1].split("");
			$(`#${i + 1}`).text(num[i]);
			$(`#${i + 1}`).css("pointer-events", "none");
			$render();
		}
	});
}

//! Select Level
function $selectLevel() {
	$(".levels")
		.eq(2)
		.on("click", () => {
			game.selectedLevel = "Hard";
			$(".board").css("background-image", `url("${artworkHard[0][0]}")`);
			$("#label").attr("src", `${artworkHard[0][1]}`);
			showSelectedLevel();
			// Reset Timer
			resetTimer();
			// pause New Timer
			pause();
			// Reset Board
			$reset();
			// Hide Pause Button
			$("#pause").css("color", "#FBFBF9");
		});
	$(".levels")
		.eq(1)
		.on("click", () => {
			game.selectedLevel = "Medium";
			showSelectedLevel();
			// Reset Timer
			resetTimer();
			// pause New Timer
			pause();
			// Reset Board
			$reset();
			// Hide Pause Button
			$("#pause").css("color", "#FBFBF9");
		});
	$(".levels")
		.eq(0)
		.on("click", () => {
			game.selectedLevel = "Easy";
			$(".board").css("background-image", `url("${artworkEasy[0][0]}")`);
			$("#label").attr("src", `${artworkEasy[0][1]}`);
			showSelectedLevel();
			// Reset Timer
			resetTimer();
			// pause New Timer
			pause();
			// Reset Board
			$reset();
			// Hide Pause Button
			$("#pause").css("color", "#FBFBF9");
		});
}

//! Get Time and date
let current = new Date();
current.toLocaleTimeString(); // time
current.toLocaleDateString(); // date

//! Win Pop up
const $winPopUp = (timer) => {
	// Darken Background
	$("#win")
		.css("background-color", "rgb(0,0,0,.5)")
		.css("position", "absolute");
	$("#win").css("z-index", "2");
	// Create White Block
	const $winBlock = $("<div>").attr("id", "winBlock");
	$("#win").append($winBlock);
	// Text
	const $winHeader = $("<h2>").text("CONGRATULATION");
	const $winSubHeader = $("<h4>").text(`You have completed
  easy mode in ${timer} mins.`);
	const $winBody = $("<p>").text(
		"This is your fastest timing yet! Check out your progress below."
	);
	$("#winBlock").append($winHeader).append($winSubHeader).append($winBody);
	const $addLine = $("<hr>");
	$("#winBlock").append($addLine);
	// Records
	const $records = $("<div>").attr("id", "records");
	//? Date
	const $saveDate = $("<p>").text(`${current.toLocaleDateString()}`);
	$($records).append($saveDate);
	//? Time
	const $saveTime = $("<p>").text(`${current.toLocaleTimeString()}`);
	$($records).append($saveTime);
	//? Timer
	const $saveTimer = $("<h4>").attr("id", "saveTimer").text(`${timer}`);
	$($records).append($saveTimer);
	$("#winBlock").append($records);
	// Exit
	$("#win").on("click", () => {
		resetTimer();
		$reset();
		$("#win").hide();
	});
};

//! Render
const $render = (event) => {
	const $completed = [];
	// Add selected number to tile
	$(event).text(game.insert);
	// Compare to win
	for (let i = 0; i < 81; i++) {
		const x = $(`#${i + 1}`).text();
		$completed.push(x);
	}
	if ($completed.join("") === easy[game.puzzle][1]) {
		// Pop Up
		const getTiming = $("#minute").text() + $("#second").text();
		pause();
		$("#win").show();
		$winPopUp(getTiming);
	}
	// Toggle grid
	if (game.outline === 1) {
		$("#outline").css("color", "black");
		$(".tile").css("outline", "solid 1px white");
	} else {
		$("#outline").css("color", "grey");
		$(".tile").css("outline", "none");
	}
};

//! Timer
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

// Start Timer
const start = () => {
	pause();
	cron = setInterval(() => {
		timer();
	}, 10);
};

// Pause Timer
const pause = () => {
	clearInterval(cron);
};

// Reset Timer
const resetTimer = () => {
	minute = 0;
	second = 0;
	millisecond = 0;
	$("#minute").text("00:");
	$("#second").text("00");
};

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

	$("#minute").text(returnData(minute + ":"));
	$("#second").text(returnData(second));
};

// Timer Data
const returnData = (input) => {
	return input >= 10 ? input : `0${input}`;
};
