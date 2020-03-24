const flock = [];

let l1, l2, l3
let alignSlider, cohesionSlider, separationSlider;
let maxSpeed;
let reset;
let perceptionSlider; //add in feature later to highlight the perception radius of a single boid (first in the flock) to see how it perceives

function setup() {
    createCanvas(640, 360);
    alignScale = 1;
    cohesionScale = 1;
    separationScale = 1;

    l1 = createP('Separation:');
    separationSlider = createSlider(0, 2, 1, 0.1);

    l2 = createP('Alignment:');
    alignSlider = createSlider(0, 2, 1, 0.1);

    l3 = createP('Cohesion:');
    cohesionSlider = createSlider(0, 2, 1, 0.1);

    createP('Perception Radius:');
    perceptionSlider = createSlider(0, 150, 50, 5);

    reset = createButton('Reset');
    reset.mousePressed(resetBoids);
    maxSpeed = 4;
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

// Reinitializes all boids while keeping the slider bar settings the same. 
function resetBoids() {
    flock.length = 0;
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);
    for (let boid of flock) {
        // for (let i = 0; i <flock.length; i++) {
        boid.walls();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
    let radar = flock[0];
    // let c = color(255, 50, 0); // Define color 'c'
    noFill(); // Use color variable 'c' as fill color
    stroke(0, 0, 255);
    strokeWeight(4);
    circle(radar.position.x, radar.position.y, perceptionSlider.value());

    // flock[0].Boid.position.x
    // circle(flock[0].Boid.position.x, flock[0].Boid.position.y, perceptionSlider.value());
}