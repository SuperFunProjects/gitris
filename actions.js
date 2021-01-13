// MANUAL
// single key presses
gc.keyPressed = function() {
    if (gc.keyCode === gc.UP_ARROW) {
        activePiece.rotatePiece(1);
    } else if (gc.keyCode === 90) { // z
        activePiece.rotatePiece(-1);
    }

    if (gc.keyCode === 32) { // space
        activePiece.hardDrop();
    }
    if (gc.keyCode === 72) { // space
        holdPiece();
    }
    if (gc.keyCode === gc.RIGHT_ARROW) {
        activePiece.moveRight();
    }
    if (gc.keyCode === gc.LEFT_ARROW) {
        activePiece.moveLeft();
    }
}
// down key is special
function downKeyPresses() {
    if (gc.keyIsDown(gc.DOWN_ARROW)) {
        activePiece.moveDown();
    }
}

// AUTO DOWN EVERY SECOND
function autoDown() {
    if (gc.frameCount % 20 === 0) {
        activePiece.moveDown();
    }
}

// PLAY / PAUSE BUTTON
function playPause() {

}