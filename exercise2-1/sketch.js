let pink;

function setup() {
    createCanvas(600, 600);
    pink = color(255, 179, 187)
}

function draw() {

    if (mouseIsPressed){
        background(0)
        fill(pink)
    } else {
        background(pink)
        fill(0)
    }
    circle(width / 2, height / 2, width * 0.8)

}