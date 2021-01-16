let buttonCanvas = function (p) {
    let canabis, heading, up, down, left, right;

    p.setup = function () {
        heading = p.createElement('h2', 'Controls');

        canabis = p.createCanvas(9*blockSize, 9*blockSize);
        p.background(0);

        up = p.rect(3*blockSize, 0, 3*blockSize, 3*blockSize, 20);
        up.fill("red");
        canabis.mouseClicked(p.handleClicks);
    }
    p.draw = function () {

    }
    p.handleClicks = function () {
        let x = p.mouseX;
        let y = p.mouseY;
        if (x >= 3*blockSize && y >=0 && x <= 6*blockSize && y <= 3*blockSize)
            activePiece.rotatePiece(1);
    }
}

let bpc = new p5(buttonCanvas, "buttons");