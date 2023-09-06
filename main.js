'use strict'
{
  const createCalender = (targetDate) => {
    clearCalender()
    createCalenderHeader(targetDate)
    createCalenderBody(targetDate)
  }

  const createCalenderHeader = (targetDate) => {
    const todaysYear = targetDate.getFullYear()
    const todaysMonth = targetDate.getMonth() + 1
    const calenderTitle = document.getElementById('calender_title')
    calenderTitle.textContent =
      `${todaysYear}` + ' / ' + `${todaysMonth}`.padStart(2, '0')
  }

  const tbody = document.querySelector('tbody')
  const clearCalender = () => {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
    }
  }

  const createCalenderBody = (targetDate) => {
    const endOfMonth = getEndOfMonth(targetDate)
    const lastDateOfMonth = endOfMonth.getDate()
    const startOfMonth = getStartOfMonth(targetDate)
    const startOfMonthDay = startOfMonth.getDay()
    const endOfLastMonth = getEndOfLastMonth(targetDate)
    let lastMonthLastDate = endOfLastMonth.getDate()
    const lastMonthLastDay = endOfLastMonth.getDay()
    const month = targetDate.getMonth()
    const year = targetDate.getFullYear()

    renderCalender(
      lastDateOfMonth,
      startOfMonthDay,
      lastMonthLastDate,
      lastMonthLastDay,
      month,
      year
    )
  }

  const getEndOfMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth() + 1, 0)
    return targetDate
  }
  const getEndOfLastMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth(), 0)
    return targetDate
  }
  const getStartOfMonth = (targetDate) => {
    targetDate.setMonth(targetDate.getMonth(), 1)
    return targetDate
  }

  const createWeeks = (
    lastDateOfMonth, // 今月の最終日
    startOfMonthDay, // 今月の開始曜日
    lastMonthLastDate, // 先月の最終日
    lastMonthLastDay // 先月の最終曜日
  ) => {
    // 先月の描画中かどうか
    const isSunday = (day) => day === 0
    // 条件 ? 満たすとき : 満たさないとき
    let isRenderLastMonthDate = isSunday(startOfMonthDay) ? false : true
    let date = startOfMonthDay === 0 ? 1 : lastMonthLastDate - lastMonthLastDay

    let day = 0
    let week = 0
    let weeks = []
    while (1) {
      // １日が日曜だったら
      if (weeks[week] === undefined) {
        weeks[week] = []
      }
      //今日の判定をする

      const todayDate = new Date().getDate()
      const todayMonth = new Date().getMonth()
      const todayYear = new Date().getFullYear()
      if (date == todayDate && todayMonth == month && todayYear == year) {
        weeks[week][day] = date * -1
      } else {
        weeks[week][day] = date
      }

      date++ //日付の部分 27,28,29,30,31,1...
      day++ //曜日。日〜土

      if (day === 7) {
        day = 0
        if (
          !isRenderLastMonthDate &&
          weeks[week].includes(lastDateOfMonth) &&
          week !== 0
        ) {
          break
        }
        week++
      }
      if (isRenderLastMonthDate) {
        if (date > lastMonthLastDate) {
          date = 1
          isRenderLastMonthDate = false
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
    lastDateOfMonth, // 今月の最終日
    startOfMonthDay, // 今月の開始曜日
    lastMonthLastDate, // 先月の最終日
    lastMonthLastDay, // 先月の最終曜日
    month
  ) => {
    const weeks = createWeeks(
      lastDateOfMonth,
      startOfMonthDay,
      lastMonthLastDate,
      lastMonthLastDay,
      month
    )

    // 週を描画する
    for (let week = 0; week < weeks.length; week++) {
      const tr = document.createElement('tr')

      // 日を描画する
      for (let day = 0; day < weeks[week].length; day++) {
        const td = document.createElement('td')
        td.textContent = Math.abs(weeks[week][day])
        if (weeks[week][day] < 0) {
          td.classList.add('today')
        }
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    }
  }

  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  createCalender(new Date())

  //左ボタンを押した時の実装
  const leftButtonElement = document.getElementById('leftButton')
  leftButtonElement.addEventListener('click', () => {
    month--
    if (month < 0) {
      year--
      month = 11
    }
    createCalender(new Date(year, month))
  })

  //右ボタンを押した時の実装
  const rightButtonElement = document.getElementById('rightButton')
  rightButtonElement.addEventListener('click', () => {
    month++
    if (month > 11) {
      year++
      month = 0
    }
    createCalender(new Date(year, month))
  })

  //todayボタンを押した時の実装
  const todayButtonElement = document.querySelector('button')
  todayButtonElement.addEventListener('click', () => {
    year = new Date().getFullYear()
    month = new Date().getMonth()
    createCalender(new Date(year, month))
  })
}
