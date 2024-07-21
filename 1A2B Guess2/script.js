//初始頁面
const gameCover = document.querySelector(".gameCover");
const startBtn = document.querySelector(".start_btn");
const contextBtn = document.querySelector(".context_btn");
const gameRuleCard = document.querySelector(".gameRule");
const closeCardBtn = document.querySelector(".close_btn");

// 初始遊戲答案
let answer;

// 遊戲頁面
const gamePage = document.querySelector(".gamePage");
const enterBtn = document.querySelector(".enter_btn");
const clearBtn = document.querySelector(".clear_btn");
const numBtn = document.querySelector(".numBtn_group");
const historyList = document.querySelector(".history_txt");
const guessNum = document.querySelector("#guess_number");
const answerToast = document.querySelector("#game_message");

//遊戲規則說明卡片開關
contextBtn.addEventListener("click", () => {
  gameRuleCard.classList.remove("d-none");
});
closeCardBtn.addEventListener("click", () => {
  gameRuleCard.classList.add("d-none");
});
enterBtn.addEventListener("click", sendAnser);

//事件監聽器
startBtn.addEventListener("click", initGame);
clearBtn.addEventListener("click", Clearinput);
numBtn.addEventListener("click", eventItme);

//遊戲初始化
function initGame() {
  //1.產出答案
  answer = generateAns();
  console.log(answer);
  //2.秀出遊戲頁面
  gamePage.classList.remove("d-none");
  gameCover.classList.add("d-none");
  //3.清空前一場紀錄
  historyList.innerHTML = "";
  BtnDisabledFalse();
}

//設定亂數答案
function generateAns() {
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numArr.sort((a, b) => {
    return getRandomArbitary(-1, 1);
  });
  return numArr.slice(0, 4).join("");
}

//產生亂數=>使陣列亂數排序
function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}

//泡泡監聽器 數字鍵
function eventItme(e) {
  if (e.target.textContent === "Restart") {
    initGame();
  } else if (e.target.textContent === "Answer") {
    showAnswerToast(answer);
  } else {
    numberInput(e.target);
  }
}
//數字按鈕
function numberInput(e) {
  if (guessNum.value.length < 4 && !isNaN(e.textContent)) {
    guessNum.value += e.textContent;
    e.disabled = true;
  }
}
//清除Input答案並開啟button
function Clearinput() {
  guessNum.value = "";
  BtnDisabledFalse();
}
//清除按鈕的disable
function BtnDisabledFalse() {
  for (let index in numBtn.children) {
    numBtn.children[index].disabled = false;
  }
}

//送出答案
function sendAnser() {
  const inputAnser = guessNum.value.trim();
  if(inputAnser.length<4) return;
  //確認A和B的數量
  let a = 0,
    b = 0;
  for (let i = 0; i < answer.length; i++) {
    if (inputAnser[i] === answer[i]) {
      a++;
    } else if (answer.includes(inputAnser[i])) {
      b++;
    }
  }

  if (a === 4) {
    showAnswerToast(`恭喜答對\n答案就是${inputAnser}`);
  }
  appendHistory(a, b,` ${inputAnser}`);
  Clearinput();
}

//呼叫吐司
function showAnswerToast(msg) {
  answerToast.querySelector(".toast-body").textContent = msg;
  const myToast = bootstrap.Toast.getOrCreateInstance(answerToast);
  myToast.show();
}

//生成遊戲履歷
function appendHistory(a, b, input) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const badgeColor = a === 4 ? "bg-success" : "bg-danger";
  span.classList.add("badge", badgeColor);
  span.textContent = `${a}A${b}B `;
  div.append(span, input);
  historyList.append(div);
}
