const levels = [
	// level 0
	["flag","rock","","","",
	 "fenceside","rock","","","rider",
	 "","tree","animate","animate","animate",
	 "","water","","","",
	 "","fence","","horseup",""],

	 //level 1
	 ["flag","rock","","","",
	 "fenceside","rock","","","rider",
	 "","tree","animate","animate","animate",
	 "","water","","","",
	 "","fence","","horseup",""],

	 //level 2
	 ["flag","rock","","","",
	 "fenceside","rock","","","rider",
	 "","tree","animate","animate","animate",
	 "","water","","","",
	 "","fence","","horseup",""]
	 ];


const gridBoxes = document.querySelectorAll("#gameBoard div")
var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5;
//start game
window.addEventListener("load", function () {
	loadLevel();
});

//move hores
document.addEventListener("keydown", function (e) {

	switch (e.keyCode) {
		case 37: //left arrow
			if (currentLocationOfHorse % widthOfBoard !== 0) {
					tryToMove("left");
			}
			break;
		case 38: //up arrow
			if (currentLocationOfHorse - widthOfBoard >= 0) {
				tryToMove("up");
			}
			break;
		case 39: //right arrow
			if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
				tryToMove("right");
			}
			break;
		case 40: //down arrow
			if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
				tryToMove("down");
			}
			break;
	} //switch
});//key event listener

//try to move horse
function tryToMove(direction) {

	//location before move
	let oldLocation = currentLocationOfHorse;

	//class of location before move
	let oldClassName = gridboxes[oldLocation].className;

	let nextLocation = 0; //location we wish to move to
	let nextClass = ""; //class of location we wish to move to

	let newClass = ""; //new class to switch to if move successful


	switch (direction) {
		case "left":
			nextLocation = currentLocationOfHorse - 1;
			break;
		case "right":
			nextLocation = currentLocationOfHorse + 1;
			break;
		case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
	} // switch

	nextClass = gridBoxes[nextLocation].className;



}//tryToMove
//load levels 0: maxLevel
function loadLevel (){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	//load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) currentLocationofHorse = i;
	}//for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");

} //loadLevel

//animate enemy - left to right (could add up and down to this)
//boxes - array oif grid boxes that include animation
//index - current location of animation
//direction - curren direction of animation
function animateEnemy (boxes, index, direction) {
	//exit function if no animation
	if(boxes.length <= 0) {return; }

	//update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else {
		boxes[index].classList.add("enemyleft");
	}

	// remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if (i!= index) {
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
		}
	} //for

	//moving right
	if (direction == "right") {
		//turn around if hit right side
		if (index == boxes.length -1) {
			index--;
			direction = "left";
		} else {
			index++;
		}

	//moving left
	} else {
		//turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		}
	}//else

	currentAnimation =  setTimeout(function ()  {
		animateEnemy(boxes, index, direction)
	},750);
}//animateEnemy
