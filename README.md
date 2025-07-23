<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Крестики-Нолики Нео</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <canvas id="backgroundCanvas"></canvas>

  <h1>Крестики-Нолики</h1>

  <div id="menu">
    <h2>Выбор режима</h2>
    <label>
      <input type="radio" name="mode" value="player" checked /> Игрок vs Игрок
    </label>
    <br/>
    <label>
      <input type="radio" name="mode" value="bot" /> Игрок vs Бот
    </label>
    <br/><br/>
    <label for="difficulty">Сложность:</label>
    <select id="difficulty">
      <option value="easy">Лёгко</option>
      <option value="normal">Нормально</option>
      <option value="hard">Сложно</option>
      <option value="impossible">Невозможно</option>
    </select>
    <br/><br/>
    <button id="startBtn" class="neo-button">▶ Начать игру</button>
  </div>

  <div id="gameContainer">
    <div id="game">
      <div class="cell" data-index="0"></div>
      <div class="cell" data-index="1"></div>
      <div class="cell" data-index="2"></div>
      <div class="cell" data-index="3"></div>
      <div class="cell" data-index="4"></div>
      <div class="cell" data-index="5"></div>
      <div class="cell" data-index="6"></div>
      <div class="cell" data-index="7"></div>
      <div class="cell" data-index="8"></div>
    </div>

    <div id="status"></div>

    <div class="button-row">
      <button id="resetBtn" class="neo-button">🔄 Сброс</button>
      <button id="backBtn" class="neo-button">← Назад</button>
    </div>
  </div>

  <script src="script.js"></script>

  <!-- Анимация фона -->
  <script>
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const lines = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        speed: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let l of lines) {
        const dx = l.x2 - l.x1;
        const dy = l.y2 - l.y1;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 100) {
          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          ctx.lineTo(l.x2, l.y2);
          ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / 400})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        l.x1 += (Math.random() - 0.5) * l.speed;
        l.y1 += (Math.random() - 0.5) * l.speed;
        l.x2 += (Math.random() - 0.5) * l.speed;
        l.y2 += (Math.random() - 0.5) * l.speed;

        // Границы
        if (l.x1 < 0 || l.x1 > width) l.x1 = Math.random() * width;
        if (l.x2 < 0 || l.x2 > width) l.x2 = Math.random() * width;
        if (l.y1 < 0 || l.y1 > height) l.y1 = Math.random() * height;
        if (l.y2 < 0 || l.y2 > height) l.y2 = Math.random() * height;
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    animate();
  </script>
</body>
</html>
