class Particle {

    constructor(pos, velocity, hand) {
        this.pos = pos;
        this.velocity = velocity;
        this.hand = hand;
        this.mass = 1.0;
    }

    draw(ctx) {

        const r = Settings.radius;

        let image = Canvas.ASSETS[this.hand];

        if (image) {
            ctx.drawImage(image, this.pos[0] - r / 2, this.pos[1] - r / 2, r * 2, r * 2);
        }
    }
}
