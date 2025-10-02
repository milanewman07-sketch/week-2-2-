import { checkCanvasSize, TestResults, checkBackgroundIsCalledInDraw, canvasStatus, testSettingCalledBeforeShapes, RANDOM_RE, testSettingIsCalled, advanceToFrame, getShapes, TestCircle, testShapesMatchWithoutOrder, testShapesMatchInOrder } from "../../lib/test-utils.js";

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

function testLoad() {
    if (canvasStatus.randomCalls.length === 0) {
        TestResults.addFail("<code>random()</code> is not called when the sketch is first loaded. If your code <em>does</em> call <code>random()</code> and this test is still failing, you have probably called <code>random()</code> from the wrong place in your code. Have a look at the randomColours example from Week 2 Lecture 2 to see where it should be called.");
        TestResults.addWarning("No further tests will run until <code>random()</code> is called as expected.");
    } else if (canvasStatus.randomCalls.length === 1) {
        if (testSettingIsCalled(RANDOM_RE, true, false)) {
            TestResults.addPass("<code>random()</code> is called in <code>setup()</code> when the sketch is first loaded.");
        }
        else if (testSettingIsCalled(RANDOM_RE, false, true)) {
            TestResults.addFail("<code>random()</code> is called in <code>draw()</code> when it is expected in <code>setup()</code>. Calling <code>random()</code> in draw will produce a different random value every frame.");
        }
        else {
            TestResults.addFail("<code>random()</code> is called but not in <code>setup()</code>. Move the call into <code>setup()</code> and assign the result of the call to the appropriate variable.");
        }
        if (canvasStatus.randomCalls[0].minVal !== 1) {
            TestResults.addFail(`The minimum value that <code>random()</code> can return has been set to ${canvasStatus.randomCalls[0].minVal} when it should have been set to 1.`);
        }
        else {
            TestResults.addPass("The minimum value that <code>random()</code> can return has been set correctly.");
        }
        if (canvasStatus.randomCalls[0].maxVal === 10) {
            TestResults.addPass("The maximum value of <code>random()</code> has been set correctly.");
        } else {
            TestResults.addFail(`The maximum value of <code>random()</code> has been set to ${canvasStatus.randomCalls[0].maxVal} when it should have been set to 10.`);
        }
    } else {
        TestResults.addFail(`Expected <code>random()</code> to be called exactly once, in <code>setup()</code>. In the first frame of the sketch, <code>random()</code> is called ${canvasStatus.randomCalls.length} times`);
        TestResults.addWarning("No further tests will run until <code>random()</code> is called as expected.");
    }
}

function testNextFrame() {
    if (canvasStatus.randomCalls.length === 1) {
        const speedChange = canvasStatus.randomCalls[0].returnVal;
        advanceToFrame(frameCount+1);
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        const shapes = getShapes();
        if (shapes.length !== 1) {
            TestResults.addFail(`When the frame count is ${frameCount}, there should be one circle at a randomly assigned x coordinate. The sketch currently has ${shapes.length} shapes.`);
        } else {
            const expectedCircle = new TestCircle(speedChange, 300, 100);
            if (testShapesMatchInOrder([expectedCircle], shapes, false)) {
                TestResults.addPass(`When the frame count is ${frameCount}, the circle has moved by the randomly assigned amount.`);
                // Test moving left
                const firstLeft = Math.ceil(width / speedChange) + 1;
                advanceToFrame(firstLeft);
                for (const e of canvasStatus.errors) {
                    TestResults.addFail(`In frame ${frameCount}, ${e}`);
                }
                const circleX1 = getShapes()[0].x;
                advanceToFrame(firstLeft + 1);
                for (const e of canvasStatus.errors) {
                    TestResults.addFail(`In frame ${frameCount}, ${e}`);
                }
                const circleX2 = getShapes()[0].x;
                if (circleX2 < circleX1) {
                    TestResults.addPass("When the circle has reached the right edge, it begins moving left.");
                }
                else {
                    TestResults.addFail("When the circle has reached the right edge, it does not appear to move left. To achieve the expected output, you only need to change how <code>moveAmount</code> is initialised. There should be any other changes to the code.");
                }
            } else {
                TestResults.addFail(`When the frame count is ${frameCount}, the circle has not moved by the expected randomly assigned amount. To achieve the expected output, you only need to change how <code>moveAmount</code> is initialised. There should be any other changes to the code.`);
            }
        }
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    checkBackgroundIsCalledInDraw();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    testLoad();
    testNextFrame();
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
