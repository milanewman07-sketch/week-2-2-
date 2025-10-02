let pink;
let x;
let y;

function setup() {
    createCanvas(400, 400);
    pink = color(255, 179, 187)
}

function draw() {
    background(pink)

    if (mouseX >= width - 25) {
        x = width - 25
        y = mouseY
    } else if (mouseX <= 25) {
        x = 25
        y = mouseY
    } else if (mouseY <= 25) {
        y = 25
        x = mouseX
    } else if (mouseY >= height - 25) {
        y = height - 25
        x = mouseX
    } else {
        x = mouseX
        y = mouseY
    }

    fill(255)
    rectMode(CENTER)
    square(x, y, 50)


}