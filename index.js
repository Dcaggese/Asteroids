const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.rotation = 0;
    }

    draw() {
        context.save();

        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.translate(-this.position.x, -this.position.y);

        //creates a circle to mark the center of the ship
        context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, true);
        context.fillStyle = 'red';
        context.fill();
        
        //creates the player ship
        context.beginPath();
        context.moveTo(this.position.x + 30, this.position.y);
        context.lineTo(this.position.x - 10, this.position.y - 10);
        context.lineTo(this.position.x - 10, this.position.y + 10);
        context.closePath();

        //outlines the ship
        context.strokeStyle = 'white';
        context.stroke();

        context.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const player = new Player({
    position: { x: canvas.width/2, y: canvas.height/2 },
    velocity: { x: 0, y: 0 }
});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

//animation loop
function animate() {
    window.requestAnimationFrame(animate);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update();

    player.velocity.x = 0;
    if (keys.w.pressed) player.velocity.x = 1;

    if(keys.d.pressed) player.rotation += 0.01;
    if(keys.a.pressed) player.rotation -= 0.01;
}

animate();

//player movement
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = true;
            break;
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = false;
            break;
        case 'KeyA':
            keys.a.pressed = false;
            break;
        case 'KeyD':
            keys.d.pressed = false;
            break;
    }
});