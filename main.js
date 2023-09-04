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
    const endOfMonth = getEndOfMonth(targetDate);
    const lastDateOfMonth = endOfMonth.getDate();
    const startOfMonth = getStartOfMonth(targetDate);
    const startOfMonthDay = startOfMonth.getDay();
    const endOfLastMonth = getEndOfLastMonth(targetDate);
    let lastMonthLastDate = endOfLastMonth.getDate();
    const lastMonthLastDay = endOfLastMonth.getDay();

    renderCalender(
      lastDateOfMonth,
      startOfMonthDay,
      lastMonthLastDate,
      lastMonthLastDay
    );
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

  // 
    // lastDateOfMonth,  // 今月の最終日
    // startOfMonthDay,  // 今月の開始曜日
    // lastMonthLastDate,// 先月の最終日
    // lastMonthLastDay  // 先月の最終曜日
  const createWeeks = (
    lastDateOfMonth,  // 今月の最終日
    startOfMonthDay,  // 今月の開始曜日
    lastMonthLastDate,// 先月の最終日
    lastMonthLastDay  // 先月の最終曜日
  ) => {
    // 先月の描画中かどうか
    const isSunday = (startOfMonthDay) => {
      startOfMonthDay === 0
    }
    // 条件 ? 満たすとき : 満たさないとき
    let isRenderLastMonth = isSunday() ? false : true
    let date = startOfMonthDay === 0 ? 1 : lastMonthLastDate - lastMonthLastDay
    
    let day = 0
    let week = 0
    let weeks = []    
    while (1) {
      // １日が日曜だったら
      if (weeks[week] === undefined) {
        weeks[week] = []
      }
      weeks[week][day] = date

      date++
      day++
      if (day === 7) {
        day = 0
        week++
      }

      // 終了条件
      // weeks[week] の中に　lastDateOfMonth が含まれていれば
      if (!isRenderLastMonth && weeks[week].includes(lastDateOfMonth)) {
        break
      }
      
      // （先月の最終日）を超えたら
      if (isRenderLastMonth) {
        if (date > lastMonthLastDate){
          date = 1
          isRenderLastMonth = false
        }
      }
      // （今月の最終日）を超えたら
      else {
        if (date > lastDateOfMonth) {
          date = 1
        }
      }
    }    
    return weeks
  }
  const renderCalender = (
    lastDateOfMonth,  // 今月の最終日
    startOfMonthDay,  // 今月の開始曜日
    lastMonthLastDate,// 先月の最終日
    lastMonthLastDay  // 先月の最終曜日
  ) => {
    let date = 1;
    
    const weeks = createWeeks(
      lastDateOfMonth,
    startOfMonthDay,
    lastMonthLastDate,
    lastMonthLastDay 
    )
    console.table(weeks);
    return 
    // 週を描画する
    for (let row = 0; row < 5; row++) {
      const tr = document.createElement("tr");
      
      // weeks[][] = weeks[0][0]  
      // weeks.length === 描画する行数
      
      // week = [0,1,2]
      // week[0] == [0,1,2]
      // week[0][1] == 1
      

      // [0] [30,1,2,3,4,5,6]
      // [1] [7,8,9,10,11,12,13]
      // [2] [...]
      // [3] [...]
      // [4] [...]
      // [5] [...]

      renderWeek([30,1,2,3,4,5,6])
      renderWeek([7,8,9,10,11,12,13])
      // 日を描画する
      for (let col = 0; col < 7; col++) {
        const td = document.createElement("td");
        if (date > lastDateOfMonth) {
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

  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
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
      month = 1;
    }
    createCalender(new Date(`${year}-${month}`));
  });

  //todayボタンを押した時の実装
  const todayButtonElement = document.querySelector("button");
  todayButtonElement.addEventListener("click", () => {
    createCalender(new Date());
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
  });
}
