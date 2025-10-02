import { TestResults, advanceToFrame, checkBackgroundIsCalledInDraw, checkCanvasSize, getShapes, canvasStatus } from "../../lib/test-utils.js";

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

function checkDirection(prevShapes, currShapes, xDir, yDir, frameNum) {
    if (currShapes.length !== 1 || prevShapes.length !== currShapes.length) {
        TestResults.addFail(`There should only be one circle drawn on the canvas at frame ${frameNum}. Found ${currShapes.length} shapes.`);
    } else {
        const xChange = currShapes[0].x - prevShapes[0].x;
        if (xChange === xDir) {
            TestResults.addPass(`At frame ${frameNum}, the circle is moving ${xDir > 0 ? "right" : "left"} at 3px per frame on the x axis.`);
        } else {
            TestResults.addFail(`At frame ${frameNum}, the circle should be travelling ${xDir > 0 ? "right": "left"} at 3px per frame on the x axis. Your shape is travelling ${xChange > 0 ? "right" : "left"} at ${Math.abs(xChange)}px per frame.`);
        }
        const yChange = currShapes[0].y - prevShapes[0].y;
        if (yChange === yDir) {
            TestResults.addPass(`At frame ${frameNum}, the circle is moving ${yDir > 0 ? "down" : "up"} at 3px per frame on the y axis.`);
        } else {
            TestResults.addFail(`At frame ${frameNum}, the circle should be travelling ${yDir > 0 ? "down": "up"} at 3px per frame on the y axis. Your shape is travelling ${yChange > 0 ? "down" : "up"} at ${Math.abs(yChange)}px per frame.`);
        }
    }
}


async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    // Check canvas size
    checkCanvasSize(600, 400);
    // Check background called in draw()
    checkBackgroundIsCalledInDraw();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes1 = getShapes();
    // at frame 2, moving forward on both axes
    advanceToFrame(2);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes2 = getShapes();
    checkDirection(shapes1, shapes2, 3, 3, 2);
    
    advanceToFrame(166);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes166 = getShapes();
    // at frame 167, moving forward on x, up on y axis
    advanceToFrame(167);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes167 = getShapes();
    checkDirection(shapes166, shapes167, 3, -3, 167 );
    // at frame 170, moving left and up

    advanceToFrame(169);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes169 = getShapes();
    advanceToFrame(170);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes170 = getShapes();
    checkDirection(shapes169, shapes170, -3, -3, 170);

    advanceToFrame(209);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes209 = getShapes();
    advanceToFrame(210);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes210 = getShapes();
    checkDirection(shapes209, shapes210, -3, 3, 210);

    advanceToFrame(349);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes349 = getShapes();
    advanceToFrame(350);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const shapes350 = getShapes();
    checkDirection(shapes349, shapes350, 3, -3, 350);
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
