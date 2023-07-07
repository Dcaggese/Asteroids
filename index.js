const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        //creates a circle to mark the center of the ship
        context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, true);
        context.fillStyle = 'red';
        context.fill();
        
        //creates the player ship
        context.moveTo(this.position.x + 30, this.position.y);
        context.lineTo(this.position.x - 10, this.position.y - 10);
        context.lineTo(this.position.x - 10, this.position.y + 10);
        context.closePath();
        //outlines the ship
        context.strokeStyle = 'white';
        context.stroke();
    }
}

const player = new Player({
    position: { x: canvas.width/2, y: canvas.height/2 },
    velocity: { x: 0, y: 0 }
});

//draw player on the canvas
player.draw();