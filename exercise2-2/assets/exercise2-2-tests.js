import { TestResults, TestSquare, advanceToFrame, checkBackgroundIsCalledInDraw, checkCanvasSize, testShapesMatchInOrder, getShapes, canvasStatus } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function testSquareAtCoord(mX, mY) {
    const MIN_COORD = 25;
    const MAX_COORD = 375;
    const test_x = Math.min(Math.max(MIN_COORD, mX), MAX_COORD);
    const test_y = Math.min(Math.max(MIN_COORD, mY), MAX_COORD);
    const testSquare = new TestSquare(test_x, test_y, 50, CENTER);
    let msg = "When <code>mouseX</code> is ";
    if (mX < MIN_COORD) {
        msg += `off the left edge of the screen (${mX}) `;
    } else if (mX > MAX_COORD) {
        msg += `off the right edge of the screen (${mX}) `;
    }
    else {
        msg += `${mX}, `;
    }
    msg += "and <code>mouseY</code> is ";
    if (mY < MIN_COORD) {
        msg += `off the top edge of the screen (${mY}), `;
    } else if (mY > MAX_COORD) {
        msg += `off the bottom edge of the screen (${mY}), `;
    } else {
        msg += `${mY}, `;
    }
    const actualShapes = getShapes();
    if (testShapesMatchInOrder([testSquare], actualShapes, false)) {
        TestResults.addPass(msg + "the square is at the expected coordinates.");
    } else {
        if (actualShapes.length === 1) {
            TestResults.addFail(`${msg}the square is not at the expected coordinates. There should be a 50px wide square at ${test_x}, ${test_y}. Your sketch contains a ${actualShapes[0].w}px width ${actualShapes[0].type} at ${actualShapes[0].x + actualShapes[0].w / 2}, ${actualShapes[0].y + actualShapes[0].h / 2}.`);
        } else {
            TestResults.addFail(`${msg}one square is expected but ${actualShapes.length} squares were found.`);
        }
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    // Check canvas size
    checkCanvasSize(400, 400);
    // Check background called in draw()
    checkBackgroundIsCalledInDraw();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    // Check square moves with mouse
    mouseX = 210;
    mouseY = 333;
    advanceToFrame(2);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testSquareAtCoord(mouseX, mouseY);
    // Out of bounds - left
    mouseX = 24;
    mouseY = 26;
    advanceToFrame(3);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testSquareAtCoord(mouseX, mouseY);
    // Out of bounds - right
    mouseX = 401;
    mouseY = 58;
    advanceToFrame(4);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testSquareAtCoord(mouseX, mouseY);
    // Out of bounds - top
    mouseX = 200;
    mouseY = 0;
    advanceToFrame(5);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testSquareAtCoord(mouseX, mouseY);
    // Out of bounds - bottom
    mouseX = 75;
    mouseY = 390;
    advanceToFrame(6);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testSquareAtCoord(mouseX, mouseY);
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
