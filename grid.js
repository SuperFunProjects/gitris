let grid;

function clearLines() {
    let clearThisLine = true;
    let keepClearing = true;

    while (keepClearing) {
        keepClearing = false;
        for (let i = 0; i<22; i++) {
            clearThisLine = true;
            for (let j = 0; j<10; j++) {
                if (grid[i][j] == "") {
                    clearThisLine = false;
                    break;
                }
            }
            //console.log("clearing liens");
            if (clearThisLine == true) {
                keepClearing = true;
                linesCleared += 1;
                console.log(`Total Lines Cleared = ${linesCleared}`);
                grid.splice(i, 1);
                grid.splice(0, 0, ["", "", "", "", "", "", "", "", "", ""]);
            }
        }
    }
    delete activePiece;
    canWeHold = true;
    activePiece = new artifacts(nextPieceNo.shift());
    nextPieceNo.push(gimmeShapeNo());
}

function drawLines(b) {
    gc.strokeWeight(1);
    gc.stroke(150);
    for (let i = 1; i <= 9; i++) {
        gc.line(i*b, 0, i*b, gc.height);
    }
    for (let i = 1; i <= 19; i++) {
        gc.line(0, i*b, gc.width, i*b);
    }
}

function initialSetupGrid() {
    grid = [];
    for (let i = 0; i<22; i++) {
        grid.push([]);
        for (let j = 0; j<10; j++) {
            grid[i].push("");
        }
    }
}
function drawGrid() {
    for (let i = 2; i<22; i++) {
        for (let j = 0; j<10; j++) {
            if (grid[i][j] != "") {
                createIndividualblock((j)*blockSize, (i-2)*blockSize, grid[i][j], 2, gc.CORNER, gc);
            }
        }
    }
}