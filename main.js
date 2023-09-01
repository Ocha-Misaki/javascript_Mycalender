"use strict";
{
  const createCalender = (targetDate) => {
    clearCalender();
    createCalenderHeader(targetDate);
    createCalenderBody(targetDate);
  };

  const createCalenderHeader = (targetDate) => {
    const todaysYear = targetDate.getFullYear();
    const todaysMonth = targetDate.getMonth() + 1;
    const calenderTitle = document.getElementById("calender_title");
    calenderTitle.textContent =
      `${todaysYear}` + " / " + `${todaysMonth}`.padStart(2, "0");
  };

  const tbody = document.querySelector("tbody");
  const clearCalender = () => {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  };

  const createCalenderBody = (targetDate) => {
    //月末の日付を取得する
    const lastDate = getEndOfMonth(targetDate);
    //月初の曜日を取得する

    const startOfMonth = getStartOfMonth(targetDate);
    console.log(startOfMonth);
    const startOfMonthDay = startOfMonth.getDay();

    let date = 1;
    const endOfLastMonth = getEndOfLastMonth(targetDate);
    let lastMonthLastDate = endOfLastMonth.getDate();
    const lastMonthLastDay = endOfLastMonth.getDay();

    for (let row = 0; row < 5; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 7; col++) {
        const td = document.createElement("td");
        if (date > lastDate) {
          date = 1;
        }
        if (row < 1 && col >= startOfMonthDay) {
          td.textContent = date;
          date++;
        } else if (row < 1 && col < startOfMonthDay) {
          td.textContent = lastMonthLastDate - lastMonthLastDay;
          lastMonthLastDate++;
        } else if (row > 0) {
          td.textContent = date;
          date++;
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  };

  const getEndOfMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth() + 1, 0);
    return targetDate;
  };
  const getEndOfLastMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth(), 0);
    return targetDate;
  };
  const getStartOfMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth(), 1);
    return targetDate;
  };

  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  createCalender(new Date(`${year}-${month}`));

  //左ボタンを押した時の実装
  const leftButtonElement = document.getElementById("leftButton");
  leftButtonElement.addEventListener("click", () => {
    month--;
    if (month < 1) {
      year--;
      month = 12;
    }
    createCalender(new Date(`${year}-${month}`));
  });

  //右ボタンを押した時の実装
  const rightButtonElement = document.getElementById("rightButton");
  rightButtonElement.addEventListener("click", () => {
    month++;
    if (month > 12) {
      year++;
      console.log(year);
      month = 1;
    }
    createCalender(new Date(`${year}-${month}`));
  });

  //todayボタンを押した時の実装
  const todayButtonElement = document.querySelector("button");
  todayButtonElement.addEventListener("click", () => {
    createCalender(new Date());
  });
}
