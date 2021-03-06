class Calendar {
    constructor(year, month, day, num = 10, obj) {
        this.year = year;
        this.month = month + 1;
        this.day = day;
        this.num = num;
        this.obj = obj;
        this.selectedDay = [];
        this.init();
    }
    //总调用函数
    init() {
        var calendar1 = document.querySelector('.calendar');
        var calendarTable = document.querySelector('.calendarTable');
        calendarTable.style.display = 'none';
        var input = document.querySelector('.date');
        input.value = `${this.year}-${this.month}-${this.day}`;
        this.set(calendarTable);
        this.listener(calendar1, calendarTable, input);
    }
    set(obj) {
        var div = document.createElement('div');
        div.setAttribute('id', 'select');
        obj.appendChild(div);
        var table = document.createElement('table');
        table.setAttribute('id', 'table');
        obj.appendChild(table);
    }
    select(year, month, day, num = 10) {
        var div = document.querySelector('#select');
        var selectYear = document.createElement('select');
        selectYear.setAttribute('id', 'selectYear');
        var selectMonth = document.createElement('select');
        selectMonth.setAttribute('id', 'selectMonth');
        var selectDay = document.createElement('select');
        selectDay.setAttribute('id', 'selectDay');
        var input = document.querySelector('.date');
        var calendarTable = document.querySelector('.calendarTable');
        //每月天数
        var bool = year % 4 === 0;
        var monthNum = [31, bool ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //年份选择框遍历 区间为当前年份加减num
        for (let i = -num; i < num; i++) {
            var option = document.createElement('option');
            if (i + 2019 === year * 1) {
                option.setAttribute('selected', 'selected');
            }
            option.setAttribute('value', `${2019 + i}`);
            option.innerHTML = 2019 + i;
            selectYear.appendChild(option);
        }
        //月份固定12
        for (let i = 1; i <= 12; i++) {
            var option = document.createElement('option');
            if (i === month * 1) {
                option.setAttribute('selected', 'selected');
            }
            option.setAttribute('value', `${i}`);
            option.innerHTML = i;
            selectMonth.appendChild(option);
        }
        //天数根据月份来确定
        for (let i = 1; i <= monthNum[month - 1]; i++) {
            var option = document.createElement('option');
            if (i === day * 1) {
                option.setAttribute('selected', 'selected');
            }
            option.setAttribute('value', `${i}`);
            option.innerHTML = i;
            selectDay.appendChild(option);
        }
        selectYear.onchange = () => {
            var curMonth = document.querySelector('#selectMonth');
            var curDay = document.querySelector('#selectDay');
            this.select(selectYear.value, curMonth.value, curDay.value);
            input.value = `${selectYear.value}-${curMonth.value}-${curDay.value}`;
            this.render(selectYear.value, curMonth.value, curDay.value);
            this.updateDate(selectYear.value, curMonth.value, curDay.value);
        }
        selectMonth.onchange = () => {
            var curYear = document.querySelector('#selectYear');
            var curDay = document.querySelector('#selectDay');
            this.select(curYear.value, selectMonth.value, curDay.value);
            input.value = `${curYear.value}-${selectMonth.value}-${curDay.value}`;
            this.render(curYear.value, selectMonth.value, curDay.value);
            this.updateDate(curYear.value, selectMonth.value, curDay.value);
        }
        selectDay.onchange = () => {
            var curYear = document.querySelector('#selectYear');
            var curMonth = document.querySelector('#selectMonth');
            //input栏当点击日期完成时填入当前数据
            input.value = `${curYear.value}-${curMonth.value}-${selectDay.value}`;
            this.render(curYear.value, curMonth.value, selectDay.value);
            calendarTable.style.display = 'none';
            this.updateDate(curYear.value, curMonth.value, selectDay.value);
        }
        div.innerHTML = '';
        div.appendChild(selectYear);
        div.appendChild(selectMonth);
        div.appendChild(selectDay);
    }
    render(year, month, day) {
        var year = Number(year), month = Number(month), day = Number(day);
        var curTime = new Date(year, month - 1, 1);
        var table = document.querySelector('#table');
        table.classList.add('calendar');
        table.innerHTML = `
            <thead>
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
            </thead>
        `;
        //月份需要减1才能对应上日期
        month--;
        //确定是否闰年
        var bool = year % 4 === 0;
        //确定月份天数
        var monthNum = [31, bool ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //确定当天周几
        var dayWeek = curTime.getDay();
        //确定日历行数
        var row = Math.ceil((dayWeek + monthNum[month]) / 7);
        for (var i = 0; i < row; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td');
                this.point(td);
                //计算出每月第一天在日历上的位置
                var date = i * 7 + j - dayWeek + 1;
                if (date > 0 && date <= monthNum[month]) {
                    //判断是否被选中区域
                    //先计算出来变量准备和interval对比
                    var curDate = [year, month + 1, date];
                    if (this.compareDate(curDate, this.selectedDay)) {
                        td.classList.add('selected');
                    }
                    td.innerHTML = date;
                    if (date === day) {
                        td.style.backgroundColor = 'red';
                    }
                } else if (date <= 0) {
                    //判断上个月的天数计算前月日期
                    //如果当前是一月则前月直接定位12月
                    td.innerHTML = monthNum[month === 0 ? 11 : month - 1] + date;
                    td.style.opacity = '0.3'
                } else if (date > monthNum[month]) {
                    //无需判断了 直接123456遍历下去即可
                    td.innerHTML = date - monthNum[month];
                    td.style.opacity = '0.3'
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
    listener(calendar1, calendarTable, input) {
        input.onmousedown = () => {
            if (input.value !== '') {
                var str = input.value.match(/\d{4}-\d{1,2}-\d{1,2}/);
                if (str) {
                    var arr = str[0].split('-');
                    this.select(arr[0], arr[1], arr[2]);
                    this.render(arr[0], arr[1], arr[2]);
                }
            }
            if (calendarTable.style.display === 'none') {
                calendarTable.style.display = 'block';
            } else {
                calendarTable.style.display = 'none';
            }
        }
        input.oninput = () => {
            if (input.value !== '') {
                var str = input.value.match(/\d{4}-\d{1,2}-\d{1,2}/);
                if (str) {
                    var arr = str[0].split('-');
                    this.select(arr[0], arr[1], arr[2]);
                    this.render(arr[0], arr[1], arr[2]);
                }
            }
        }
    }
    //点击标记日期
    point(node) {
        node.onclick = (event) => {
            if (event.target.style.opacity === '0.3' || isNaN(parseInt(event.target.innerHTML))) return false;
            var selected = document.querySelectorAll('.selected');
            if (this.selectedDay.length === 0 || this.selectedDay.length > 1) {
                this.selectedDay = [];
                selected.forEach(item => {
                    item.classList.remove('selected');
                })
                node.classList.add('selected');
                var date = this.getDate();
                //日期是鼠标点选的 并非选下拉框选的 故替换最后一位为鼠标所选的日期
                date.splice(2, 1, +node.innerHTML);
                this.selectedDay.push(date);
                //为了解决重复点一个点的问题进行数组去重
            } else if (this.selectedDay.length === 1) {
                node.classList.add('selected');
                var date = this.getDate();
                date.splice(2, 1, +node.innerHTML);
                this.selectedDay.push(date);
                this.selectedDay = this.sortArray(this.selectedDay);
                this.render(this.year, this.month, this.day);
                var input = document.querySelector('.date');
                input.value = `${this.selectedDay[0][0]}-${this.selectedDay[0][1]}-${this.selectedDay[0][2]}至${this.selectedDay[1][0]}-${this.selectedDay[1][1]}-${this.selectedDay[1][2]}`;
            }
            console.log(this.selectedDay)
        }
    }
    updateDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    getDate() {
        return [this.year, this.month, this.day];
    }
    //给添加的日期排序
    sortArray(arr) {
        var newArr = arr.sort((a, b) => {
            if (a[0] !== b[0]) {
                return a[0] - b[0];
            } else {
                if (a[1] !== b[1]) {
                    return a[1] - b[1];
                } else {
                    return a[2] - b[2];
                }
            }
        });
        return newArr;
    }
    //对比日期大小 在区间内则返回true 反之为false
    compareDate(tar, arr) {
        if (arr.length <= 1) return false;
        var newTar = tar.map(item => {
            var str = `${item}`;
            return str.length === 1 ? item = '0' + item : item;
        });
        var newArr1 = arr[0].map(item => {
            var str = `${item}`;
            return str.length === 1 ? item = '0' + item : item;
        });
        var newArr2 = arr[1].map(item => {
            var str = `${item}`;
            return str.length === 1 ? item = '0' + item : item;
        });
        var tarNum = `${newTar[0]}${newTar[1]}${newTar[2]}`,
            arrNum1 = `${newArr1[0]}${newArr1[1]}${newArr1[2]}`,
            arrNum2 = `${newArr2[0]}${newArr2[1]}${newArr2[2]}`;
        if (+tarNum >= +arrNum1 && +tarNum <= +arrNum2) return true;
        return false;
    }
}
export default Calendar;