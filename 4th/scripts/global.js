//常用方法
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = () => {
            oldonload();
            func();
        }
    }
}
//分割线--------------------------------------------------------
/*
//功能部分
//储存数据在localstorage
function saveTask() {
    var text = document.getElementById("header").getElementsByTagName("input")[0];
    if (!!text.value) {
        var obj = {
            todo: "",
            done: false
        };
        obj.todo = text.value;
        Task.push(obj);
        addData(Task);
        addLi();
    }
    text.value = "";
    text.focus();
}
//添加localstorage函数
function addData(value) {
    localStorage.setItem("obj", JSON.stringify(value));
}
//读取localstorage函数
function loadData() {
    var data = localStorage.getItem("obj");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
//添加任务函数
function addLi() {
    var todoList = document.getElementById("todoList");
    var doneList = document.getElementById("doneList");
    var countTask = document.getElementById("body1").getElementsByTagName("input")[0];
    var countDone = document.getElementById("body2").getElementsByTagName("input")[0];
    var countT = 0;
    var countD = 0;
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    Task = loadData();
    if (Task) {
        for (let i = 0; i < Task.length; i++) {
            if (!Task[i].done) {
                var li = document.createElement("li");
                var checkbox = document.createElement('input');
                var text = document.createElement('input');
                var button = document.createElement('input');
                checkbox.setAttribute("type", "checkbox");
                text.setAttribute("type", "text");
                button.setAttribute("type", "button");
                button.setAttribute("value", "-");
                text.value = Task[i].todo;
                text.onblur = function () {
                    changeText(i, this);
                }
                checkbox.onchange = ()=> {
                    update(i, "done", true);
                }
                button.onclick = ()=> {
                    removeLi(i);
                }
                li.appendChild(checkbox);
                li.appendChild(text);
                li.appendChild(button);
                li.setAttribute("class", "li");
                todoList.appendChild(li);
                countT++;
            } else {
                var li = document.createElement("li");
                var checkbox = document.createElement('input');
                var text = document.createElement('input');
                var button = document.createElement('input');
                checkbox.setAttribute("type", "checkbox");
                text.setAttribute("type", "text");
                button.setAttribute("type", "button");
                button.setAttribute("value", "-");
                checkbox.checked = Task[i].done;
                text.value = Task[i].todo;
                text.onblur = function () {
                    changeText(i, this);
                }
                checkbox.onchange = ()=> {
                    update(i, "done", false);
                }
                button.onclick = ()=> {
                    removeLi(i);
                }
                li.appendChild(checkbox);
                li.appendChild(text);
                li.appendChild(button);
                li.setAttribute("class", "li");
                doneList.appendChild(li);
                countD++;
            }
        }
    } else {
        todoList.innerHTML = "";
        doneList.innerHTML = "";
        countTask.value = 0;
        countDone.value = 0;
    }
    countTask.value = countT;
    countDone.value = countD;
}
function changeText(i, v, e) {
    var text = v.value;
    function change() {
        if (!text) {
            alert("内容不能为空");
        } else {
            update(i, "todo", text);
        }
    }
    change();
}
function update(i, name, value) {
    Task[i][name] = value;
    addData(Task);
    addLi();
}
function removeLi(i) {
    Task.splice(i, 1);
    addData(Task);
    addLi();
}
function clearData() {
    var b1 = document.getElementById("b1");
    b1.onclick = ()=> {
        localStorage.clear();
    }
}
function onloads() {
    var button = document.getElementById("header").getElementsByTagName("input")[1];
    var button2 = document.getElementById("header").getElementsByTagName("input")[0];
    button.onclick = saveTask;
    button2.onkeypress = function (e) {
        if (e.keyCode == 13) {
            saveTask();
        }
    }
}
window.onload=addLi;
addLoadEvent(clearData);
addLoadEvent(onloads);
*/
function saveTask() {
    if (!!$("#header input[type=text]").val()) {
        var obj = {
            todo: "",
            done: false
        };
        obj.todo = $("#header input[type=text]").val();
        Task.push(obj);
        addData(Task);
        addLi();
    }
    $("#header input[type=text]").val("");
    $("#header input[type=text]").focus();
}
//添加localstorage函数
function addData(value) {
    localStorage.setItem("obj", JSON.stringify(value));
}
//读取localstorage函数
function loadData() {
    var data = localStorage.getItem("obj");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
//添加任务函数
//利用遍历的i进行函数调用
function addLi() {
    var countT = 0;
    var countD = 0;
    //先初始化页面
    $("#todoList").html("");
    $("#doneList").html("");
    Task = loadData();
    if (Task) {
        for (let i = 0; i < Task.length; i++) {
            //根据done属性分别创建任务
            if (!Task[i].done) {
                var checkbox = $("<input>").attr("type", "checkbox");
                var text = $("<input>").attr("type", "text");
                var button = $("<input>").attr({ "type": "button", "value": "-" });
                var li = $("<li></li>").attr("class", "li").append(checkbox, text, button);
                text.val(Task[i].todo);
                //i绑定在changetext函数
                text.blur(function () {
                    changeText(i, this);
                });
                //i绑定
                checkbox.change(() => {
                    //checkbox变更只有两种属性true false
                    //变更则直接改为另一个属性即可
                    update(i, "done", true);
                });
                button.click(() => {
                    removeLi(i);
                });
                $("#todoList").append(li);
                //计数器
                countT++;
            } else {
                //checkbox更新checked属性为true
                var checkbox = $("<input>").attr({ "type": "checkbox", "checked": true });
                var text = $("<input>").attr("type", "text");
                var button = $("<input>").attr({ "type": "button", "value": "-" });
                var li = $("<li></li>").attr("class", "li").append(checkbox, text, button);
                text.val(Task[i].todo);
                text.blur(function () {
                    changeText(i, this);
                });
                checkbox.change(() => {
                    //checkbox变更只有两种属性true false
                    update(i, "done", false);
                });
                button.click(() => {
                    removeLi(i);
                });
                $("#doneList").append(li);
                //计数器
                countD++;
            }
        }
    } else {
        //若本地内存中没有信息则初始化页面
        $("#todoList").html("");
        $("#doneList").html("");
        $("#body1 p > input").val(0);
        $("#body2 p > input").val(0);
    }
    $("#body1 p > input").val(countT);
    $("#body1 p > input").val(countD);
}
//text内容变动时调用change
function changeText(i, v, e) {
    var text = v.value;
    function change() {
        if (!text) {
            alert("内容不能为空");
        } else {
            update(i, "todo", text);
        }
    }
    change();
}
//更新本地内存且刷新页面内容
function update(i, name, value) {
    Task[i][name] = value;
    addData(Task);
    addLi();
}
//去除任务函数
function removeLi(i) {
    Task.splice(i, 1);
    addData(Task);
    addLi();
}
//给按钮赋予清理内存功能
function clearData() {
    $("#b1").click(() => {
        localStorage.clear();
    });
}
//操作监听
function onloads() {
    $("#header input[type=button]").click(saveTask);
    $("#header input[type=text]").keypress(function (e) {
        if (e.keyCode == 13) {
            saveTask();
        }
    });
}
//加载后立即更新页面
$("window").ready(addLi);
//调用函数
addLoadEvent(clearData);
addLoadEvent(onloads);
//2019.9.11 16.:30初步完成 自行设计逻辑出问题 要解决过于麻烦 
//参考网上逻辑重构完成
//注意遍历参数i的传递和其他函数在遍历过程中的调用
//2019.9.12 添加es6语法 jq版本