This is my implementation of Craig Reynolds flocking simulation, Boids, in JavaScript.
Boids is a schema of 3 rules that when combined create emergent complex flocking behavior. The rules are:
Separation: Steer to avoid crowding nearby boids
Alignment: Steer towards the average heading of nearby boids
Cohesion: Steer to move toward the average position of nearby boids

Author: Michael Gunn
Credit to Craig Reynolds original paper:
https://www.red3d.com/cwr/boids/
