let x = 50;
let y = 50
let moveX = 1;
let moveY = 1;

function setup() {
    createCanvas(600, 400);
    moveX = 3
    moveY = 3
}

function draw() {
    circle(x, y, 100);
    if (x < 50 || x > width - 50) {
        moveX *= -1;
    }
    x += moveX;

    if (y < 50 || y > height - 50) {
        moveY *= -1;
    }
    y += moveY;
}