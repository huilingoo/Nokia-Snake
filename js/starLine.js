window.onload = function () {

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
        this.color = getRandomColor();
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
                    ctx.strokeStyle = getRandomColor();
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