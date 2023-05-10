let score = 0;
let time = 30;
let speed = 1;
let intervalId;
let timeoutId;
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");

function createBalloon(size = "100px", isBig = false) {
    const balloon = document.createElement("img");
    balloon.src = "https://img0.baidu.com/it/u=2360685806,3739090095&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
    balloon.className = "balloon";
    balloon.style.width = size;
    balloon.style.left = `${Math.random() * (window.innerWidth - parseInt(size))}px`;
    balloon.style.top = `${Math.random() * (window.innerHeight - parseInt(size))}px`;

    const clickHandler = () => {
        balloon.style.transform = "scale(0.95)";
        setTimeout(() => {
            balloon.style.transform = "scale(1)";
        }, 100);

        score++;
        scoreElement.textContent = "分数: " + score;

        if (!isBig) {
            balloon.remove();
            if (time > 0) {
                createBalloon();
            }
        }
    };

    balloon.addEventListener("click", clickHandler);
    document.body.appendChild(balloon);
    return balloon;
}

function startGame() {
    // 清除原有的气球
    document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());

    score = 0;
    time = 30;
    speed = 1;
    scoreElement.textContent = "分数: " + score;
    timerElement.textContent = "时间: " + time;
    restartButton.style.display = "none";

    createBalloon();

    intervalId = setInterval(() => {
        time--;
        timerElement.textContent = "时间: " + time;

        if (time % 5 === 0) {
            speed *= 2;
        }

        if (time === 5) {
            document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());
            createBalloon("200px", true);
        }

        if (time === 0) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            restartButton.style.display = "block";
            // 清除所有气球
            document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());
        }
    }, 1000);
}

restartButton.addEventListener("click", startGame);
startGame();
