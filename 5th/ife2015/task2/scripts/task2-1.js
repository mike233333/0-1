/*
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (arr instanceof Array) {
        return true;
    } else {
        return false;
    }
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var aaa;
    switch (typeof src) {
        case "object":
            if (src instanceof Object) {
                aaa = {};
                for (var i in src) {
                    aaa[i] = cloneObject(src[i]);
                }
            } else {
                aaa = [];
                for (var i = 0; i < src.length; i++) {
                    aaa.push(src[i]);
                }
            }
            break;
        case "number":
            aaa = src;
            break;
        case "string":
            aaa = src;
            break;
        case "boolean":
            aaa = src;
            break;
        default:
            break;
    }
    return aaa;
}
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var aaa = [];
    for (var i = 0; i < arr.length; i++) {
        if (!~aaa.indexOf(arr[i])) {
            aaa.push(arr[i]);
        }
    }
    return aaa;
}
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b);

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var aaa = str,
        a;
    a = aaa.search(/\s\S/g);
    aaa = aaa.slice(a + 1);
    a = aaa.search(/\s$/g);
    if (a === -1) {
        return aaa;
    }
    console.log(a);
    aaa = aaa.slice(0, a);
    return aaa;
}
var str = '   hi! asas  a ';
str = simpleTrim(str);
console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html



// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var a = 0;
    for (var i in obj) {
        a++;
    }
    return a;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /\S+@\S+\.\S+/;
    return reg.test(emailStr) ? true : false;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /1[3,5,7,8]\d{9}/;
    return reg.test(phone) ? true : false;
}
console.log(isEmail("123456@123.com"))
console.log(isMobilePhone(131111511111));


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode ? true : false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    element.style.position = "fixed";
    var x = element.offsetTop,
        y = element.offsetLeft;
    return { x, y };
}

// 实现一个简单的Query
function $(selector) {
    var aaa;
    var selector = selector.trim();
    var a = selector.slice(0, 1);
    var b = selector.slice(1);
    if (selector.indexOf(" ") === -1) {
        switch (a) {
            case "#":
                aaa = document.getElementById(b);
                break;
            case ".":
                aaa = document.getElementsByClassName(b)[0];
                break;
            case "[":
                var all = document.getElementsByTagName("*");
                for (var i = 0; i < all.length; i++) {
                    if (selector.slice(1, -1).search(/=/) !== -1) {
                        var attr1 = all[i].getAttribute(selector.slice(1, selector.search(/=/)));
                        if (attr1 !== null) {
                            (attr1 == selector.slice(selector.search(/=/) + 1, -1)) ? aaa = all[i] : false;
                        }
                    } else {
                        var attr = all[i].getAttribute(selector.slice(1, -1));
                        if (attr !== null) {
                            aaa = all[i];
                        }
                    }
                }
                break;
            default:
                aaa = document.getElementsByTagName(selector)[0];
                break;
        }
    } else {
        var arr = selector.split(/\s+/);
        var arr0 = $(arr[0]);
        var a = arr[1].slice(0, 1);
        var b = arr[1].slice(1);
        switch (a) {
            case "#":
                aaa = arr0.getElementById(b);
                break;
            case ".":
                aaa = arr0.getElementsByClassName(b)[0];
                break;
            case "[":
                var all = arr0.getElementById("*");
                for (var i = 0; i < all.length; i++) {
                    if (all[i].getAttribute(selector.slice(1, -1) !== null)) {
                        aaa = all[i];
                    }
                }
                break;
            default:
                aaa = arr0.getElementsByTagName(selector)[0];
                break;
        }
    }
    console.log(aaa)
    return aaa;
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象



// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element.addEventListener(event, listener);
}
// 例如：
function clicklistener(event) {

}
function aaaa() {
    console.log(1)
}

addEvent($("#adom"), "click", aaaa);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener("click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            listener;
        }
    });
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    element.getElementsByTagName(tag).addEventListener(eventName, listener);
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate($("#list"), "li", "click", clickHandle);

$.on = (selector, event, listener) => {
    $(selector).addEventListener(event, listener)
}

$.click = (selector, listener) => {
    $(selector).addEventListener("click", listener)
}

$.un = (selector, event, listener) => {
    $(selector).removeEventListener(event, listener)
}

$.delegate = (selector, tag, event, listener) => {
    $(selector).getElementsByTagName(tag).addEventListener(event, listener)
}

// 使用示例：
$.click("[data-log]", logListener);
$.delegate('#list', "li", "click", liClicker);


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    if (window.navigator.userAgent.indexOf("MSIE") === -1) {
        return -1
    } else {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;
        }
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    document.cookie = `${cookieName}=${cookieValue};expires=${expiredays}`;
}

// 获取cookie值
function getCookie(cookieName) {
    var name = cookieName + "=";
    var cook=decodeURIComponent(document.cookie);
    var arr=cook.split(";");
    for(var i=0;i<arr.length;i++){
        if(arr[i].indexOf(name)!==-1){
            return arr[i].slice(name.length,arr[i].length)
        }
    }
    return "";
}

// 
function ajax(url, options) {
    if(!options.type) options.type="GET";
    var item;
    if(!options.data)return false;
    if(!options.data instanceof Object){
        var a=options.data.split("&");
        item=a[0]+"="+a[1];
    }else{
        item=options.data.name+"="+options.data.password;
    }
    var xmlh=new XMLHttpRequest();
    xmlh.onreadystatechange=function(){
        if(xmlh.readyState==4&&xmlh.status==200){
            options.onsuccess(xmlh.responseText)
        }
    }
    xmlh.onerror=function(){
        options.onfail(xmlh);
    }
    if(options.type=="GET"){
        xmlh.open(options.type,url+"?"+item,true);
        xmlh.send();
    }else{
        xmlh.open(options.type,url,true);
        xmlh.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlh.send(item);
    }
    return xmlh;
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
*/

/*第一阶段

在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。

当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。*/
function show(){
    var text=document.getElementById("hobby");
    var arr=[];
    var textsplit=text.value.split(",");
    for(var i=0;i<textsplit.length;i++){
        if(arr.indexOf(textsplit[i])===-1){
            if(textsplit[i].search(/\s+/)===-1){
                arr.push(textsplit[i]);
            }
        }
    }
    var ele=document.createElement("p");
    ele.innerHTML=arr;
    document.body.appendChild(ele);
}
var but1=document.getElementById("but1");
but1.onclick=show;
/*
function show2(){
    var text=document.getElementById("hobby2");
    var arr=[];
    var textsplit=text.value.split(/[\n,\s,\,,\、,\;,\，]/);
    for(var i=0;i<textsplit.length;i++){
        if(arr.indexOf(textsplit[i])===-1){
            if(textsplit[i].search(/\s+/)===-1){
                arr.push(textsplit[i]);
            }
        }
    }
    var ele=document.createElement("p");
    ele.innerHTML=arr;
    document.body.appendChild(ele);
}
var but2=document.getElementById("but2");
but2.onclick=show2;
*/

function show2(){
    var text=document.getElementById("hobby2");
    var textsplit=text.value.split(/[\n,\s,\,,\、,\;,\，]/);
    var span1=document.getElementById("span1");
    var arr=[];
    span1.style.color="red";
    if(textsplit.length>10||textsplit[0]==""){
        span1.style.visibility="visible";
        return false;
    }else{
        span1.style.visibility="hidden";
    }
    for(var i=0;i<textsplit.length;i++){
        if(arr.indexOf(textsplit[i])===-1){
            if(textsplit[i].search(/\s+/)===-1&&textsplit[i]!==""){
                var ele=document.createElement("input");
                ele.setAttribute("type","checkbox");
                var label=document.createElement("label");
                label.innerHTML=textsplit[i];
                document.body.appendChild(label);
                document.body.insertBefore(ele,label);
                arr.push(textsplit[i]);
            }
        }
    }
    console.log(arr)
}
var but2=document.getElementById("but2");
but2.onclick=show2;


