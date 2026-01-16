let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

// Start game
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randindx = Math.floor(Math.random() * 4);
    let randcolor = btns[randindx];
    gameseq.push(randcolor);

    let randbtn = document.querySelector(`.${randcolor}`);
    gameflash(randbtn);
}

function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);   // ✅ FIXED
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress() {
    if (!started) return;   // safety check

    let usercolor = this.getAttribute("id");
    userflash(this);
    userseq.push(usercolor);

    checkans(userseq.length - 1);
}

// Button listeners
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
