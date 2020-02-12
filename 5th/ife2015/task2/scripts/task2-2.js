function showTime(time) {
    var time = document.getElementById("date");
    var date = time.value
    var year = date.substring(0, 4),
        month = date.substring(5, 7),
        day = date.substring(8);
    var mDate = Date.UTC(year, month, day);
    var now = new Date();
    var minus = mDate - now.getTime();
    var days, hours, minutes, seconds;
    days = 0 | minus / (1000 * 3600 * 24);
    hours = 0 | (minus % (1000 * 3600 * 24)) / (1000 * 3600);
    minutes = 0 | (minus % (1000 * 3600 * 24)) % (1000 * 3600) / (1000 * 60);
    seconds = 0 | (minus % (1000 * 3600 * 24)) % (1000 * 3600) % (1000 * 60) / 1000;
    var p = document.getElementById("p");
    p.innerHTML = `距离${year}年${month}月${day}日还有${days}天${hours}小时${minutes}分${seconds}秒`
    if (days < 0) {
        return false;
    }
    setTimeout(showTime, 1000);
}
var but1 = document.getElementById("but1");
but1.onclick = showTime;