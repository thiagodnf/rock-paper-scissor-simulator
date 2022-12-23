class Collision {

    static betweenTwoCircles(p1, p2, r1, r2) {

        let radius = r1 + r2;

        let n = p1.subtract(p2);

        if (n.norm() < radius) {
            return true;
        }

        return false;
    }

    static verifyCollision(c1, c2) {

        if (Collision.betweenTwoCircles(c1.pos, c2.pos, Settings.radius, Settings.radius)) {

            Collision.findCollisionsWithOtherPoints(c1, c2);

            EventEmitter.emit("collide", c1, c2);
        }
    }

    static findCollisionsWithOtherPoints(c1, c2) {

        // http://www.vobarian.com/collisions/2dcollisions2.pdf

        let p1 = c1.pos;
        let p2 = c2.pos;

        let radius = Settings.radius + Settings.radius;

        let n = p1.subtract(p2);

        // Move to start of collision

        let dr = (radius - n.norm()) / 2;

        let un = n.unitVector();

        p1 = p1.sum(un.scale(dr));
        p2 = p2.sum(un.scale(-dr));

        c1.pos = p1;
        c2.pos = p2;

        // Find normal and tangential components of v1/v2

        // Step 3: Next we need the unit tangent vector "ut"

        let ut = [-un[1], un[0]];


        let v1 = c1.velocity;
        let v2 = c2.velocity;

        // // Step 4: Create the initial (before the collision) velocity vectors, "v1" and "v2".


        // // Step 5: So we need to resolve the velocity vectors, "v1" and "v2", into normal and tangential components.

        let v1n = un.dot(v1);
        let v1t = ut.dot(v1);
        let v2n = un.dot(v2);
        let v2t = ut.dot(v2);

        // // Step 6: Find the new tangential velocities (after the collision). This is the simplest step of all. The tangential components of the velocity do not change after the collision because there is no

        let m1 = c1.mass;
        let m2 = c2.mass;


        let v1nNew = (v1n * (m1 - m2) + 2.0 * m2 * v2n) / (m1 + m2);
        let v2nNew = (v2n * (m2 - m1) + 2.0 * m1 * v1n) / (m1 + m2);


        // Calculate new v1/v2 in normal direction

        v1 = un.scale(v1nNew);
        v2 = ut.scale(v1t);

        c1.velocity = v1.sum(v2);

        v1 = un.scale(v2nNew);
        v2 = ut.scale(v2t);

        c2.velocity = v1.sum(v2);
    }

    static findAllCollisionsWithWalls(points, i, width, height) {

        let c = points[i];

        let radius = Settings.radius;
        let p1 = c.pos;
        let v1 = c.velocity;

        let left = 0;
        let top = 0;
        let right = width;
        let bottom = height;

        if (p1[0] < left + radius) {
            p1[0] = left + radius;
            v1[0] = -v1[0];
        }
        if (p1[1] < top + radius) {
            p1[1] = top + radius;
            v1[1] = -v1[1];
        }
        if (p1[0] > right - radius) {
            p1[0] = right - radius;
            v1[0] = -v1[0];
        }
        if (p1[1] > bottom - radius) {
            p1[1] = bottom - radius;
            v1[1] = -v1[1];
        }

        c.x = p1[0];
        c.y = p1[1];

        c.velocity = v1;
    }
}
