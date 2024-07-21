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
    daysDom(getPrevMonthDate, prevdays);

    // const dayDiv = document.createElement("div");
    // let getPrevMonthDaysId = getPrevMonthDays.toLocaleDateString();
    // dayDiv.textContent = getPrevMonthDays.getDate() - fountDay + 1;
    // dayDiv.setAttribute("id", getPrevMonthDaysId);
    // dayDiv.classList.add("day", "border", "text-body-tertiary");
    // const dayul = document.createElement("ul");
    // dayul.setAttribute("id", `ul${getPrevMonthDaysId}`);
    // dayDiv.appendChild(dayul);
    // calendarDays.appendChild(dayDiv);
  }

  //當月日期
  for (let day = 1; day <= getTargetMonthDays; day++) {
    const Theday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    daysDom(Theday, day);
    // const dayDiv = document.createElement("div");
    // let ThedayId = Theday.toLocaleDateString();
    // dayDiv.textContent = day;
    // dayDiv.classList.add("day", "border");
    // dayDiv.setAttribute("id", ThedayId);
    // const dayDiv2 = document.createElement("div");
    // const dayul = document.createElement("ul");
    // dayul.setAttribute("id", `ul${ThedayId}`);
    // dayDiv2.appendChild(dayul);
    // dayDiv.appendChild(dayDiv2);
    // calendarDays.appendChild(dayDiv);
  }
  let countNextDay = (getTargetMonthDays % 7) + getFirstWeekday;

  //次月的日期
  if (countNextDay < 7) {
    for (let afterDay = 1; countNextDay + afterDay <= 7; afterDay++) {
      const NextMonthdate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        afterDay
      );

      daysDom(NextMonthdate, afterDay);
      // const dayDiv = document.createElement("div");
      // let NextMonthdayId = NextMonthday.toLocaleDateString();
      // dayDiv.textContent = afterDay;
      // dayDiv.classList.add("day", "border", "text-body-tertiary");
      // dayDiv.setAttribute("id", NextMonthdayId);
      // const dayul = document.createElement("ul");
      // dayul.setAttribute("id", `ul${NextMonthdayId}`);
      // dayDiv.appendChild(dayul);
      // calendarDays.appendChild(dayDiv);
    }
  }
  if (countNextDay > 7) {
    for (let afterDay = 1; countNextDay + afterDay <= 14; afterDay++) {
      const NextMonthdate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        afterDay
      );

      daysDom(NextMonthdate, afterDay);
      // const dayDiv = document.createElement("div");
      // let NextMonthdayId = NextMonthday.toLocaleDateString();
      // dayDiv.textContent = afterDay;
      // dayDiv.classList.add("day", "border", "text-body-tertiary");
      // dayDiv.setAttribute("id", NextMonthdayId);
      // const dayul = document.createElement("ul");
      // dayul.setAttribute("id", `ul${NextMonthdayId}`);
      // dayDiv.appendChild(dayul);
      // calendarDays.appendChild(dayDiv);
    }
  }
}

//  <!--事件項目-->
// <template lass="modal fade" id="todolistCard" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//     aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <!-- <p class="rounded mx-1" id= "" data-bs-toggle="modal" style="color:aqua ; border:0.5px solid aqua">
//    </p> -->
//     <div class="modal-dialog modal-dialog-centered">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h1 class="modal-title fs-5" id="staticBackdropLabel">新增事件</h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//                 <form>
//                     <div class="row mb-3">
//                         <label for="input-event" class="col-sm-3 col-form-label">事件名稱：</label>
//                         <div class="col-sm-9">
//                             事件名稱：
//                         </div>
//                     </div>
//                     <div class="row mb-3">
//                         <label for="input-date" class="col-sm-3 col-form-label">日期：</label>
//                         <div class="col-sm-9">
//                             日期：
//                         </div>
//                     </div>
//                     <div class="row mb-3">
//                         <label for="input-time" class="col-sm-3 col-form-label">時間：</label>
//                         <div class="col-sm-9">
//                             時間
//                         </div>
//                     </div>
//                     <div class="row mb-3">
//                         <label for="input-local" class="col-sm-3 col-form-label">地點：</label>
//                         <div class="col-sm-9">
//                             地點
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             <div class="modal-footer">
//                 <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button> -->
//                 <button type="button" class="cancel-btn btn btn-danger d-none">刪除</button>
//                 <!-- <button type="button" class="add-btn btn btn-success" data-bs-dismiss="modal">新增</button> -->
//             </div>
//         </div>
//     </div>

// </template>

//判斷目標日期的事件是否為空，空則清除
// const theEventIndex = EventList.findIndex((item) => item.id === date);
// const EventCount = EventList[theEventIndex].toDoList.length;
// console.log(theEventIndex);
// console.log(EventCount);
// if (EventCount <= 0) {
//   EventList.splice(theEventIndex, 1);
// }
// console.log(EventList);




//   const theEventIndex = EventList.findIndex((item) => item.id === date);
//   const EventCount = EventList[theEventIndex].toDoList.length;
//   console.log(theEventIndex);
//   console.log(EventCount);
//   if (EventCount <= 0) {
//     EventList.splice(theEventIndex, 1);
//     const ulEl = document.getElementById(`ul${EventList[theEventIndex].id}`);
//     ulEl.remove();
//   }
//   console.log(EventList);