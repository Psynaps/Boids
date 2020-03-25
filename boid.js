// Boids Flocking Simulation
// @Michael Gunn

// Inspiration taken from Daniel Schiffman's coding train series:
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, maxSpeed));
        this.acceleration = createVector(); //can change to add in acceleration later
        this.maxForce = 0.5; //provides an upper bound to the change of direction a boid can make in an instant. This creates more realistic movement


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
        let allignment = this.align(boids);
        let separation = this.separate(boids);
        let cohesion = this.cohere(boids);
        let avoidance = this.avoid();

        allignment.mult(alignSlider.value()); //allow for slider control of grouping factors
        separation.mult(separationSlider.value()); //allow for slider control of grouping factors
        cohesion.mult(cohesionSlider.value()); //allow for slider control of grouping factors

        // avoidance.mult(2); //double the effect of avoidance relative to other forces to make it really want to avoid the cursor

        this.acceleration.add(allignment);
        this.acceleration.add(separation);
        this.acceleration.add(cohesion);

        if (mouseIsPressed) {
            this.acceleration.add(avoidance);
        }
    }

    align(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) { //JS for each
            //let d = dist(this.position.x, this.position.y, other.position.x, other.position.y); //d = dist(this, boid)
            let d = sqrt(pow(min(abs(this.position.x - other.position.x), width - abs(this.position.x - other.position.x)), 2) + pow(min(abs(this.position.y - other.position.y), height - abs(this.position.y - other.position.y)), 2));
            //thanks to a youtube comment for the math to allow perception to wrap around the edges
            if (other != this && d < perceptionSlider.value()) {
                steer.add(other.velocity);
                total++;
            }
        }
        if (total > 0) { //prevents divide by 0
            steer.div(total);
            steer.setMag(maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce); //Limit the ammount of force imparted by allignment effect
        }
        return steer;
    }

    separate(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            // let d = sqrt(pow(min(abs(this.position.x - other.position.x), width - abs(this.position.x - other.position.x)), 2) + pow(min(abs(this.position.y - other.position.y), height - abs(this.position.y - other.position.y)), 2));
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y); //d = dist(this, boid)
            if (other != this && d < perceptionSlider.value()) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d); // Separation force is inversely proportional to the distance to other boids, stronger than urge to cohere
                steer.add(diff);
                total++;
            }
        }
        if (total > 0) { //prevents divide by 0
            steer.div(total);
            steer.setMag(maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce); //Limit the ammount of force imparted by separation effect
        }
        return steer;
    }

    cohere(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            let d = sqrt(pow(min(abs(this.position.x - other.position.x), width - abs(this.position.x - other.position.x)), 2) + pow(min(abs(this.position.y - other.position.y), height - abs(this.position.y - other.position.y)), 2));
            // let d = dist(this.position.x, this.position.y, other.position.x, other.position.y); //d = dist(this, boid)
            if (other != this && d < perceptionSlider.value() * 2) {
                steer.add(other.position);
                total++;
            }
        }
        if (total > 0) { //prevents divide by 0
            steer.div(total);
            steer.sub(this.position);
            steer.setMag(maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce); //Limit the ammount of force imparted by cohesion effect
        }
        return steer;
    }

    avoid() {
        let steer = createVector();
        let m = createVector(mouseX, mouseY);
        steer = p5.Vector.sub(this.position, m);
        if (steer.mag() < perceptionSlider.value() * 2 / 3) { // perception radius for mouse avoidance is less than normal perception radius or else they  
            steer.setMag(maxSpeed * 2); // all head towards the cursor then are repelled indefinitely
            steer.limit(this.maxForce * 3); //Limit the ammount of force imparted by avoidance
        } else {
            steer.setMag(0); //only avoid the object if it is within your perception radius
        }
        return steer;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed); // set speed to max(speed, maxSpeed)
        this.acceleration.setMag(0); //allows for acceleration to be used as the delta v from the forces, but then is reset for the next tick
    }


    //modify show to draw each boid their specified size, that way boid num 0 can just be drawn 
    show() {
        strokeWeight(2);
        stroke(255);
        // point(this.position.x, this.position.y);
        let len = 4;
        let dir = this.velocity.heading()
        console.log(dir);
        console.log('cos: ' + cos(dir));

        console.log(this.position.x + ', ' + this.position.y);
        triangle(this.position.x + len * cos(dir), this.position.y + len * sin(dir), this.position.x + len * cos(dir + radians(140)), this.position.y + len * sin(dir + radians(140)), this.position.x + len * cos(dir - radians(140)), this.position.y + len * sin(dir - radians(140)));
        stroke(50);
        fill(50);
    }
}