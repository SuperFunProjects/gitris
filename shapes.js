class artifacts {
    constructor(shapeNo = 0) {
        this.shapeNo = shapeNo;

        // setting pieces
        this.piece = new setPieces().releasePiece(shapeNo);
        for (let i of this.piece.blockPositions) {
            i.sub(0, 2*blockSize);
        }
        this.piece.rotatePoint.sub(0, 2*blockSize);

        // Rotation
        this.rotCurrentStatus = 0;
        // wall kick based on super rotation system
        if (shapeNo === 0) {
            this.rotationMatrix = new setRotMatrix().releaseRotationMatrix(0);
        } else {
            this.rotationMatrix = new setRotMatrix().releaseRotationMatrix(1);
        }

        // Auto move down if no collison
        let counter = 0;
        let safe;
        while (counter < 2) {
            safe = this.cordClone();
            for (let i of this.piece.blockPositions) {
                i.add(0, blockSize);
            }
            this.piece.rotatePoint.add(0, blockSize);

            if (this.doesItFit() == true) {
                counter += 1;
                continue;
            } else {
                this.cordReset(safe);
                break;
            }
        }
    }
    createPiece() {
        if (this.doesItFit() == false) {

window.navigator.vibrate(10*vibrationStrength);
            gc.noLoop();
            npc.noLoop();
            hpc.noLoop();
window.alert("GAME OVER");
        } else {
            this.createDropPreview();
            for (let i of this.piece.blockPositions) {
                createIndividualblock(i.x, i.y, this.piece.color, 2, gc.CENTER, gc);
            }
        }
    }
    createDropPreview() {
        let safe = this.cordClone();
        while (this.doesItFit()) {
            for (let i of this.piece.blockPositions) {
                i.add(0, blockSize);
            }
            this.piece.rotatePoint.add(0, blockSize);
        }
        for (let i of this.piece.blockPositions) {
            i.sub(0, blockSize);
        }
        this.piece.rotatePoint.sub(0, blockSize);

        for (let i of this.piece.blockPositions) {
            createIndividualblock(i.x, i.y, "250", 2, gc.CENTER, gc);
        }
        this.cordReset(safe);
    }
    rotatePiece(rotRequestStatus) {
        // back up the current coordinates
        let safe = this.cordClone();
        let newRotationStatus = Math.round((4 + this.rotCurrentStatus + rotRequestStatus)%4);

        for (let i of this.rotationMatrix[`${this.rotCurrentStatus}`][`${newRotationStatus}`]) {
            // wall kick
            this.temp = gc.createVector(i.x*blockSize, i.y*blockSize);
            for (let j of this.piece.blockPositions) {
                j.add(this.temp);
            }
            this.piece.rotatePoint.add(this.temp);
            // rotation
            gc.push();
                gc.translate(this.piece.rotatePoint.x, this.piece.rotatePoint.y);
                for (let i of this.piece.blockPositions) {
                    i.sub(this.piece.rotatePoint);
                    i.rotate(rotRequestStatus*gc.PI/2);
                    i.add(this.piece.rotatePoint);
                }
            gc.pop();
            // checking for valid rotation
            if (this.doesItFit() === true ) {
                this.rotCurrentStatus = newRotationStatus;
                break;
            }
            // block positions reset in case of in valid, and check for another wall kick
            this.cordReset(safe);
        }
    }
    moveRight() {
        // backing up current coordinates
        let safe = this.cordClone();
        for (let i of this.piece.blockPositions) {
            i.add(blockSize, 0);
        }
        this.piece.rotatePoint.add(blockSize, 0);
        if (this.doesItFit() === false) {
            this.cordReset(safe);
        }
    }
    moveLeft() {
        let safe = this.cordClone();

        for (let i of this.piece.blockPositions) {
            i.sub(blockSize, 0);
        }
        this.piece.rotatePoint.sub(blockSize, 0);
        if (this.doesItFit() === false) {
            this.cordReset(safe);
        }
    }
    moveDown() {
        let safe = this.cordClone();
        for (let i of this.piece.blockPositions) {
            i.add(0, blockSize);
        }
        this.piece.rotatePoint.add(0, blockSize);
        if (this.doesItFit() === false) {
            this.cordReset(safe);
            this.cleanUp();
            clearLines();
        }
    }
    hardDrop() {
        while(this.doesItFit() == true) {
            this.moveDown();
        }
    }

    doesItFit() {
        let collided = true;
        for (let i of this.piece.blockPositions) {
            if (i.y >= gc.height || i.x <= 0 || i.x >= gc.width || grid[Math.round(i.y/blockSize + 1.5)][Math.round(i.x/blockSize - 0.5)] != "") {
                collided = false;
                return collided;
            }
        }
        return collided;
    }
    cordClone() {
        let safe = [];
        for (let i of this.piece.blockPositions) {
            safe.push(gc.createVector(i.x, i.y));
        }
        safe.push(gc.createVector(this.piece.rotatePoint.x, this.piece.rotatePoint.y));
        return safe;
    }
    cordReset(safe) {
        for (let i=0; i<4; i++) {
            this.piece.blockPositions[i].x = safe[i].x;
            this.piece.blockPositions[i].y = safe[i].y;
        }
        this.piece.rotatePoint.x = safe[4].x;
        this.piece.rotatePoint.y = safe[4].y;
    }
    cleanUp() {
        for (let i of this.piece.blockPositions) {
            grid[Math.round(i.y/blockSize + 1.5)][Math.round(i.x/blockSize - 0.5)] = this.piece.color;
        }
    }
}

//initial coordinates of all pieces
class setPieces {
    constructor() {
        this.allPieces = [];
        const iPiece0 = {
            blockPositions : [gc.createVector(3.5*blockSize, 1.5*blockSize), gc.createVector(4.5*blockSize, 1.5*blockSize),
                gc.createVector(5.5*blockSize, 1.5*blockSize), gc.createVector(6.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(5*blockSize, 2*blockSize),
            color : "aqua"
        }
        const lPiece1 = {
            blockPositions : [gc.createVector(3.5*blockSize, 0.5*blockSize), gc.createVector(3.5*blockSize, 1.5*blockSize),
                gc.createVector(4.5*blockSize, 1.5*blockSize), gc.createVector(5.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(4.5*blockSize, 1.5*blockSize),
            color : "blue"
        }
        const jPiece2 = {
            blockPositions : [gc.createVector(5.5*blockSize, 0.5*blockSize), gc.createVector(3.5*blockSize, 1.5*blockSize),
                gc.createVector(4.5*blockSize, 1.5*blockSize), gc.createVector(5.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(4.5*blockSize, 1.5*blockSize),
            color : "orange"
        };
        const oPiece3 = {
            blockPositions : [gc.createVector(4.5*blockSize, 0.5*blockSize), gc.createVector(5.5*blockSize, 0.5*blockSize),
                gc.createVector(4.5*blockSize, 1.5*blockSize), gc.createVector(5.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(5*blockSize, 1*blockSize),
            color : "yellow"
        };
        const sPiece4 = {
            blockPositions : [gc.createVector(4.5*blockSize, 0.5*blockSize), gc.createVector(5.5*blockSize, 0.5*blockSize),
                gc.createVector(3.5*blockSize, 1.5*blockSize), gc.createVector(4.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(4.5*blockSize, 1.5*blockSize),
            color : "LawnGreen"
        };
        const zPiece5 = {
            blockPositions : [gc.createVector(3.5*blockSize, 0.5*blockSize), gc.createVector(4.5*blockSize, 0.5*blockSize),
                gc.createVector(4.5*blockSize, 1.5*blockSize), gc.createVector(5.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(4.5*blockSize, 1.5*blockSize),
            color : "violet"
        };
        const tPiece6 = {
            blockPositions : [gc.createVector(4.5*blockSize, 0.5*blockSize), gc.createVector(3.5*blockSize, 1.5*blockSize),
                gc.createVector(4.5*blockSize, 1.5*blockSize), gc.createVector(5.5*blockSize, 1.5*blockSize)],
            rotatePoint : gc.createVector(4.5*blockSize, 1.5*blockSize),
            color : "red"
        };

        this.allPieces.push(iPiece0);
        this.allPieces.push(lPiece1);
        this.allPieces.push(jPiece2);
        this.allPieces.push(oPiece3);
        this.allPieces.push(sPiece4);
        this.allPieces.push(zPiece5);
        this.allPieces.push(tPiece6);
    }
    releasePiece(shapeNo) {
        return this.allPieces[shapeNo];
    }
}
// super rotation system -> x, y axis convention diff from fandom website
class setRotMatrix {
    constructor() {
        this.rotationMatrix = [];
        // i piece
        const a = {
            0 : {
                1 : [gc.createVector(0, 0), gc.createVector(-2, 0), gc.createVector(1, 0), gc.createVector(-2, 1), gc.createVector(1, -2)],
                3 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(2, 0), gc.createVector(-1, -2), gc.createVector(2, 1)]
            },
            1 : {
                0 : [gc.createVector(0, 0), gc.createVector(2, 0), gc.createVector(-1, 0), gc.createVector(2, -1), gc.createVector(-1, 2)],
                2 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(2, 0), gc.createVector(-1, -2), gc.createVector(2, 1)]
            },
            2 : {
                1 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(-2, 0), gc.createVector(1, 2), gc.createVector(-2, -1)],
                3 : [gc.createVector(0, 0), gc.createVector(2, 0), gc.createVector(-1, 0), gc.createVector(2, -1), gc.createVector(-1, 2)]
            },
            3 : {
                0 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(-2, 0), gc.createVector(1, 2), gc.createVector(-2, -1)],
                2 : [gc.createVector(0, 0), gc.createVector(-2, 0), gc.createVector(1, 0), gc.createVector(-2, 1), gc.createVector(1, -2)]
            }
        };
        // other
        const b = {
            0 : {
                1 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(-1, -1), gc.createVector(0, 2), gc.createVector(-1, 2)],
                3 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(1, -1), gc.createVector(0, 2), gc.createVector(1, 2)]
            },
            1 : {
                0 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(1, 1), gc.createVector(0, -2), gc.createVector(1, -2)],
                2 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(1, 1), gc.createVector(0, -2), gc.createVector(1, -2)]
            },
            2 : {
                1 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(-1, -1), gc.createVector(0, 2), gc.createVector(-1, 2)],
                3 : [gc.createVector(0, 0), gc.createVector(1, 0), gc.createVector(1, -1), gc.createVector(0, 2), gc.createVector(1, 2)]
            },
            3 : {
                0 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(-1, 1), gc.createVector(0, -2), gc.createVector(-1, -2)],
                2 : [gc.createVector(0, 0), gc.createVector(-1, 0), gc.createVector(-1, 1), gc.createVector(0, -2), gc.createVector(-1, -2)]
            }
        }
        this.rotationMatrix.push(a);
        this.rotationMatrix.push(b);
    }
    releaseRotationMatrix(id) {
        return this.rotationMatrix[id];
    }
}
