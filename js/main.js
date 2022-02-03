var isKey = 0
var n = Math.ceil(Math.random() * 25) //生成1到50之间的随机数 top
var m = Math.ceil(Math.random() * 49)  // left
var foods = {
  x: m * 20,
  y: n * 20
}
window.onload = function () {
  //存储蛇
  var snake = [{
    x: 200,
    y: 200
  }, {
    x: 200,
    y: 220
  }]
  var snakeDiv = document.getElementById('snake')
  var bgDiv = document.getElementById('bg')
  isKey = Math.ceil(Math.random() * 4) //生成1到4的随机数
  setInterval(function () {
    if (snake[0].x == 0 || snake[0].y == 0 || snake[0].x == 1000 || snake[0].y == 520) {  //上边和左边
      alert('game over!')
      snake = [{
        x: 200,
        y: 200
      }, {
        x: 200,
        y: 220
      }]
    } else {
      time(isKey, snake, snakeDiv, bgDiv)
    }
  }, 500)
  // 画蛇
  drawSnake(snakeDiv, snake)
  //移动
  document.onkeydown = function (e) {
    clearInterval(time)
    isKey = e.keyCode == 38 ? 1 : (e.keyCode == 40 ? 2 : (e.keyCode == 39 ? 3 : (e.keyCode == 37 ? 4 : 0)))
    if (snake[0].x == 0 || snake[0].y == 0 || snake[0].x == 1000 || snake[0].y == 520) {  //上边和左边
      alert('game over!')
      snake = [{
        x: 200,
        y: 200
      }, {
        x: 200,
        y: 220
      }]
    } else {
      time(isKey, snake, snakeDiv, bgDiv)
    }
    //碰到墙则停止
    if (snake[0].x == 0 || snake[0].y == 0 || snake[0].x == 1000 || snake[0].y == 520) {  //上边和左边
      alert('game over!')
      snake = [{
        x: 200,
        y: 200
      }, {
        x: 200,
        y: 220
      }]
      clearInterval(time)
    }
  }
  if (!document.getElementById('food')) {
    food(m, n, bgDiv)
  }

  drawBg();
}
//上移
function up(snake) {
  isKey = 1
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = snake[i] //将前面的位置赋给后面
  }
  snake[0] = {
    x: snake[0].x,
    y: snake[0].y - 20,
  }
  if (snake[0].y < 0) {
    snake[0] = {
      x: snake[0].x,
      y: 520,
    }
  }
}
//下移
function down(snake) {
  isKey = 2
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = snake[i] //将前面的位置赋给后面
  }
  snake[0] = {
    x: snake[0].x,
    y: snake[0].y + 20,
  }
  if (snake[0].y > 520) {
    snake[0] = {
      x: snake[0].x,
      y: 0,
    }
  }
}
//左移
function left(snake) {
  isKey = 4
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = snake[i] //将前面的位置赋给后面
  }
  snake[0] = {
    x: snake[0].x - 20,
    y: snake[0].y
  }
  if (snake[0].x < 0) {
    snake[0] = {
      x: 1000,
      y: snake[0].y
    }
  }
}
//右移
function right(snake) {
  isKey = 3
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = snake[i] //将前面的位置赋给后面
  }
  snake[0] = {
    x: snake[0].x + 20,
    y: snake[0].y
  }
  if (snake[0].x > 1000) {
    snake[0] = {
      x: 0,
      y: snake[0].y
    }
  }
}
// 清空div
function clearDiv(div) {
  div.innerHTML = ''
}
// 画蛇 在div里画arr
function drawSnake(div, arr) {
  clearDiv(div)
  for (let i = 0; i < arr.length; i++) {
    var snakeCon = document.createElement('div')
    snakeCon.className = 's'
    snakeCon.style.top = arr[i].y + 'px'
    snakeCon.style.left = arr[i].x + 'px'
    div.appendChild(snakeCon)
  }
}
// 食物随机
function food(n, m, div) {
  var foodDiv = document.createElement('div')
  foodDiv.className = 'food'
  foodDiv.id = 'food'
  foodDiv.style.left = n * 20 + 'px'
  foodDiv.style.top = m * 20 + 'px'
  // foodDiv.style.backgroundColor = foods.color
  div.appendChild(foodDiv)
}
function time(dir, snake, div, bgDiv) {
  switch (dir) {
    case 1: up(snake); drawSnake(div, snake); break;
    case 2: down(snake); drawSnake(div, snake); break;
    case 3: right(snake); drawSnake(div, snake); break;
    case 4: left(snake); drawSnake(div, snake); break;
    default: break;
  }

  //检测界面是否有食物没有就随机出现
  if (!document.getElementById('food')) {
    var n = Math.ceil(Math.random() * 25) //生成1到50之间的随机数 top
    var m = Math.ceil(Math.random() * 49)  // left
    food(m, n, bgDiv)
    foods = {
      x: m * 20,
      y: n * 20
    }
  } else {
    var foodDiv = document.getElementsByClassName('food')[0]
    if (snake[0].x == foods.x && snake[0].y == foods.y) {
      div.parentNode.removeChild(foodDiv)
      addSnake(snake)
    }
  }
}
// 增加一节蛇身
function addSnake(snake) {
  switch (isKey) {
    case 1: snake.unshift({ x: foods.x, y: foods.y - 20 }); break;
    case 2: snake.unshift({ x: foods.x, y: foods.y + 20 }); break;
    case 3: snake.unshift({ x: foods.x + 20, y: foods.y }); break;
    case 4: snake.unshift({ x: foods.x - 20, y: foods.y }); break;
    default: break;
  }
}

//碰墙die  判断第一个元素
function eat() {

}

// 画背景
function drawBg () {
  const canvas = document.getElementById('starLine')
  const ctx = canvas.getContext('2d')

  // 获取当前视图的宽度和高度
  let aw = document.documentElement.clientWidth || document.body.clientWidth
  let ah = document.documentElement.clientHeight || document.body.clientHeight
  // 赋值给canvas
  canvas.width = aw
  canvas.height = ah


  var stars = [];

  /**
   * 小星星（随机位置、随机移动角度）
   * */

  function Star() {
      this.x = getRandom(0, aw)
      this.y = getRandom(0, ah)
      this.r = 3;
      this.speed = getRandom(0.4, 0.8);
      this.color = 'rgba(255, 255, 255, 0.2)';
      this.dirUp = getRandomTwo(1, -1); // 1 朝下
      this.dirL = getRandomTwo(1, -1);; // 1 朝右
      this.angle = getRandom(0, 180);
  }

  Star.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
  }

  Star.prototype.update = function () {
      // 垂直方向
      if (this.dirUp === 1) {
          this.y = this.y + this.speed * Math.sin(Math.PI / 180 * this.angle);
          if (this.y >= ah) {
              this.dirUp = -1
          }

      } else if (this.dirUp === -1) {
          this.y = this.y - this.speed * Math.sin(Math.PI / 180 * this.angle);
          if (this.y <= 0) {
              this.dirUp = 1
          }
      }

      // 水平方向
      if (this.dirL === 1) {
          this.x = this.x + Math.abs(this.speed * Math.cos(Math.PI / 180 * this.angle));

          if (this.x >= aw) {
              this.dirL = -1
          }
      } else {
          this.x = this.x - Math.abs(this.speed * Math.cos(Math.PI / 180 * this.angle));

          if (this.x <= 0) {
              this.dirL = 1
          }
      }
  }

  function init() {
      for (let i = 0; i < 200; i++) {
          stars.push(new Star());
      }
  }

  init();

  function animate() {
      ctx.clearRect(0, 0, aw, ah);
      for (let i = 0; i < stars.length; i++) {
          stars[i].draw();
          stars[i].update();
      }
      // 比较距离
      for (let i = 0; i < stars.length; i++) {
          for (let j = 0; j < stars.length; j++) {
              if (Math.abs(stars[i].x - stars[j].x) < 70 && Math.abs(stars[i].y - stars[j].y) < 70 && i !== j) {
                  ctx.beginPath();
                  ctx.moveTo(stars[i].x, stars[i].y);
                  ctx.lineTo(stars[j].x, stars[j].y);
                  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                  ctx.stroke();
              }

          }
      }

      window.requestAnimationFrame(animate)
  }

  window.requestAnimationFrame(animate)
}


// 获取随机数
function getRandom(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}


//  1和-1 随机
function getRandomTwo(n, m) {
  return Math.random() < 0.5 ? n : m;
}

// 获取随机颜色
var getRandomColor = function () {
  return '#' + (Math.random() * 0xffffff << 0).toString(16);
}