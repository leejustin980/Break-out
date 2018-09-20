
// set up variables
// paddle position
var xPos;
var yPos;

// ball position
var ballxPos;
var ballyPos;


// ball speed
var ballxSpeed;
var ballySpeed;

// cat image variable
var img;

// cat location
var catxPos;
var catyPos;

// cat collision sides
var cat_bot;
var cat_top;
var cat_left;
var cat_right;

// points & misses
var points;
var misses;

// sound
var boing;

// check if game is being played
var play;

// check # of clicks to control mouseclick
var click_counter;

function preload() {

	// load cat background
	space = loadImage("space.jpg");

	// load cat goal
	img = loadImage("cat.png");

	// load sound - boing
	boing = loadSound("boing.mp3");

	// load sound - cat hit - bongos
	bongos = loadSound("bongos.mp3");

	// load sound - you lose - lose
	lose = loadSound("lose.mp3");
}


function setup() {

	// canvas
	createCanvas(500,500);

	// rerun
	rerun = false;

	// background
	background(space);

	// click counter
	click_counter = 0;
	
	// initial paddle position
	xPos = 220;
	yPos = 489;

	// initial ball position
	ballxPos = 250;
	ballyPos = 250;

	// random ball speed
	ballxSpeed = 0;
	ballySpeed = 0;

	// cat position
	catxPos = int(random(10, 300));
	catyPos = int(random(10, 200));

	// points & misses
	points = 0;
	misses = 0;

	// ball
	ellipse(ballxPos,ballyPos, 20,20)

	// color
	stroke(255);
	// left border
	rect(0,0, 20,499);
	// right border
	rect(494,0, 20,499);
	// top border
	rect(0,0, 499,20);

	// play condition
	play = false;

	// stop loop for when you lose for the first time
	noLoop();


}

function draw() {
	// reset background
	background(space);


	// paddle
	rect(xPos,yPos, 100,10);

	// ball
	ellipse(ballxPos+ballxSpeed,ballyPos+ballySpeed, 20,20);

	// cat
	image(img, catxPos, catyPos);

	// borders
	// color
	stroke(128);
	fill(255);	
	// left border
	rect(0,0, 5,499);
	// right border
	rect(494,0, 5,499);
	// top border
	rect(0,0, 499,5);

	if (play == true) {

		// paddle left
		if (keyIsPressed && (key == 'a' || key =='A')) {
			if (xPos <= 0) {
				xPos = 0;
			} else {
				xPos -= 10;
			}
		}

		// paddle right
		else if (keyIsPressed && (key == 'd' || key == 'D')) {
			if (xPos >= 395) {
				xPos = 395;
			} else {
				xPos += 10;
			}
		}

		// ball - horizontal restrictions
		if (ballxPos >= 490 || ballxPos <= 10) {
			ballxSpeed = -ballxSpeed;
			if (ballySpeed <= 8) {
				ballySpeed += 0.5;
			}
			ballxPos = ballxPos + ballxSpeed;
			boing.play();
		} else {
			ballxPos = ballxPos + ballxSpeed;
		}

		// ball - vertical restriction
		if (ballyPos <= 10) {
			ballySpeed = -ballySpeed;
			if (ballxSpeed <= 4){
				ballxSpeed += 0.5;
			}
			ballyPos = ballyPos + ballySpeed;
			boing.play();
		} else {
			ballyPos = ballyPos + ballySpeed;
		}

		// ball - paddle hit
		if ((ballyPos >= yPos-10) && ((ballxPos >= xPos)&&(ballxPos <= xPos+100))) {
			// hit the left side
			if (ballxPos <= xPos + 50) {
				if (ballxSpeed > 0) {
					ballxSpeed = -ballxSpeed;
				}
			} 
			// hit the right
			else if (ballxPos > xPos + 50){
				if (ballxSpeed < 0) {
					ballxSpeed = -ballxSpeed;
				}
			}
			// increase ball speed in x & y direction each time paddle is hit
			if (ballxSpeed <= 4){
				ballxSpeed *= 1.1;
			}
			if (ballySpeed <= 6){
				ballySpeed *= -1.1;
			}
			// teleport ball up
			ballyPos = yPos-20;
			boing.play();
		}

		// Collisions
		// ball collision sides
		var ball_bot = ballyPos + 20;
		var ball_top = ballyPos;
		var ball_left = ballxPos;
		var ball_right = ballxPos + 20;

		// cat collision sides
		var cat_bot = catyPos+70;
		var cat_top = catyPos+45;
		var cat_left = catxPos+30;
		var cat_right = catxPos+85;

		// collision
		if (!(cat_bot < ball_top ||
			cat_top > ball_bot ||
			cat_right < ball_left ||
			cat_left > ball_right)) {

			// bongo point noise
			bongos.play();
			
			// move cat
			catxPos = int(random(10, 300));
			catyPos = int(random(10, 200));
			points = points + 1;

		}

		// write points and misses
		textAlign(LEFT);
		drawWords(width * .75);

		// ball - goes out of bounds - you lose - reset game
		if (ballyPos > yPos-5) {
			
			// lose sound
			lose.play();

			// lose message
			textAlign(CENTER);
			fill(255,0,0);
			stroke(0);
			text("YOU LOSE", 250,400);
			fill(255);
			text("CLICK TO TRY AGAIN", 250,450);
			noLoop(); // stop game for losing after first time

			// reset
			xPos = 220;
			yPos = 489;
			ballyPos = 250;
			ballxPos = 250;
			ballxSpeed = 0;
			ballySpeed = 0;
			misses = misses + 1;
			play = false;
			click_counter = 0;

		}
	}

}

// begin/restart game by clicking
function mouseClicked() {
	if (click_counter == 0) {
		ballxSpeed = int(random(3,5));
		ballySpeed = int(random(3,5));
		click_counter += 1;
	}
	loop(); // restart the loop once they click the mouse
	play = true;

}


// text function
function drawWords(x) {
	fill(255);
	text("Points: " + points, 20, 20);
	text("Misses: " + misses, 20, 40);
}








