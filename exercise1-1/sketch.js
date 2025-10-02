let circleX;
let circleY;
let circleWidth;

function setup() {
    createCanvas(400, 400);
    noStroke();
    fill(255, 0, 150);
    background(0);
}

function draw() {
    
    circleX = random(width + 1);
    circleY = random(height + 1);
    circleWidth = random(10, 101);
    if (mouseIsPressed) {
        circle(circleX, circleY, circleWidth);
    }
    if (keyIsPressed){
        background(0);
    }
}