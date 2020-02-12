//常用声明
var ul = document.getElementsByTagName("ul")[0];
var text1 = document.getElementById("text1");
//创建ul提示框列表函数
function createLi(value) {
    var reg = new RegExp("^" + text1.value, "i");
    //用正则检测符合条件的值并显示li
    //filter方法返回值为数组
    var result = value.filter(function (item) {
        if (item) {
            return item.match(reg);
        }
    });
    //直接输出html代码
    var liText = "";
    for (let i = 0; i < result.length; i++) {
        //将符合搜索框的字符变红
        var item1 = "<span class='word'>" + result[i].substring(0, text1.value.length) + "</span>" + result[i].substring(text1.value.length);
        liText += "<li class='li1'>" + item1 + "</li>";
    }
    ul.innerHTML = liText;
    //ul本来隐藏 运行函数后显示
    ul.style.visibility = "visible";
    //事件监听
    ul.addEventListener("mouseover", function (e) {
        var active = document.querySelector(".active");
        if (active) {
            active.className = "li1";
        }
        if (e.target == ul) return false;
        e.target.className = "active";
    });
    ul.addEventListener("mouseout", function (e) {
        e.target.className = "li1";
    });
    ul.addEventListener("click", function (e) {
        //如果点击span标签则不运行
        if (e.target.parentNode !== ul) return false;
        if (e.target.childNodes[0].childNodes[0]) {
            //去除innerhtml中的span标签并输出字符
            text1.value = e.target.childNodes[0].childNodes[0].nodeValue + e.target.childNodes[1].nodeValue;
        } else {
            text1.value = e.target.childNodes[1].nodeValue;
        }
        //点击后隐藏ul
        ul.style.visibility = "hidden";
    });
    //鼠标离开ul后清空ul并隐藏
    ul.addEventListener("mouseleave", function (e) {
        e.target.innerHTML = "";
        e.target.style.visibility = "hidden";
    });
    //鼠标离开span后保持红色 不被class属性active改变为灰色
    var span = document.getElementsByTagName("span");
    for (let i = 0; i < span.length; i++) {
        span[i].onmouseout = function (e) {
            e.target.style.color = "red";
        }
    }
}
//ajax获取后端数据匹配并调用创建提示框函数
function check() {
    ul.innerHTML = "";
    var xhr = new XMLHttpRequest();
    var url = "http://localhost/ife/ife2015/task2/task2-4.php";
    //匹配成功后执行
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //返回的数据根据逗号分隔开为数组
            var arr = xhr.responseText.split(",");
            createLi(arr);
        }
    }
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
}
//text1变动时则运行函数修改ul列表
text1.oninput = check;
//text1为focus状态时进行键盘事件监听
text1.onfocus = function () {
    check();
    //监听键盘事件 回车 上下键
    document.onkeydown = function (event) {
        var e = event;
        //键盘上键
        if (e.keyCode == 38) {
            //检测是否已有高亮元素
            var active = document.querySelector(".active");
            if (active) {
                //有则检测是否前方有元素 不能再向上则不运行
                if (active.previousElementSibling == null) {
                    return false;
                } else {
                    //有元素则高亮向上一个
                    active.className = "li1";
                    active.previousElementSibling.className = "active";
                }
            } else {
                //若没有高亮元素 则设置第一个元素高亮
                //此方法选取的为第一个class为li1的元素
                var li = document.querySelector(".li1");
                li.className = "active";
            }
        } else if (e.keyCode == 40) {
            //键盘下键 判断逻辑同上
            var active = document.querySelector(".active");
            if (active) {
                if (active.nextElementSibling == null) {
                    return false;
                } else {
                    active.className = "li1";
                    active.nextElementSibling.className = "active";
                }
            } else {
                var li = document.querySelector(".li1");
                li.className = "active";
            }
        }
        if (e.keyCode == 13) {
            var active = document.querySelector(".active");
            //去除nodevalue中的span标签
            //若span标签中没有子节点 则直接返回li的第二个子节点
            //若有则将两个节点拼接 也即去掉span标签
            if (active.childNodes[0].childNodes[0]) {
                text1.value = active.childNodes[0].childNodes[0].nodeValue + active.childNodes[1].nodeValue;
            } else {
                text1.value = active.childNodes[1].nodeValue;
            }
            ul.innerHTML = "";
        }
    }
}
