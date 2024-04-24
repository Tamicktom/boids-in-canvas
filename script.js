const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth - 64;
const height = canvas.height = window.innerHeight - 64;

// Definindo o número de colunas e linhas para dividir o canvas
const numCols = 10;
const numRows = 10;
const chunkWidth = width / numCols;
const chunkHeight = height / numRows;

function assignBoidToChunk(boid) {
  boid.chunkX = Math.floor(boid.x / chunkWidth);
  boid.chunkY = Math.floor(boid.y / chunkHeight);
}

// Função utilitária para gerar números aleatórios em um intervalo
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Criando os boids e adicionando-os a um array de boid
const boids = [];
for (let i = 0; i < 50; i++) {
  const boid = new Boid(randomRange(0, width), randomRange(0, height), randomRange(-1, 1), randomRange(-1, 1));
  boids.push(boid);
}

// Função para atualizar e renderizar os boids
function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let boid of boids) {
    boid.update(boids);
    boid.draw();
  }
  requestAnimationFrame(animate);
}

animate();
