import { TestResults, canvasStatus, testSettingCalledBeforeShapes, advanceToFrame, getShapes, BACKGROUND, coloursMatch, testSettingIsCalled } from "../../lib/test-utils.js";

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
    if (window.hasOwnProperty("setup") && window.hasOwnProperty("draw")) {
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        const startBG = canvasStatus.backgroundColour;
        let startFill = canvasStatus.fillColour;
        mouseIsPressed = false;
        advanceToFrame(2);
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        
        if (testSettingIsCalled(BACKGROUND, true, true) && testSettingCalledBeforeShapes(BACKGROUND, false, true)) {
            TestResults.addPass("When the mouse is not pressed, the background colour is set before drawing any shapes.");
        } else {
            TestResults.addFail("When the mouse is not pressed, the background colour is not set before drawing shapes.")
        }
        if (testSettingIsCalled(FILL, true, true) && testSettingCalledBeforeShapes(FILL, false, true)) {
            TestResults.addPass("When the mouse is not pressed, the fill colour is set before drawing the shape.");
        } else {
            TestResults.addFail("When the mouse is not pressed, the fill colour is not set before drawing the shape.");
        }
        let actualShapes = getShapes();
        if (actualShapes.length === 1) {
            startFill = actualShapes[0].fillColour;
        } else {
            TestResults.addFail(`Expected 1 shape but found ${actualShapes.length} at frame 2. Is <code>background()</code> always called in <code>draw()</code>?`);
        }
        mouseIsPressed = true;
        advanceToFrame(5);
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        actualShapes = getShapes();
        const fillPressed = actualShapes.length > 0 ? actualShapes[actualShapes.length - 1].fillColour : canvasStatus.fillColour;
        const bgSwapped = coloursMatch(fillPressed, startBG);
        const fillSwapped = coloursMatch(canvasStatus.backgroundColour, startFill);
        if (bgSwapped) {
            TestResults.addPass("When the mouse is first pressed, the background colour changes as expected.");
        } else {
            TestResults.addFail("When the mouse is first pressed, the background colour does not change as expected. It should be the same as the initial fill colour.");
        }
        if (fillSwapped) {
            TestResults.addPass("When the mouse is first pressed, the fill colour changes as expected.");
        } else {
            TestResults.addFail("When the mouse is first pressed, the fill colour does not change as expected. It should be the same as the initial background colour.");
        }
        mouseIsPressed = false;
        advanceToFrame(7);
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        actualShapes = getShapes();
        const fillReleased = actualShapes.length > 0 ? actualShapes[actualShapes.length - 1].fillColour : canvasStatus.fillColour;
        const bgSwappedBack = coloursMatch(canvasStatus.backgroundColour, startBG);
        const fillSwappedBack = coloursMatch(fillReleased, startFill);
        if (bgSwappedBack) {
            TestResults.addPass("When the mouse is released, the background colour changes back to the original colour.");
        } else {
            TestResults.addFail("When the mouse is released, the background colour does not change back to its original colour.");
        }
        if (fillSwappedBack) {
            TestResults.addPass("When the mouse is released, the fill colour changes back to the original colour.");
        } else {
            TestResults.addFail("When the mouse is released, the fill colour changes back to its original colour.");
        }
    } else {
        TestResults.addWarning("Not running tests until <code>setup()</code> and <code>draw()</code> are implemented.");
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
