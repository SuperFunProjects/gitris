const blockSize = 35;
let linesCleared;
let activePiece;
let nextPieceNo = [];

let holdPieceNo = undefined;
let canWeHold = true;

// p5 instance for grid
let gridCanvasFunction = function (p) {
    let mouseOnCanvas = false, scoreText, xtouch, ytouch, canabis;

    p.setup = function () {
        scoreText = p.createElement('h2', ``);

        canabis = p.createCanvas(10*blockSize, 20*blockSize);
        // canabis.mousePressed(p.tStarted);
        // canabis.mouseReleased(p.tEnded);
        canabis.touchMoved(function () {
            if(-p.pmouseX/p.width >= 0.2) {
                console.log("grid canvas: L swipe");
                activePiece.moveLeft();
            }
            else if(p.pmouseX/p.width > 0.2) {
                console.log("grid canvas: R swipe");
                activePiece.moveRight();
            }
            else if(p.pmouseY/p.height > 0.2) {
                console.log("grid canvas: D swipe");
                activePiece.moveDown();
            }
            else if(-p.pmouseY/p.height > 0.2) {
                console.log("grid canvas: U swipe");
                activePiece.rotatePiece(1);
            }
        });
        p.frameRate(24);

        initialSetupGrid();
        linesCleared = 0;
        activePiece = new artifacts(gimmeShapeNo());
        nextPieceNo.push(gimmeShapeNo());
        nextPieceNo.push(gimmeShapeNo());
        nextPieceNo.push(gimmeShapeNo());
    }

    p.draw = function () {
        p.background(250);
        scoreText.html(`Lines Cleared: ${linesCleared}`);
        drawLines(blockSize);
        drawGrid();

        activePiece.createPiece();
        downKeyPresses();
        autoDown();
    }

    // p.tStarted = function () {
    //     xtouch = p.mouseX;
    //     ytouch = p.mouseY;
    //     mouseOnCanvas = true;
    //     return false;
    // }
    // p.tEnded = function () {
    //     if(mouseOnCanvas == true) {
    //         if((xtouch-p.mouseX)/xtouch >= 0.2) {
    //             console.log("grid canvas: L swipe");
    //             activePiece.moveLeft();
    //         }
    //         else if((p.mouseX-xtouch)/xtouch > 0.2) {
    //             console.log("grid canvas: R swipe");
    //             activePiece.moveRight();
    //         }
    //         else if((p.mouseY-ytouch)/ytouch > 0.2) {
    //             console.log("grid canvas: D swipe");
    //             activePiece.moveDown();
    //         }
    //         else if((ytouch-p.mouseY)/ytouch > 0.2) {
    //             console.log("grid canvas: U swipe");
    //             activePiece.rotatePiece(1);
    //         }
    //         mouseOnCanvas = false;
    //     }
    //     return false;
    // }
}
let gc = new p5(gridCanvasFunction, "grid");

// hold piece function
function holdPiece() {
    let activePieceNo;
    if (canWeHold == true) {
        canWeHold = false;
        activePieceNo = activePiece.shapeNo;
        // if hold box is empty
        if (holdPieceNo == undefined) {
            holdPieceNo = nextPieceNo.shift();
            nextPieceNo.push(gimmeShapeNo());
        }
        // swap
        [holdPieceNo, activePieceNo] = [activePieceNo, holdPieceNo];
        delete activePiece;
        activePiece = new artifacts(activePieceNo);
    }
}

// create individual block
function createIndividualblock(x, y, color, weight, mode, p5Obj) {
    p5Obj.fill(color);
    p5Obj.strokeWeight(weight);
    p5Obj.stroke(0);
    p5Obj.rectMode(mode);
    p5Obj.rect(x, y, blockSize);
}

// fischer-yates random bag algo for shape generation;
const arr = [0, 1, 2, 3, 4, 5, 6];
function fisherYatesArray() {
    let tempArr = [...arr];
    var m = tempArr.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = tempArr[m];
        tempArr[m] = tempArr[i];
        tempArr[i] = t;
    }

    return tempArr;
}
var tempArr = fisherYatesArray();
function gimmeShapeNo() {
    let i;
    if(tempArr.length == 0) {
        //console.log("new bag")
        tempArr = fisherYatesArray();
    }
    i = tempArr.pop();
    //console.log(`spawning shape no ${i}`);
    return i;
}