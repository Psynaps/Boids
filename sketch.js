// Boids Flocking Simulation
// @Michael Gunn

// Inspiration taken from Daniel Schiffman's coding train series:
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const flock = [];

let l1, l2, l3
let alignSlider, cohesionSlider, separationSlider;
let maxSpeed;
let reset, showPerception;
let perceptionSlider; // Allows for control over perception Raius
let numBoids;

function setup() {
    createCanvas(800, 360);
    // createCanvas(640, 500);
    // frameRate(1);
    noFill();

    l1 = createP('Separation:');
    separationSlider = createSlider(0, 2, 1, 0.1);

    l2 = createP('Alignment:');
    alignSlider = createSlider(0, 2, 1, 0.1);

    l3 = createP('Cohesion:');
    cohesionSlider = createSlider(0, 2, 1, 0.1);

    createP('Perception Radius:');
    perceptionSlider = createSlider(0, 150, 75, 5);

    reset = createButton('Reset');
    reset.mousePressed(resetBoids);

    showPerception = createCheckbox('Show Perception', true);
    showPerception.changed(changePerception);
    maxSpeed = 4;
    numBoids = 75;
    for (let i = 0; i < numBoids; i++) {
        flock.push(new Boid());
    }
}

// Reinitializes all boids while keeping the slider bar settings the same. 
function resetBoids() {
    flock.length = 0;
    for (let i = 0; i < numBoids; i++) {
        flock.push(new Boid());
    }
}

// Reinitializes all boids while keeping the slider bar settings the same. 
function changePerception() {
    showPerception = (this.checked());
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
    if (showPerception) {
        noFill(); // Use color variable 'c' as fill color
        stroke(0, 0, 255);
        strokeWeight(4);
        circle(radar.position.x, radar.position.y, perceptionSlider.value());
    }
}