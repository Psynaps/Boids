class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, maxSpeed));
        this.acceleration = createVector(); //can change to add in acceleration later
        this.maxForce = 1; //provides an upper bound to the change of direction a boid can make in an instant. This creates more realistic movement

    }

    // Cause the boid to appear on the other side of the screen when it goes off one side
    walls() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    flock(boids) {
        let allignment = this.allign(boids);
        allignment.mult(allignScale); //allow for slider control of grouping factors
        this.acceleration.add(allignment);
    }

    allign(boids) {
        let steer = createVector();
        let total = 0;
        for (let boid of boids) { //JS for each
            let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y); //d = dist(this, boid)
            if (boid != this && d < perceptionRadius) {
                steer.add(boid.velocity);
                total++;
            }
        }
        if (total > 0) { //prevents divide by 0
            steer.div(total);
            steer.setMag(maxSpeed);
            steer.sub(this.velocity);
            steer.setMag(this.maxForce); //Limit the ammount of force imparted by allignment affect
        }
        return steer;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed); // set speed to max(speed, maxSpeed)
        this.acceleration.setMag(0); //allows for acceleration to be used as the delta v from the forces, but then is reset for the next tick
    }


    show() {
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}