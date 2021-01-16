let holdPieceCanvas = function (p) {
    let heading, canabis, color;
    p.holdWarning = false;

    p.setup = function () {
        heading = p.createElement('h2', 'HOLD');
        heading.style("margin-top", "80px");

        canabis = p.createCanvas(4*blockSize, 4*blockSize);
        canabis.mouseClicked(p.letThereBeTouch);
        canabis.style('clear', 'right');

        p.frameRate(24);
    }

    p.draw = function () {
        p.background(250);

        if (holdPieceNo != undefined) {
            let piece = new setPieces().releasePiece(holdPieceNo);
            for (let i of piece.blockPositions) {
                if(canWeHold == true)
                    color = piece.color;
                else
                    color = "grey";
                p.fill(color);
                p.strokeWeight(2);
                p.stroke(0);
                p.rect(i.x-3*blockSize, i.y, blockSize);
            }
        }
    }

    p.letThereBeTouch = function () {
        //console.log("hold: touched");
window.navigator.vibrate(vibrationStrength);
        holdPiece();
    }
}

let hpc = new p5(holdPieceCanvas, "hold");
