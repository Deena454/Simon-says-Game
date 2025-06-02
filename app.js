let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let highScore = localStorage.getItem("highScore") || 0;
document.querySelector(
  "#highScoreDisplay"
).innerText = `Highest Score: ${highScore}`;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("started");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];

  level++;
  h2.innerText = `Level ${level}`;

  let randIndx = Math.floor(Math.random() * 3);
  let randColor = btns[randIndx];
  let randBtns = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtns);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    // highestScore();
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    document.querySelector(
      "#highScoreDisplay"
    ).innerText = `Highest Score: ${highScore}`;
  }
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

const cursor = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
});

// function highestScore(){
//   console.log(`highest score is ${level}`);
// }
