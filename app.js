const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let balloons = [];

// Clase para crear globos
class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 30 + Math.random() * 20; // Tamaño aleatorio entre 30 y 50
        this.dx = (Math.random() - 0.5) * 4; // Movimiento aleatorio en x
        this.dy = (Math.random() - 0.5) * 4; // Movimiento aleatorio en y
        this.image = new Image();
        this.image.src = "assets/balloon.png";
    }

    // Dibuja el globo en el canvas
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    // Actualiza la posición del globo
    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Rebote en los bordes
        if (this.x < 0 || this.x > canvas.width - this.size) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height - this.size) this.dy *= -1;

        this.draw();
    }
}

// Agrega un globo nuevo cada cierto tiempo
function addBalloon() {
    balloons.push(new Balloon());
}

// Elimina el globo al hacer clic y aumenta la puntuación
function popBalloon(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    balloons = balloons.filter(balloon => {
        const dist = Math.hypot(mouseX - balloon.x, mouseY - balloon.y);
        if (dist < balloon.size / 2) {
            score++;
            document.getElementById("score").innerText = "Puntuación: " + score;
            return false; // Eliminar el globo
        }
        return true;
    });
}

// Actualiza la animación del juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach(balloon => balloon.update());
    requestAnimationFrame(updateGame);
}

// Eventos
canvas.addEventListener("click", popBalloon);
setInterval(addBalloon, 5000); // Cada 2 segundos aparece un globo

updateGame(); // Iniciar el juego
