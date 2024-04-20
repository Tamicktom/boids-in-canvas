class Boid {
  constructor(x, y, dx, dy) {
    this.x = x; // Posição x
    this.y = y; // Posição y
    this.dx = dx; // Velocidade x
    this.dy = dy; // Velocidade y
    this.radius = 2; // Raio do boid
    this.color = 'gray'; // Cor do boid
    this.maxSpeed = 2; // Velocidade máxima
    this.perceptionRadius = 100; // Raio de percepção
    this.showPerception = true;
    this.perceptionColor = 'rgba(0, 0, 0, 0.1)';
  }

  // Método para desenhar o boid no formato de um círculo
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    if (this.showPerception) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.perceptionRadius, 0, Math.PI * 2);
      ctx.strokeStyle = this.perceptionColor;
      ctx.stroke();
      ctx.closePath();
    }
  }

  // Método para desenhar o campo de percepção
  drawPerception() {
    if (this.showPerception) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.perceptionRadius, 0, Math.PI * 2);
      ctx.strokeStyle = this.perceptionColor;
      ctx.stroke();
      ctx.closePath();
    }
  }

  // Método para atualizar a posição do boid
  update(boids) {
    // Implementação das regras de comportamento dos boids
    let cohesion = { x: 0, y: 0 };
    let separation = { x: 0, y: 0 };
    let alignment = { x: 0, y: 0 };
    let perceptionCount = 0;

    for (let other of boids) {
      if (other !== this) {
        let dist = Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);

        // Coesão
        if (dist < this.perceptionRadius) {
          cohesion.x += other.x;
          cohesion.y += other.y;
          perceptionCount++;
        }

        // Separação
        if (dist < 25) {
          separation.x += this.x - other.x;
          separation.y += this.y - other.y;
        }

        // Alinhamento
        if (dist < this.perceptionRadius) {
          alignment.x += other.dx;
          alignment.y += other.dy;
        }
      }
    }

    if (perceptionCount > 0) {
      cohesion.x /= perceptionCount;
      cohesion.y /= perceptionCount;
      cohesion.x -= this.x;
      cohesion.y -= this.y;
    }

    let total = Math.sqrt(cohesion.x ** 2 + cohesion.y ** 2) + Math.sqrt(separation.x ** 2 + separation.y ** 2) + Math.sqrt(alignment.x ** 2 + alignment.y ** 2);
    cohesion.x /= total;
    cohesion.y /= total;
    separation.x /= total;
    separation.y /= total;
    alignment.x /= total;
    alignment.y /= total;

    this.dx += (cohesion.x + separation.x + alignment.x);
    this.dy += (cohesion.y + separation.y + alignment.y);

    // Limitando a velocidade
    let speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    if (speed > this.maxSpeed) {
      let factor = this.maxSpeed / speed;
      this.dx *= factor;
      this.dy *= factor;
    }

    // Verificando as bordas e ajustando a direção
    if (this.x + this.dx > width || this.x + this.dx < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > height || this.y + this.dy < 0) {
      this.dy = -this.dy;
    }

    // Atualizando posição
    this.x += this.dx;
    this.y += this.dy;
  }
}
