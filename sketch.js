const blockSize = 35;
let vibrationStrength = 1;
let linesCleared;
let activePiece;
let nextPieceNo = [];

let holdPieceNo = undefined;
let canWeHold = true;

// p5 instance for grid
let gridCanvasFunction = function (p) {
    let scoreText, canabis;

    p.setup = function () {
        scoreText = p.createElement('h2', ``);

        canabis = p.createCanvas(10*blockSize, 20*blockSize);
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
