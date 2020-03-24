const flock = [];

let alignScale, cohesionScale, separationScale;
let alignSlider, cohesionSlider, separationSlider;
let maxSpeed;
let perceptionRadius; //add in feature later to highlight the perception radius of a single boid (first in the flock) to see how it perceives

function setup() {
    createCanvas(640, 360);
    alignScale = 1;
    cohesionScale = 1;
    separationScale = 1;

    createP('Alignment:');
    alignSlider = createSlider(0, 2, 1, 0.1);
    // alignSlider.position(width + 10, 10);
    createP('Cohesion:');
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    // cohesionSlider.position(width + 10, 40);
    createP('Separation:');
    separationSlider = createSlider(0, 2, 1, 0.1);
    // separationSlider.position(width + 10, 70);

    maxSpeed = 4;
    perceptionRadius = 50;
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);
    stroke(100);

    for (let boid of flock) {
        boid.walls();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}