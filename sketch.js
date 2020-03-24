const flock = [];

function setup() {
    createCanvas(640, 360);
    for (let i = 0; i < 10; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);

    for (let boid of flock) {
        boid.walls();
        boid.update();
        boid.show();
    }
}