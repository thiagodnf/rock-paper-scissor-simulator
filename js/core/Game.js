class Game {

    constructor() {

        this.points = [];
        this.isRunning = false;
        this.stats = [0, 0, 0];

        EventEmitter.on("collide", (c1, c2) => {

            this.stats[c1.hand]--;
            this.stats[c2.hand]--;

            c1.hand = c2.hand = GameRule.getWinner(c1.hand, c2.hand);

            this.stats[c1.hand] += 2;
        });
    }

    addHandManually(x, y, hand){

        let pos = [x, y];
        let velocity = [Random.getOne([1, -1]), Random.getOne([1, -1])];

        this.points.push(new Particle(pos, velocity, hand));

        this.updateStats();
    }

    addChart(chart) {

        EventEmitter.on("init", () => {
            chart.setScaleForYAxis(0, this.points.length);
            // chart.update(this.stats);
        });

        EventEmitter.on("updatedStats", (stats) => {
            chart.setScaleForYAxis(0, this.points.length);
            chart.update(this.stats);
        });
    }

    updateStats(){

        this.stats = [0, 0, 0];

        for (const point of this.points) {
            this.stats[point.hand]++;
        }

        EventEmitter.emit("updatedStats", this.stats);
    }

    init(canvas, numberOfParticles) {

        this.points = [];

        let w = canvas.canvas.width / (Settings.radius * 2);
        let h = canvas.canvas.height / (Settings.radius * 2);

        for (let i = 1; i < w - 1; i++) {

            for (let j = 1; j < h - 1; j++) {

                let pos = [Settings.radius * 2 * i, Settings.radius * 2 * j];
                let velocity = [Random.getOne([1, -1]), Random.getOne([1, -1])];
                let hand = Random.getRandomInt(0, 2);

                let p = new Particle(pos, velocity, hand);

                this.points.push(p);
            }
        }

        this.points = Random.getSubArray(this.points, numberOfParticles);

        this.updateStats();

        EventEmitter.emit("init", this.stats);
    }

    playOrStop() {
        this.isRunning = !this.isRunning;
    }

    update(i) {

        if (!this.isRunning) {
            return;
        }

        let c1 = this.points[i];

        for (let j = i + 1; j < this.points.length; j++) {

            let c2 = this.points[j];

            Collision.verifyCollision(c1, c2);
        };

        if (Settings.sameSpeed) {

            let c = c1.velocity.norm();
            let a = c1.velocity[0];
            let b = c1.velocity[1];

            let sin = b / c;
            let cos = a / c;

            c1.velocity[0] = Settings.speed * cos;
            c1.velocity[1] = Settings.speed * sin;
        }

        Collision.findAllCollisionsWithWalls(this.points, i, canvas.canvas.width, canvas.canvas.height);

        c1.pos = c1.pos.sum(c1.velocity);

        EventEmitter.emit("updatedStats", this.stats);
    }

    draw(canvas) {

        canvas.cleanScreen();

        if (Settings.showGrid) {
            canvas.drawGrid();
        }

        for (let i = 0; i < this.points.length; i++) {

            this.update(i);
            this.points[i].draw(canvas.ctx);
        };
    }
}
