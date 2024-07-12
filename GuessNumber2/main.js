/*遊戲首頁*/

/*1.輸入玩家名稱*/
const name_btn = document.querySelector(".start_btn");
const name_input = document.querySelector("#one-player");
const name_result = document.querySelector(".name_result");
const player_name_group = document.querySelector(".player_name_group");
const game_mode = document.querySelector(".game_mode");

name_btn.addEventListener("click", playerNameInput);
//對輸入框增加Enter事件
name_input.addEventListener("keyup", EnterPress);

function EnterPress(e) {
  if (e.key === "Enter") {
    name_btn.click();
  }
}

function playerNameInput() {
  if (name_input.value === "") {
    name_result.textContent = "遊戲名稱不得為空!";
    return;
  } else if (name_input.value.length >= 7) {
    name_result.textContent = "遊戲名稱不得超過6個字!";
    return;
  } else {
    player_name_group.style.display = "none";
    game_mode.style.display = "block";
    return;
  }
}

/*2.選擇遊戲模式*/

const easy_btn = document.querySelector(".easy_game");
const normal_btn = document.querySelector(".nomarl_game");
const difficult_btn = document.querySelector(".difficult_game");
const game_start = document.querySelector(".game_start_page");
const game_first_page = document.querySelector(".game_first_page");
const mode_dis = document.querySelector(".mode_discription");

const remaind_text = document.querySelector(".remaind");
const timer_text = document.querySelector(".timer");
const btn_group = document.querySelector(".btn-group");

//計時器宣告

easy_btn.addEventListener("click", easy_game);
normal_btn.addEventListener("click", normal_game);
difficult_btn.addEventListener("click", difficult_game);

let isTimerGame;
let isGuessCountGame;
let gameTime;

easy_btn.onmouseover = function () {
  mode_dis.textContent =
    "簡單模式：不限時、不限次數、可看解答、猜中即贏得遊戲!!";
};
normal_btn.onmouseover = function () {
  mode_dis.textContent = "普通模式：有限時、不限次數、無解答、猜中即贏得遊戲!!";
};
difficult_btn.onmouseover = function () {
  mode_dis.textContent =
    "困難模式：有限時、有限次數、無解答、且猜錯1次再扣3秒!!";
};

game_mode.onmouseout = function () {
  mode_dis.textContent = "";
};

function easy_game() {
  isTimerGame = false;
  isGuessCountGame = false;
  answer_btn.style.display = "block";
  remaind_text.style.display = "none";
  timer_text.style.display = "none";
  btn_group.style.marginTop = "-80px";
  game();
}

function normal_game() {
  gameTime = 60;
  isTimerGame = true;
  isGuessCountGame = false;
  answer_btn.style.display = "none";
  remaind_text.style.display = "none";
  timer_text.style.display = "block";
  btn_group.style.marginTop = "-20px";
  timer_count.textContent = `${gameTime} sec`;
  update(gameTime);
  game();
  setTimer();
}

function difficult_game() {
  gameTime = 30;
  isTimerGame = true;
  isGuessCountGame = true;
  answer_btn.style.display = "none";
  remaind_text.style.display = "block";
  timer_text.style.display = "block";
  btn_group.style.marginTop = "-10px";
  update(gameTime);
  game();
  setTimer();
}

//遊戲開始頁面
const main_taxt = document.querySelector(".main_taxt");
const answer_tip = document.querySelector(".answer_tip");
const player_answer = document.querySelector(".player_answer");
const enter_btn = document.querySelector(".enter_btn");
const answer_btn = document.querySelector(".answer_btn");
const giveup_btn = document.querySelector(".giveup_btn");
const back_btn = document.querySelector(".back_btn");
const close_btn = document.querySelector(".close_btn");

const game_state_card = document.querySelector(".game_state_note");
const card = document.querySelector(".card");
const correct_answer = document.querySelector(".correct_answer");
const player_name = document.querySelector(".player_name_put");
const again_btn = document.querySelector(".again_btn");
const remaind_count = document.querySelector(".remaind-count");

back_btn.addEventListener("click", backModePage);
giveup_btn.addEventListener("click", giveup);
again_btn.addEventListener("click", backModePage);
answer_btn.addEventListener("click", checkanswer);
close_btn.addEventListener("click", function () {
  game_state_card.style.display = "none";
  buttonSwitch(0);
});
enter_btn.addEventListener("click", inputDefault);
player_answer.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    enter_btn.click();
  }
});

let minNum;
let maxNum;
let answer;
let guess_count;
let wrongGuess_punish = false;
let array = ["★★★★", "★★★☆", "★★☆☆", "★☆☆☆", "☆☆☆☆"];

function game() {
  answerNumber();
  buttonSwitch(0);
  player_name.textContent = name_input.value;
  game_first_page.style.display = "none";
  game_start.style.display = "block";
  minNum = 1;
  maxNum = 100;
  answer_tip.innerText = "";
  main_taxt.textContent = `請輸入${minNum}~${maxNum}的數字`;
  player_answer.value = "";
  guess_count = 0;
  remaind_count.textContent = array[guess_count];
}

function answerNumber() {
  return (answer = Math.round(Math.random() * 100));
}

function backModePage() {
  clearInterval(timer);
  isTimerGame = false;
  game_state_card.style.display = "none";
  game_start.style.display = "none";
  game_first_page.style.display = "flex";
  player_name_group.style.display = "none";
  game_mode.style.display = "block";
}

function giveup() {
  clearInterval(timer);
  isTimerGame = false;
  showCard();
  card.textContent = "玩家放棄遊戲!!";
}

function buttonSwitch(s) {
  back_btn.disabled = s;
  giveup_btn.disabled = s;
  enter_btn.disabled = s;
  player_answer.disabled = s;
}

function checkanswer() {
  game_state_card.style.display = "flex";
  again_btn.style.display = "none";
  close_btn.style.display = "block";
  card.textContent = "";
  correct_answer.textContent = answer;
  buttonSwitch(1);
}

function inputDefault() {
  const input_num = Number.parseInt(player_answer.value);
  //不得為空值
  if (player_answer.value === "") {
    answer_tip.innerText = "尚未輸入任何數字 (´･ω･`)";
    return;
  }
  //確認是否為整數
  else if (isNaN(input_num)) {
    answer_tip.innerText = "請輸入數字  ∑(￣□￣;)";
    player_answer.value = "";
    return;
  } else if (player_answer.value.includes(".")) {
    answer_tip.innerText = "請輸入整數  ∑(￣□￣;)";
    return;
  }
  //範圍外數字
  else if (input_num < minNum || input_num > maxNum) {
    answer_tip.innerText = "請張開眼睛看數字範圍!!(● д ●)";
    player_answer.value = "";
    return;
  } else {
    answer_tip.innerText = "";
    CorrectInput();
  }
}

function CorrectInput() {
  if (player_answer.value > answer) {
    maxNum = player_answer.value;
    main_taxt.textContent = `請輸入${minNum}~${maxNum}的數字`;
    answer_tip.innerText = `答錯了~ 範圍縮小，請重新輸入!`;
    player_answer.value = "";
    guess_count++;
    wrongGuess_punish = true;
    guessCount();
  } else if (player_answer.value < answer) {
    minNum = player_answer.value;
    main_taxt.textContent = `請輸入${minNum}~${maxNum}的數字`;
    answer_tip.innerText = `答錯了~ 範圍縮小，請重新輸入!`;
    player_answer.value = "";
    guess_count++;
    wrongGuess_punish = true;
    guessCount();
  } else {
    showCard();
    card.textContent = "恭喜答對了!!!";
    isTimerGame = false;
  }
}

function showCard() {
  game_state_card.style.display = "flex";
  again_btn.style.display = "block";
  close_btn.style.display = "none";
  correct_answer.textContent = answer;
  buttonSwitch(1);
}

//生命值
function guessCount() {
  if (guess_count < array.length && isGuessCountGame === true) {
    remaind_count.textContent = array[guess_count];
  }
  if (guess_count >= 4 && isGuessCountGame === true) {
    showCard();
    card.textContent = "次數耗盡!!!\n尚未猜出正確數字";
    isTimerGame = false;
  }
}

//倒數計時

let timer;

function setTimer() {
  let remainSeconds = gameTime;
  timer = setInterval(() => {
    if (remainSeconds > 0 && isTimerGame === true) {
      remainSeconds -= 1;
      if (wrongGuess_punish === true && isGuessCountGame === true) {
        remainSeconds -= 2;
        wrongGuess_punish = false;
      }
      update(remainSeconds);
    } else if (remainSeconds > 0 && isTimerGame === false) {
      clearInterval(timer);
      remainSeconds = gameTime;
      update(remainSeconds);
    } else {
      showCard();
      card.textContent = "時間到了!!!\n尚未猜出正確數字";
      clearInterval(timer);
      remainSeconds = 0;
    }
  }, 1000);
}

//更新進度條函式
function update(seconds) {
  barRenderer(seconds);
  textRenderer(seconds);
}

const timer_count = document.querySelector(".timer_count");
const bar = document.querySelector(".bar");

//更新bar進度條
function barRenderer(seconds) {
  let percent = (seconds / gameTime) * 100;
  bar.style.width = `${percent}%`;
}

//更新text時間
function textRenderer(seconds) {
  const formattedsec = seconds.toString().padStart(2, "0");
  timer_count.textContent = `${formattedsec} sec`;
}
