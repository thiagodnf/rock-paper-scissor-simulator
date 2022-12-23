class Canvas {

    static ASSETS = {};

    constructor(canvasId) {

        const that = this;

        this.mouse = {x:0, y:0};
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.addEventListener("mousemove", function (event) {
            that.onMouseMove(event);
        });

        this.canvas.addEventListener("mouseup", function (event) {
            EventEmitter.emit("canvas-mouse-up", that.mouse);
        });
    }

    onMouseMove(evt) {

        let rect = this.canvas.getBoundingClientRect();

        this.mouse = {
            x: (evt.clientX - rect.left),
            y: (evt.clientY - rect.top)
        };
    }

    setWidth(value) {
        this.canvas.width = value;
    }

    setHeight(value) {
        this.canvas.height = value;
    }

    cleanScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    loadAsset(key, src) {
        this.loadImage(src, function (image) {
            Canvas.ASSETS[key] = image;
        });
    }

    loadImage(src, callback) {

        let image = new Image();

        image.src = src;

        image.onload = function () {
            callback(image);
        };
    }

    drawLine(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x0, y0 + 0.5);
        this.ctx.lineTo(x1, y1 + 0.5);
        this.ctx.stroke();
    }

    drawGrid() {

        let diameter = Settings.radius * 2;

        let vLines = this.canvas.width / diameter;
        let hLines = this.canvas.height / diameter;

        for (let i = 0; i < vLines; i++) {
            this.drawLine(i * diameter, 0, i * diameter, this.canvas.height);
        }

        for (let i = 0; i < hLines; i++) {
            this.drawLine(0, i * diameter, this.canvas.width, i * diameter);
        }
    }
}
