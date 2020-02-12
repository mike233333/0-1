//切换图片函数
function changePic(i = 0, time = 1) {
    var img = document.getElementsByTagName("img");
    for (var j = 0; j < img.length; j++) {
        img[j].style.animation = "";
        img[j].style.visibility = `hidden`;
    }
    img[i].style.visibility = `visible`;
    img[i].style.animation = `mymove2 ${time}s`;
}
var a = document.getElementById("div2").getElementsByTagName("a");
//自动循环函数
function autoChange(x = 1) {
    var time;
    var img = document.getElementsByTagName("img");
    if (x == 1) {
        for (let i = 0; i < img.length; i++) {
            var style = window.getComputedStyle(img[i], null).getPropertyValue("visibility");
            if (style == "visible") {
                if (i == 4) {
                    time = setTimeout(`changePic(${0})`, 1);
                    continue;
                } else {
                    time = setTimeout(`changePic(${i + 1})`, 1);
                }
            }
        }
    } else {
        for (let i = 4; i >= 0; i--) {
            var style = window.getComputedStyle(img[i], null).getPropertyValue("visibility");
            if (style == "visible") {
                if (i == 0) {
                    time = setTimeout(`changePic(${4})`, 1);
                    continue;
                } else {
                    time = setTimeout(`changePic(${i - 1})`, 1);
                }
            }
        }
    }
}
//启用自动循环
var times;
function auto(interval=2000) {
    var value = document.getElementsByName("radio");
    var value2 = document.getElementsByName("radios");
    if (times) {
        clearTimeout(times);
    }
    if (value[0].checked) {
        if(value2[0].checked){
            times = setInterval("autoChange()", interval);
        }else{
            for(let i=1;i<6;i++){
                times = setTimeout(`changePic(${i-1})`, i*interval);
            }
        }
    } else {
        if(value2[0].checked){
            times = setInterval(`autoChange(${2})`, interval);
        }else{
            for(let i=5,j=1;i>0,j<6;i--,j++){
                times = setTimeout(`changePic(${i-1})`, j*interval);
            }
        }
    }
    for (let i = 0; i < a.length; i++) {
        a[i].onclick = function () {
            clearTimeout(times);
            changePic(i);
        }
    }
}
//所有功能监听
function listener() {
    var radio = document.getElementsByName("radio");
    var radios=document.getElementsByName("radios");
    var input=document.getElementsByTagName("input")[4];
    var button=document.getElementsByTagName("input")[5];
    //radio监听
    for (let i = 0; i < radio.length; i++) {
        radio[i].onchange = auto;
    }
    //radios监听 是否循环
    for(let i=0;i<radios.length;i++){
        radios[i].onchange=auto;
    }
    //input输入间隔 按钮监听
    console.log(button)
    if(typeof +input.value=="number"){
        button.onclick=function(){
            auto(+input.value*1000)
        }
    }
}
//changePic必须在调用函数auto前面 否则读取style属性不够快 会出现错误
changePic();
auto();
listener();