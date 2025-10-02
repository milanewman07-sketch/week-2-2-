import { getShapes, TestResults, advanceToFrame, canvasStatus } from "../../lib/test-utils.js";

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

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    let actualShapes = getShapes();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    let shapeCount = actualShapes.length;
    if (actualShapes.length === 0) {
        TestResults.addPass("When the sketch loads, no shapes are drawn on screen.");
    } else {
        TestResults.addFail(`When the sketch loads, there should be no shapes drawn on screen. Found ${actualShapes.length} shapes.`);
    }
    mouseIsPressed = true;
    advanceToFrame(frameCount + 5);
    actualShapes = getShapes();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    if (actualShapes.length === shapeCount + 5) {
        TestResults.addPass("When the mouse is held down for five frames, five new shapes are drawn.");
    } else {
        TestResults.addFail(`When the mouse is held down for five frames, five new shapes should be on the screen. ${actualShapes.length - shapeCount} new shapes were found.`);
    }
    shapeCount = actualShapes.length;
    mouseIsPressed = false;
    advanceToFrame(frameCount + 1);
    actualShapes = getShapes();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    if (shapeCount === actualShapes.length) {
        TestResults.addPass("When the mouse is released, previously drawn shapes remain on screen.");
    } else {
        if (actualShapes.length > shapeCount) {
            TestResults.addFail("When the mouse is released, previously drawn shapes should remain on screen and no new shapes should be drawn. New shapes appear to have been drawn.");
        } else {
            TestResults.addFail("When the mouse is released, previously drawn shapes should remain on screen. This does not appear to be the case.");
        }
    }
    keyIsPressed = true;
    advanceToFrame(frameCount + 1);
    actualShapes = getShapes();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    if (actualShapes.length === 0) {
        TestResults.addPass("When a key is pressed, all shapes are removed.");
    } else {
        TestResults.addFail(`When a key is pressed, all shapes should be removed. ${actualShapes.length} shapes were found.`);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
