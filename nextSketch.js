 let nextPieceCanvas = function (p) {
     let heading, canabis;

    p.setup = function () {
        heading = p.createElement('h2', 'NEXT');

        canabis = p.createCanvas(4*blockSize, 12*blockSize);
        canabis.touchMoved(p.letThereBeTouch);

        p.frameRate(24);
    }

    p.draw = function () {
        let startPos = 0;
        p.background(250);

        for (let j of nextPieceNo) {
            if (j != undefined) {
                let piece = new setPieces().releasePiece(j);
                for (let i of piece.blockPositions) {
                    p.fill(piece.color);
                    p.strokeWeight(2);
                    p.stroke(0);
                    p.rect(i.x-3*blockSize, i.y+startPos, blockSize);
                }
                startPos += 4*blockSize;
            }
        }
    }

     p.mousePressed = function () {
         return false;
     }
     p.mouseReleased = function () {
         return false;
     }

    p.letThereBeTouch = function () {
        console.log("next: hard drop");
        activePiece.hardDrop();
    }
}

let npc = new p5(nextPieceCanvas, "hold");
