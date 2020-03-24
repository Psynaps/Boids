const flock = [];

let allignScale, cohesionScale, separationScale;
let maxSpeed;
let perceptionRadius; //add in feature later to highlight the perception radius of a single boid (first in the flock) to see how it perceives

function setup() {
    createCanvas(640, 360);
    allignScale = cohesionScale = separationScale = 1;
    maxSpeed = 4;
    perceptionRadius = 50;
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);

    for (let boid of flock) {
        boid.walls();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}