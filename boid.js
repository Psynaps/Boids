class Boid {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector(); //can change to add in acceleration later

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

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.setMag(0);
    }


    show() {
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}