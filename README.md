## Boids
This is my implementation of Craig Reynolds flocking simulation, Boids, in JavaScript.
Boids is a schema of 3 rules that when combined create emergent complex flocking behavior. The rules are:

- Separation: Steer to avoid crowding nearby boids
- Alignment: Steer towards the average heading of nearby boids
- Cohesion: Steer to move toward the average position of nearby boids

Additionally the boids have simple object avoidance in relation to the cursor, causing them to attempt to avoid getting too close to the mouse whenever it is pressed. 

Separation, alignment, cohesion, and perception radius are all attached to sliders to allow users to play with the magnitude of each rules effect. Thei displayed  perception radius for a single boid can be disabled by unchecking "Show perception".  

Author: Michael Gunn
Credit to Craig Reynolds original paper:
https://www.red3d.com/cwr/boids/
