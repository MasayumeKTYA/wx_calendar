Component({
  properties: {

  },
  data: {
    currentTimestamp: 0,
    claenderDay: []
  },
  lifetimes: {
    attached() {
      const yyyy = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
      console.log(yyyy);
      const date = new Date(new Date(yyyy).getTime())
      const claender = this.initCalendar(date.getTime())
      console.log(claender);
      this.setData({
        header: date.getTime(),
        claenderDay: claender
      })
    },
  },
  methods: {
    //日历 判断月份
    MonthJudge(month) {
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        return 31
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30
      } else {
        if (this.judgeYears(years)) {
          return 28
        } else {
          return 29
        }
      }
    },
    // 判断闰年还是平年
    judgeYears(years) {
      if (years % 400 == 0 || years % 4 == 0 && years % 100 != 0) {
        return false
      } else {
        return true
      }
    },
    //生成日历数组
    initCalendar(Timestamp) {
      const currentMonth = new Date(Timestamp)
      //获取当月天数
      const dayNum = this.MonthJudge(currentMonth.getMonth() + 1)
      //获取当月开始星期
      const startDay = currentMonth.getDay()
      //循环次数
      const forTime = dayNum + startDay > 35 ? 42 : 35
      //获取当月
      const Month = currentMonth.getMonth() + 1
      const res = []
      for (let i = 0; i < forTime; i++) {
        const obj = {}
        const everyDay = Timestamp + (i - startDay) * 1000 * 60 * 60 * 24
        obj.day = new Date(everyDay).getDate()
        obj.timestamp = everyDay
        obj.isCurrentMonth = Month == (new Date(everyDay).getMonth() + 1) ? true : false
        obj.active = false
        if (i == 10) {
          obj.active = true
        }
        res.push(obj)

      }
      return res
    },
    //日期选择
    bindDateChange(e) {
      const value = e.detail.value.slice(0, 7)
      console.log(value);
      const date = new Date(new Date(value).getTime())
      const claender = this.initCalendar(date.getTime())
      console.log(claender);
      this.setData({
        header: date.getTime(),
        claenderDay: claender
      })
    },
  },
})