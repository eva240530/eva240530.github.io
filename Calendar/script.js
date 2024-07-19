//月曆物件
const container = document.querySelector(".container");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const chooseMon = document.querySelector(".chooseMonth");
const chooseYear = document.querySelector(".chooseYear");
const calendarDays = document.querySelector(".calendar-days");
const nowbtn = document.querySelector(".nowbtn");
const myModal = document.querySelector("#staticBackdrop");
const myEventCard = new bootstrap.Modal(myModal);

//事件框的物件
const addEvent = document.querySelector(".add-btn");
const cancelEvent = document.querySelector(".cancel-btn");
const updateEvent = document.querySelector(".update-btn");
const inputEvent = document.querySelector("#input-event");
const inputDate = document.querySelector("#input-date");
const inputTime = document.querySelector("#input-time");
const inputLocal = document.querySelector("#input-local");
const inputColor = document.querySelector("#ColorInput");
const TitleLabel = document.querySelector("#staticBackdropLabel");
const closebtn = document.querySelector(".btn-close");

//瀏覽器存檔用的Key
const key = "AllEventList";

//月份陣列
const monthArry = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//日期初始化
const currentDate = new Date();
const now = new Date(Date.now());

//新增事件監聽器
window.addEventListener("DOMContentLoaded", initDate);
nowbtn.addEventListener("click", initDate);
prevBtn.addEventListener("click", prevMonth);
nextBtn.addEventListener("click", nextMonth);
calendarDays.addEventListener("click", showEvent);
addEvent.addEventListener("click", saveEvent);
closebtn.addEventListener("click", clearInput);
cancelEvent.addEventListener("click", (e) => {
  removeEvent(e.target.dataset.id);
  myEventCard.hide();
});
updateEvent.addEventListener("click", (e) => {
  editEvent(e.target.dataset.id);
  myEventCard.hide();
});

//切換月份函式
function initDate() {
  currentDate.setMonth(now.getMonth());
  updateCalendar();
  ShowTodoList();
}
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
  ShowTodoList();
}
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
  ShowTodoList();
}
//更新月份
function updateCalendar() {
  chooseMon.textContent = `${monthArry[currentDate.getMonth()]} `;
  chooseYear.textContent = `${currentDate.getFullYear()} `;
  calendarDays.innerHTML = "";
  updateDays();
}
//更新日期
function updateDays() {
  //目標月份的最後一日
  const getTargetMonthDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  //目標月份首日星期
  const getFirstWeekday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  //前月的日期
  for (let fountDay = getFirstWeekday; fountDay >= 1; fountDay--) {
    const getPrevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    prevdays = getPrevMonthDate.getDate() - fountDay + 1;
    daysDom(getPrevMonthDate, prevdays, "text-body-tertiary");
  }

  //當月日期
  for (let day = 1; day <= getTargetMonthDays; day++) {
    const Theday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    daysDom(Theday, day, "fw-bolder");
  }

  //次月的日期
  let countNextDay = (getTargetMonthDays % 7) + getFirstWeekday;
  if (countNextDay < 7) {
    for (let afterDay = 1; countNextDay + afterDay <= 7; afterDay++) {
      const NextMonthdate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        afterDay
      );
      daysDom(NextMonthdate, afterDay, "text-body-tertiary");
      container.style.height = "650px";
    }
  }
  if (countNextDay > 7) {
    for (let afterDay = 1; countNextDay + afterDay <= 14; afterDay++) {
      const NextMonthdate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        afterDay
      );
      daysDom(NextMonthdate, afterDay, "text-body-tertiary");
      console.log(container.style.height);
      container.style.height = "750px";
    }
  }
}
//日期DOM生成
function daysDom(date, day, othersStyle) {
  const dayDiv = document.createElement("div");
  const putEventDiv = document.createElement("div");
  const EventListul = document.createElement("ul");

  let ThedayId = date.toLocaleDateString();
  dayDiv.textContent = day;
  dayDiv.classList.add("day", "border", othersStyle);
  dayDiv.setAttribute("id", ThedayId);

  EventListul.setAttribute("id", `ul${ThedayId}`);

  putEventDiv.appendChild(EventListul);
  dayDiv.appendChild(putEventDiv);
  calendarDays.appendChild(dayDiv);

  if (date.toDateString() === new Date().toDateString()) {
    dayDiv.classList.add("today");
  }
}
//事件清單
function theListValue() {
  const EvenItem = inputEvent.value.trim();
  if (!EvenItem || !inputDate.value || !inputTime.value) {
    clearInput();
    return;
  }

  const EventList = {
    id: new Date(inputDate.value).toLocaleDateString(),
    // EventDate: inputDate.value,
    toDoList: [
      {
        id: new Date().valueOf(),
        EventName: EvenItem,
        time: inputTime.value,
        local: inputLocal.value.trim(),
        color: inputColor.value,
      },
    ],
  };

  return EventList;
}
//儲存事件
function saveEvent() {
  //事件清單
  const EventList = theListValue();
  //存檔至localStorage
  saveToDoList(EventList);
  //新增DOM
  ShowTodoList();
  //清空事件框
  clearInput();
}
//至localStorage取出所有事件
function getTodoListFromStorage() {
  const AllEvent = localStorage.getItem(key);
  return AllEvent ? JSON.parse(AllEvent) : [];
}
//儲存所有事件至localStorage
function saveToDoListToLocalStorage(AllEventList) {
  const json = JSON.stringify(AllEventList);
  localStorage.setItem(key, json);
}
//事件存檔：取出全部事件後再push
function saveToDoList(EventList) {
  const AllEventList = getTodoListFromStorage();
  //利用判斷式找出是否有存在該日期物件
  let foundid = false;
  AllEventList.forEach((item) => {
    if (item.id === EventList.id) {
      item.toDoList.push(EventList.toDoList[0]);
      foundid = true;
    }
  });

  if (!foundid) {
    AllEventList.push(EventList);
  }

  saveToDoListToLocalStorage(AllEventList);
}
//清空事件框
function clearInput() {
  TitleLabel.textContent = "新增事件";
  inputDate.value = "";
  inputEvent.value = "";
  inputTime.value = "";
  inputLocal.value = "";
  inputColor.value = "#ffdf5f";
  cancelEvent.classList.add("d-none");
  updateEvent.classList.add("d-none");
  addEvent.classList.remove("d-none");
}
//事件DOM創立
function createEvenItemHTML(EventList) {
  return `<li class="mx-2" id="${EventList.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  style="color:${EventList.color} ; border-left:2px solid ${EventList.color}">${EventList.time} ${EventList.local} / ${EventList.EventName} </li>
 `;
}
//將ToDoList放置正確的DOM
function ShowTodoList() {
  const todoList = getTodoListFromStorage();
  if (!todoList) return;
  todoList.forEach((item) => {
    const ulEl = document.getElementById(`ul${item.id}`);
    if (!ulEl) return;
    ulEl.innerHTML = "";
    const sortToDolist = sortEvenList(item.toDoList);
    sortToDolist.forEach((list) => {
      const todoItem = createEvenItemHTML(list, item.id);
      ulEl.innerHTML += todoItem;
    });
  });
}
//對ToDoList進行時間排序
function sortEvenList(item) {
  // return AllEventList.forEach((item) =>
  return item.sort((a, b) => {
    if (item.length > 0) {
      //將時間轉換成[時,分]陣列，個別比較
      const TimeA = a.time.split(":").map(Number);
      const TimeB = b.time.split(":").map(Number);
      return TimeA[0] - TimeB[0] || TimeA[1] - TimeB[1];
    }
    return;
  });
}
//顯示事件列表
function showEvent(e) {
  callInfoToCard(e);
}
//事件編輯列表
function setInfoToCard(EventList, EventDate) {
  TitleLabel.textContent = "事件內容";
  inputEvent.value = `${EventList.EventName}`;
  inputDate.value = `${dateFormat(EventDate)}`;
  inputTime.value = `${EventList.time}`;
  inputLocal.value = `${EventList.local}`;
  inputColor.value = `${EventList.color}`;
  cancelEvent.classList.remove("d-none");
  updateEvent.classList.remove("d-none");
  cancelEvent.setAttribute("data-id", `${EventList.id}`);
  updateEvent.setAttribute("data-id", `${EventList.id}`);
  cancelEvent.setAttribute("data-date", `${EventDate}`);
  updateEvent.setAttribute("data-date", `${EventDate}`);
  addEvent.classList.add("d-none");
}
//呼叫事件編輯列表
function callInfoToCard(e) {
  const EventList = getTodoListFromStorage();
  EventList.find((item) => {
    const todolistTarget = item.toDoList.findIndex(
      (todo) => `${todo.id}` === `${e.target.id}`
    );
    if (todolistTarget < 0) return;
    setInfoToCard(item.toDoList[todolistTarget], item.id);
  });
}
//刪除事件
function removeEvent(id) {
  const EventList = getTodoListFromStorage();
  EventList.forEach((item) => {
    const todolistItemIdx = item.toDoList.findIndex(
      (item) => `${item.id}` === `${id}`
    );
    if (todolistItemIdx > -1) {
      item.toDoList.splice(todolistItemIdx, 1);
    }
  });

  saveToDoListToLocalStorage(EventList);
  ShowTodoList();
}
//修改事件
function editEvent(id) {
  const EventList = getTodoListFromStorage();

  //刪除id的事件
  EventList.forEach((item) => {
    const todolistItemIdx = item.toDoList.findIndex(
      (item) => `${item.id}` === `${id}`
    );
    if (todolistItemIdx > -1) {
      item.toDoList.splice(todolistItemIdx, 1);
    }
  });
  saveToDoListToLocalStorage(EventList);

  //補上新的事件

  const updateEventList = theListValue();
  saveToDoList(updateEventList);
  ShowTodoList();
}
//日期format
function dateFormat(EventDate) {
  let year = new Date(EventDate).getFullYear();
  let month = new Date(EventDate).getMonth() + 1;
  let days = new Date(EventDate).getDate();

  //月份
  if (month < 10) {
    month = `0${month}`;
  }
  //日期
  if (days < 10) {
    days = `0${days}`;
  }

  return `${year}-${month}-${days}`;
}
