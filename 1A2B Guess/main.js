const startBtn = document.querySelector("#start_btn");
const showAnsBtn = document.querySelector("#show_answer_btn");
const restartBtn = document.querySelector("#restart_btn");
const guessHistoryList = document.querySelector("#guess_history_list");
const guessInput = document.querySelector("#guess_input");
let answer;
const guess_btn = document.querySelector("#guess_btn");
const gameMsgToast = document.querySelector("#game_msg_toast");
const toastBootstrap = new bootstrap.Toast(gameMsgToast, {
  //可以增加Options的參數
  delay: 1000,
});

const modalfade = document.querySelector("#end_game_modal");
const modelBootstrap = new bootstrap.Modal(modalfade);
const endGameBtn = document.querySelector("#end_game_btn");

// gameMsgToast.addEventListener("hide.bs.toast",()=>{
//     console.log("toast hide!")
// })


function initGame() {
  //產出answer
  answer = generateAns();
  //清空紀錄
  guessHistoryList.innerHTML = "";
}

function generateAns() {
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numArr.sort((a, b) => {
    return getRandomArbitrary(-1, 1);
  });
  return numArr.slice(0, 4).join("");
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

startBtn.addEventListener(
  "click",
  initGame
  //產出answer並清空紀錄
);


restartBtn.addEventListener(
  "click",
  initGame
  //產出answer並清空紀錄
);

showAnsBtn.addEventListener("click", () => showHint(answer));

guess_btn.addEventListener("click", () => {
  const val = guessInput.value.trim();
  console.log(val);
  console.log(answer);
  console.log(val);
  //驗證輸入合法性
  if (val === "" || isNaN(val)) {
    showHint("請輸入合法數字");
    guessInput.value = "";
    return;
  }

  //輸入的是不重複的4個數字
  if (val.length > 4 || new Set(val).size !== 4) {
    showHint("請確認輸入數字的數量!");
    guessInput.value = "";
    return;
  }

  //a,b
  let a = 0,
    b = 0;
  for (let i = 0; i < answer.length; i++) {
    if (val[i] === answer[i]) {
      a++;
    } else if (answer.includes(val[i])) {
      b++;
    }
  }

  if (a === 4) {
    //過關
    // alert("過關");
    modelBootstrap.show();
  }
  guessInput.value = "";
  appendHistory(a, b, val);
});

function showHint(msg) {
  gameMsgToast.querySelector(".toast-body").textContent = msg;
  //   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(gameMsgToast);
  toastBootstrap.show();
}

function appendHistory(a, b, input) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  const span = document.createElement("span");
  const badgeColor = a === 4 ? "bg-success" : "bg-danger";
  span.classList.add("badge", badgeColor);
  span.textContent = `${a}A${b}B`;
  li.append(span, input);
  guessHistoryList.append(li);
}

endGameBtn.addEventListener("click", () => {
  modelBootstrap.hide();
});
