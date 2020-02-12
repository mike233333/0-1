//最初版本
/*
//全局变量声明
//content部分
var taskName = document.getElementById("taskName"),
    taskDate = document.getElementById("taskDate"),
    taskContent = document.getElementById("taskContent");
var taskName2 = document.getElementById("taskName2"),
    taskDate2 = document.getElementById("taskDate2"),
    taskContent2 = document.getElementById("taskContent2");
var content = document.getElementById("content"),
    contents = document.getElementById("contents");
var ul1 = document.querySelector(".ul1");
var list = document.getElementById("list");
var list2 = document.getElementById("list2");
//添加任务数据进localstorage函数
function addData(date, value) {
    localStorage.setItem(`${date}`, JSON.stringify(value));
}
//从localstorage读取任务数据
function loadData(value = "默认分类") {
    var data = localStorage.getItem(value);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
//点击完成按键添加任务
function addTask() {
    var arr = [taskDate.value, taskContent.value];
    //判断输入日期是否符合格式
    var reg = /^\d{4}\-\d{2}\-\d{2}$/;
    var name = document.querySelector(".hover").firstChild.nodeValue;
    //判断输入的任务名和内容是否为空 不为空则执行
    if (!arr.includes("")) {
        var hover2 = document.querySelector(".hover2");
        if (taskName.value.length > 10 || !reg.test(taskDate.value)) return false;
        var obj = {
            name: `${taskName.value}`,
            date: `${taskDate.value}`,
            todo: `${taskContent.value}`,
            done: false
        };
        var list = [];
        var date = [];
        //判断此时list2是否有带有class名为hover2的元素 如果有则认为是修改任务 没有则是新增任务
        if (!hover2) {
            //hover2不存在 是新增任务
            if (loadData(taskDate.value + "," + name).length !== 0) {
                //如果当前输入的日期下已有任务 则添加并存入本地储存localstorage
                var list = loadData(taskDate.value + "," + name);
                list.push(obj);
                addData(taskDate.value + "," + name, list);
            } else {
                //若没有则新增日期并存入本地储存
                list.push(obj);
                //name为大类别 负责储存日期 小类别以日期为key储存obj信息
                date = loadData(name);
                date.push(taskDate.value + "," + name);
                addData(taskDate.value + "," + name, list);
                addData(name, date);
            }
        } else {
            //hover2存在 则修改任务
            var dates = hover2.parentNode.previousElementSibling.firstChild.nodeValue;
            var task = loadData(dates + "," + name);
            var li = hover2.parentNode.getElementsByTagName("li");
            //判断修改后的日期是否存在 存在则添加 不存在则新增
            if (loadData(taskDate.value + "," + name).length !== 0) {
                //直接遍历所有li 匹配当前hover2的li
                for (let i = 0; i < li.length; i++) {
                    if (li[i] == hover2) {
                        //匹配到后把该位置的数据去掉
                        task.splice(i, 1);
                        addData(dates + "," + name, task);
                    }
                }
                //储存变动的任务 因为不是新增日期所以无需更新name信息
                list = loadData(taskDate.value + "," + name);
                list.push(obj);
                addData(taskDate.value + "," + name, list);
                //若变动后原日期任务为空 则去除
                if (loadData(dates + "," + name).length == 0) {
                    date = loadData(name);
                    date.splice(date.indexOf(dates + "," + name), 1);
                    addData(name, date);
                }
            } else {
                //逻辑同上
                for (let i = 0; i < li.length; i++) {
                    if (li[i] == hover2) {
                        task.splice(i, 1);
                        addData(dates + "," + name, task);
                    }
                }
                list.push(obj);
                addData(taskDate.value + "," + name, list);
                date = loadData(name);
                date.push(taskDate.value + "," + name);
                if (loadData(dates + "," + name).length == 0) {
                    date.splice(date.indexOf(dates + "," + name), 1);
                }
                date.push(taskDate.value + "," + name);
                addData(name, date);
            }
        }
        addList();
        taskName.value = "";
        taskDate.value = "";
        taskContent.value = "";
        //添加完任务后恢复content界面
        contents.style.display = "none";
        content.style.display = "inherit";
        list2.style.pointerEvents = "";
        ul1.style.pointerEvents = "";
    } else {
        alert("内容不符合规范，请更改");
    }
}
//添加列表函数
function addList() {
    var hover = document.querySelector(".hover");
    var ul = document.getElementsByClassName("ul3")[0];
    ul.innerHTML = "";
    //判断点击input时不触发函数
    if (!hover || hover.nodeName == "INPUT") return false;
    //判断hover是否含有二级目录
    if (hover.nextElementSibling && hover.nextElementSibling.nodeName == "UL") {
        //含有二级目录 要将二级目录的任务一起显示
        var arr = [];
        var arr2 = [];
        var inner = "";
        var li = hover.nextElementSibling.getElementsByTagName("li");
        arr.push(hover);
        Array.prototype.slice.call(li).forEach(function (item) {
            arr.push(item);
        });
        arr.forEach(function (item) {
            date = loadData(item.firstChild.nodeValue);
            date.sort();
            if (date) {
                arr2.push(...date);
            }
        });
        //所有排序
        arr2.sort();
        inner = thing(arr2);
        ul.innerHTML = inner;
        select();
    } else {
        //一级目录
        date = loadData(hover.firstChild.nodeValue);
        date.sort();
        if (date) {
            var inner = thing(date, hover.firstChild.nodeValue);
            ul.innerHTML = inner;
            select();
        } else {
            ul.innerHTML = "";
        }
    }
    //每次变动都改变计数
    showCount();
}
//添加函数过程封装
function thing(date) {
    var ul3 = "";
    for (let i = 0; i < date.length; i++) {
        var task = loadData(date[i]);
        var ul4 = "";
        if (task) {
            //任务代码
            for (let i = 0; i < task.length; i++) {
                if (task[i].done == true) {
                    ul4 += `<li class="donetrue" onclick="showContent(${i})">${task[i].name}</li>`;
                } else {
                    ul4 += `<li onclick="showContent(${i})">${task[i].name}</li>`;
                }
            }
        }
        //在任务代码上加入时间
        if (task.length !== 0) {
            ul3 += `<li>${String(date[i]).split(",")[0]}</li>
            <ul class="ul4">
                ${ul4}
            </ul>`;
        }
    }
    return ul3;
}
//list部分点击任务在从content显示
function showContent(i) {
    //根据hover的元素来读取localstorage的数据
    var hover = document.querySelector(".hover");
    var li = event.target.firstChild.nodeValue;
    var liPar = event.target.parentNode.previousElementSibling.firstChild.nodeValue;
    var hover2 = document.querySelector(".hover2");
    var obj = loadData(liPar + "," + hover.firstChild.nodeValue);
    if (obj.length == 0) {
        var li = hover.nextElementSibling.getElementsByTagName("li");
        Array.prototype.slice.call(li).forEach(function (item) {
            obj2 = loadData(liPar + "," + item.firstChild.nodeValue);
            if (obj2.length !== 0) {
                obj = obj2;
            }
        });
    }
    taskName2.innerHTML = obj[i].name;
    taskDate2.innerHTML = obj[i].date;
    taskContent2.innerHTML = obj[i].todo;
    //点击后当前目标获得class属性hover2 而原来已有hover2的元素则去掉该class
    if (hover2) {
        hover2.classList.remove("hover2");
    }
    event.target.classList.add("hover2");
}
//更新任务完成状态
function update(value) {
    var hover = document.querySelector(".hover");
    var hover2 = document.querySelector(".hover2");
    if (hover2) {
        var conf = confirm("确认要变更任务状态吗");
        if (conf) {
            var date = hover2.parentNode.previousElementSibling.firstChild.nodeValue;
            var task = loadData(date + "," + hover.firstChild.nodeValue);
            var li = hover2.parentNode.getElementsByTagName("li");
            if (task.length == 0) {
                //判断一级目录是否有任务 没有则往下判断二级目录
                var li2 = hover.nextElementSibling.getElementsByTagName("li");
                Array.prototype.slice.call(li2).forEach(function (item) {
                    obj2 = loadData(date + "," + item.firstChild.nodeValue);
                    if (obj2.length !== 0) {
                        //二级目录有任务 则改变此处的完成状态
                        task = obj2;
                        for (let i = 0; i < li.length; i++) {
                            if (li[i] == hover2 && li[i].firstChild.nodeValue == task[i].name) {
                                task[i].done = value;
                                addData(date + "," + item.firstChild.nodeValue, task);
                                addList();
                            }
                            break;
                        }
                    }
                });
            } else {
                //有任务则直接变动
                for (let i = 0; i < li.length; i++) {
                    if (li[i] == hover2) {
                        task[i].done = value;
                        addData(date + "," + hover.firstChild.nodeValue, task);
                        addList();
                    }
                }
            }
        }
    } else {
        alert("请选择要变动的任务");
    }
}
//list1根据任务状态过滤相关任务
function select() {
    var but = document.getElementById("list1").getElementsByTagName("li");
    var hover3 = document.getElementById("list1").querySelector(".hover3");
    //根据判断的不同过滤不同任务
    switch (hover3) {
        //所有 什么都不做
        case but[0]:
            break;
        //未完成 已完成的元素移除
        case but[1]:
            var hover2 = document.querySelector(".ul3").querySelectorAll(".donetrue");
            var ul4 = document.querySelectorAll(".ul4");
            if (hover2) {
                hover2.forEach(function (item) {
                    item.parentNode.removeChild(item);
                });
            }
            ul4.forEach(function (item) {
                if (!item.childNodes[2]) {
                    item.parentNode.removeChild(item.previousElementSibling);
                }
            })
            break;
        //已完成 未完成的元素移除
        case but[2]:
            var ul4 = document.querySelectorAll(".ul4");
            var li = document.querySelectorAll(".ul4 li");
            var hover2 = document.querySelector(".ul3").querySelectorAll(".donetrue");
            var arr = Array.prototype.slice.call(li);
            if (hover2) {
                hover2.forEach(function (item) {
                    var num = arr.indexOf(item);
                    arr.splice(num, 1);
                });
                arr.forEach(function (item) {
                    item.parentNode.removeChild(item);
                });
            } else {
                arr.forEach(function (item) {
                    item.parentNode.removeChild(item);
                });
            }
            ul4.forEach(function (item) {
                if (!item.childNodes[2]) {
                    item.parentNode.removeChild(item.previousElementSibling);
                }
            });
            break;
        default:
            but[0].classList.add("hover3");
            break;
    }

}
//task添加任务 逻辑同content添加 先存数据进localstorage 后读取数据更新页面
function addTask1() {
    //添加几个固定文件夹
    var fix = loadData("分类列表");
    if (fix.length == 0) {
        fix.push("默认分类", "百度ife", "毕业设计", "社团活动", "家庭生活");
    }
    addData("分类列表", fix);
    //新增分类按键
    var addCat = document.getElementById("addCat");
    addCat.onclick = function () {
        var hover = document.querySelector(".hover");
        var obj = [];
        if (!hover) {
            var prom = prompt("请输入要添加的分类名称");
            if (prom) {
                obj = loadData("分类列表");
                obj.push(prom);
                addData("分类列表", obj);
            }
        } else if (hover.firstChild.nodeValue == "默认分类") {
            alert("默认分类无法添加子分类");
        } else {
            if (hover.parentElement.className == "ul2") {
                alert("暂不支持三级目录");
            } else {
                var prom = prompt("请输入要添加的分类名称");
                if (prom) {
                    if (hover.nextElementSibling.nodeName == "UL") {
                        obj = loadData(hover.firstChild.nodeValue + "列表");
                        obj.push(prom);
                        addData(hover.firstChild.nodeValue + "列表", obj);
                    } else {
                        obj.push(prom);
                        addData(hover.firstChild.nodeValue + "列表", obj);
                    }
                }
            }
        }
        loadTask1();
    }
}
//更新task1列表
function loadTask1() {
    var ul1 = document.querySelector(".ul1");
    var task = loadData("分类列表");
    var butt = document.getElementById("task1").getElementsByTagName("input");
    var inner2 = "";
    //读取本地储存并显示
    task.forEach(function (item) {
        var inner1 = "";
        if (loadData(item + "列表").length !== 0) {
            //如果分类下仍有分类的话继续显示二级列表
            var task2 = loadData(item + "列表");
            var inner = "";
            task2.forEach(function (item2) {
                //二级列表的代码
                inner += `<li>${item2}<span></span><input type='button' value='删除'></li>`;
            });
            inner1 = `<ul class='ul2'>
                        ${inner}
                    </ul>`;
        }
        //一级列表代码 后跟二级列表代码
        inner2 += `<li>${item}<span></span><input type='button' value='删除'></li>
                ${inner1}`;
    });
    ul1.innerHTML = inner2;
    //显示完毕后更新计数和按键功能
    butTask();
    showCount();
    for (let i = 0; i < butt.length; i++) {
        butt[i].onclick = deleteTask;
    }
}
//统计未完成任务并显示
function showCount() {
    var span1 = document.querySelectorAll(".ul1>li span");
    var countTask = document.getElementById("countTask");
    var countAll = 0;
    //判断span是否已经在页面中显示
    if (span1.length !== 0) {
        //对每一个span都进行计数
        for (let i = 0; i < span1.length; i++) {
            if (!span1[i].parentElement.nextElementSibling || span1[i].parentElement.nextElementSibling.nodeName !== "UL") {
                //当span所处父元素li不是最后一个元素 或者没有二级列表时执行
                var task = loadData(span1[i].previousSibling.nodeValue);
                var count = 0;
                if (task.length == 0) {
                    //如果没有任务 直接输出0
                    span1[i].innerHTML = `(${count})`;
                } else {
                    //有任务则计数
                    task.forEach(function (item) {
                        var task2 = loadData(item);
                        task2.forEach(function (item2) {
                            if (item2.done == true) {
                                //每有一个完成的任务 计数减一 和下面抵消 等于不计数
                                count--;
                            }
                        })
                        //全部任务数量都计入 因为上面已经减掉了完成的任务
                        count += task2.length;
                    });
                    span1[i].innerHTML = `(${count})`;
                    //次数累计所有未完成任务
                    countAll += count;
                }
            } else {
                //当span父元素有二级列表时
                var task = loadData(span1[i].previousSibling.nodeValue);
                var count = 0;
                var li = span1[i].parentElement.nextElementSibling.getElementsByTagName("li");
                //下面逻辑同上
                for (let i = 0; i < li.length; i++) {
                    var task1 = loadData(li[i].firstChild.nodeValue);
                    var count2 = 0;
                    task1.forEach(function (item) {
                        var task2 = loadData(item);
                        task2.forEach(function (item2) {
                            if (item2.done == true) {
                                count--;
                                count2--;
                            }
                        })
                        count += task2.length;
                        count2 += task2.length;
                    });
                    li[i].firstElementChild.innerHTML = `(${count2})`;
                }
                task.forEach(function (item3) {
                    var task3 = loadData(item3);
                    task3.forEach(function (item4) {
                        if (item4.done == true) {
                            count--;
                        }
                    });
                });
                count += task.length;
                span1[i].innerHTML = `(${count})`;
                countAll += count;
            }
        }
    }
    //最后更新所有未完成任务计数
    countTask.innerHTML = `(${countAll})`;
}
//按键功能
function but() {
    var button = document.getElementById("addTask");
    var button2 = document.getElementById("content1").getElementsByTagName("input")[1],
        button3 = document.getElementById("content1").getElementsByTagName("input")[2];
    var complete = document.getElementById("content2").getElementsByTagName("input")[1],
        completeCancel = document.getElementById("content2").getElementsByTagName("input")[2],
        edit = document.getElementById("content2").getElementsByTagName("input")[0];
    var list1But = document.getElementById("list1").getElementsByTagName("li");
    //新增任务
    button.onclick = function () {
        var hover = document.querySelector(".hover");
        if (hover) {
            var hover2 = document.querySelector(".hover2");
            if (hover2) {
                hover2.classList.remove("hover2");
            }
            list2.style.pointerEvents = "none";
            ul1.style.pointerEvents = "none";
            taskName2.innerHTML = "";
            taskDate2.innerHTML = "";
            taskContent2.innerHTML = "";
            content.style.display = "none";
            contents.style.display = "inherit";
        } else {
            alert("请选择需要添加任务的分类");
        }
    }
    //新增分类
    //点击空白处取消元素里的hover
    var task1 = document.getElementById("task1");
    task1.onclick = function () {
        if (event.target == this) {
            var hover = document.querySelector(".hover");
            if (hover) {
                hover.classList.remove("hover");
            }
            list.style.pointerEvents = "none";
            content.style.pointerEvents = "none";
        }
    }
    //若页面没有hover 则将默认分类改为hover
    var hover = document.querySelector(".hover");
    if (!hover) {
        var defaultTask = document.querySelector(".ul1").firstElementChild;
        defaultTask.classList.add("hover");
    }
    //list1根据任务状态过滤相关任务后显示
    for (let i = 0; i < list1But.length; i++) {
        list1But[i].onclick = function () {
            var hover3 = document.getElementById("list1").querySelector(".hover3");
            if (hover3) {
                hover3.classList.remove("hover3");
            }
            event.target.classList.add("hover3");
            addList();
        }
    }
    //contents编辑界面
    //确认键
    button3.onclick = addTask;
    //取消键
    button2.onclick = function () {
        //直接清空并返回content界面
        var hover2 = document.querySelector(".hover2");
        if (hover2) {
            hover2.classList.remove("hover2");
        }
        taskName.value = "";
        taskDate.value = "";
        taskContent.value = "";
        contents.style.display = "none";
        content.style.display = "inherit";
        list2.style.pointerEvents = "";
        ul1.style.pointerEvents = "";
    };
    //content任务界面
    //点击完成任务按钮 更新本地内存done属性 并刷新页面
    //确认 取消确认键
    complete.onclick = function () {
        update(true);
    }
    completeCancel.onclick = function () {
        update(false);
    }
    //编辑键
    edit.onclick = function () {
        var hover2 = document.querySelector(".hover2");
        if (!hover2) {
            alert("请选择需要编辑的任务");
            return false;
        }
        list2.style.pointerEvents = "none";
        ul1.style.pointerEvents = "none";
        taskName.value = taskName2.innerHTML;
        taskDate.value = taskDate2.innerHTML;
        taskContent.value = taskContent2.innerHTML;
        content.style.display = "none";
        contents.style.display = "inherit";
        taskName2.innerHTML = "";
        taskDate2.innerHTML = "";
        taskContent2.innerHTML = "";
    }
}
//task列表按键
function butTask() {
    var task = document.querySelector(".ul1").getElementsByTagName("li");
    for (let i = 0; i < task.length; i++) {
        task[i].onclick = function () {
            var hover = document.querySelector(".hover");
            if (hover) {
                hover.classList.remove("hover");
            }
            event.target.classList.add("hover");
            if (this.nextElementSibling && this.nextElementSibling.nodeName == "UL") {
                if (this.nextElementSibling.style.display == "none") {
                    this.nextElementSibling.style.display = "block";
                } else {
                    this.nextElementSibling.style.display = "none";
                }
            }
            list.style.pointerEvents = "";
            content.style.pointerEvents = "";
            addList();
        }
    }
}
//删除任务按键
function deleteTask() {
    var li = event.target.parentElement;
    var task = loadData(li.firstChild.nodeValue);
    //默认分类不可删除
    if (li.firstChild.nodeValue == "默认分类") {
        alert("默认分类不可删除");
        return false;
    }
    //点击的所选任务删除自己包含任务的本地储存
    task.forEach(function (item) {
        localStorage.removeItem(item);
    });
    //删除自己的目录
    localStorage.removeItem(li.firstChild.nodeValue);
    //判断是否有二级列表
    if (li.nextElementSibling && li.nextElementSibling.nodeName == "UL") {
        //二级列表的数据也请除
        var li2 = li.nextElementSibling.getElementsByTagName("li");
        for (let i = 0; i < li2.length; i++) {
            var task2 = loadData(li2[i].firstChild.nodeValue);
            task2.forEach(function (item2) {
                localStorage.removeItem(item2);
            });
            localStorage.removeItem(li2[i].firstChild.nodeValue);
        }
        //清除所属的二级列表
        localStorage.removeItem(li.firstChild.nodeValue + "列表");
    }
    //判断是否一级目录
    if (li.parentElement.className == "ul1") {
        //是则从分类列表中删除本地数据
        var task3 = loadData("分类列表");
        task3.splice(task3.indexOf(li.firstChild.nodeValue), 1);
        addData("分类列表", task3);
    } else {
        //否则从一级目录列表中删除二级列表数据
        var task3 = loadData(li.parentElement.previousElementSibling.firstChild.nodeValue + "列表");
        task3.splice(task3.indexOf(li.firstChild.nodeValue), 1);
        addData(li.parentElement.previousElementSibling.firstChild.nodeValue + "列表", task3);
    }
    loadTask1();
}
addList();
addTask1();
loadTask1();
but();
//2019.10.1 开始编写
//2019.10.4 task类别菜单功能等待编写
//2019.10.5 task二级目录计数等待编写 任务计数需要改为未完成任务
//2019.10.6 总计耗时六天 初步结束 代码写得太多了 要改动会牵动很多东西 非常的头疼
*/
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//实在看不下去了所以参考网上的思路重写一个
//建立对象以及方法进行模块化设计
/*
//开始于2019.10.11
//全局声明
var task = document.getElementById("task");
var list = document.getElementById("list");
var taskName = document.getElementById("taskName");
var taskDate = document.getElementById("taskDate");
var taskContent = document.getElementById("taskContent");
var taskName2 = document.getElementById("taskName2");
var taskDate2 = document.getElementById("taskDate2");
var taskContent2 = document.getElementById("taskContent2");
var content = document.querySelector("#content");
var contents = document.querySelector("#contents");
//查看localstorage是否有数据
if (localStorage.allData) {
    var json = JSON.parse(localStorage.allData);
} else {
    //没有则添加默认数据
    //确定默认分类
    var json = [
        //默认分类 id设为0
        {
            id: 0,
            catName: "默认分类",
            //task为目录下的任务
            task: [
                //任务1
                {
                    taskId: 0,
                    title: "默认分类示例",
                    time: "1970-01-01",
                    done: true,
                    content: "任务内容"
                },
                //若还有任务 接下来的是任务2
            ],
            //list为目录下的子分类 默认分类不可有子分类 故为空
            list: []
        }
        //接下来是后面可以新添加的分类
    ];
    localStorage.allData = JSON.stringify(json);
}
//List对象 负责添加输入数据并调用data对象
//默认数据
function List() {
    this.setting = {
        title: "默认分类",
        type: null
    };
}
//判断当前选取的父目录名称并且反映在prom上
List.prototype.setTask = function (obj) {
    thing(this.setting, obj);
}
//扩展函数 用于覆盖默认配置
function thing(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
}
//弹窗输入名字 添加分类
List.prototype.create = function () {
    var prom = prompt(`请输入要添加的分类名称\n父目录为：${this.setting.title}`);
    var idName = data1.catId
    if (!prom||prom.search(/[\<\>]/)!==-1){
        alert("分类名不符合格式");
        return false;
    };
    var obj = {
        catName: prom,
        id: Date.parse(new Date()),
        task: [],
        list: []
    }
    data1.addCat(idName, obj);
    data1.setList(".ul1");
    data1.setListener();
}
//Date对象 负责添加元素进页面
function Data(data) {
    this.data = data;
}
//添加分类保存
Data.prototype.addCat = function (id, cat) {
    //注意此处对象赋值 为直接赋予引用对象 两者都是相关联的
    var data = this.data;
    var arr = [];
    //下面arr与data添加关联
    if (!id) {
        arr = data;
    } else {
        (function find(id2, data2) {
            for (let i = 0; i < data2.length; i++) {
                if (data2[i].id == id2) {
                    arr = data2[i].list;
                }
                if (data2[i].list.length !== 0) {
                    find(id2, data2[i].list);
                }
            }
        })(id, data);
    }
    //因为两者关联 所以变动arr就等于变动data
    arr.push(cat);
}
//保存data-id的值
Data.prototype.setCatId = function (id) {
    this.catId = id;
}
//保存task-id的值
Data.prototype.setTaskId = function (id) {
    this.taskId = id;
}
//提供对象并在页面渲染分类数据
Data.prototype.setList = function (seletor) {
    var result = "";
    var ele = document.querySelector(seletor);
    (function getTree(data2) {
        var obj = data2;
        for (let i = 0; i < obj.length; i++) {
            var str = "";
            if (obj == this.data) {
                str = `<li>
                            <h1><input type='button' value='X'><a data-id='${obj[i].id}'>${obj[i].catName}<span></span></a></h1>`;
            } else {
                str = `<li>
                            <h2><input type='button' value='X'><a data-id='${obj[i].id}'>${obj[i].catName}<span></span></a></h2>`;
            }
            result += str;
            if (obj[i].list.length !== 0) {
                result += "<ul class='ul2'>";
                getTree(obj[i].list);
                result += "</ul></li>"
            } else {
                result += "</li>";
            }
        }
    })(this.data);
    ele.innerHTML = result;
}
//点击根据id删除分类
Data.prototype.delCat = function (id) {
    if (id == 0) return false;
    var arr = [];
    var obj = {};
    //从头开始遍历直到找到与输入id相同的任务
    (function find(id2, data2) {
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].id == id2) {
                arr = data2;
                obj = data2[i];
            }
            //如果没找到则向下一层继续找
            if (data2[i].list.length !== 0) {
                find(id2, data2[i].list);
            }
        }
    }(id, this.data));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == obj) {
            arr.splice(i, 1);
        }
    }
    //删除后更新页面并添加监听
    data1.setList(".ul1");
    data1.setListener();
    data1.setCatId(null);
}
//提供对象并根据其内部数据渲染已有任务
Data.prototype.setTask = function (selector) {
    var ele = document.querySelector(selector);
    //先清空页面
    ele.innerHTML = "";
    var catId = this.catId;
    var data = [];
    (function find(id2, data2) {
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].id == id2) {
                data = data2[i].task;
            }
            if (data2[i].list.length !== 0) {
                find(id2, data2[i].list);
            }
        }
    }(catId, this.data));
    this.taskArr = data;
    var arr = [];
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = `<input type='button' value='X'><a>${data[i].title}</a>`;
            li.setAttribute("task-id", data[i].taskId);
            li.onclick = function () {
                if (document.querySelector(".hover2")) {
                    document.querySelector(".hover2").classList.remove("hover2");
                }
                this.classList.add("hover2");
                data1.setTaskId(this.getAttribute("task-id"));
                data1.showTask("#content");
            }
            //删除按钮
            li.firstElementChild.onclick = function () {
                data1.delTask(catId, this.parentElement.getAttribute("task-id"));
            }
            if (data[i].done == true) {
                li.classList.add("donetrue");
            }
            //用于判断是否需要新建ul
            var value = true;
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].getAttribute("data-time") == data[i].time) {
                    arr[j].appendChild(li);
                    value = false;
                    break;
                }
            }
            //若日期不存在则新建ul
            if (value) {
                var ul = document.createElement("ul");
                ul.classList.add("ul3");
                ul.innerHTML = `<span>${data[i].time}</span>`;
                ul.setAttribute("data-time", data[i].time);
                ul.appendChild(li);
                arr.push(ul);
            }
        }
        arr.sort(function (a, b) {
            //取得arr内所有对象的日期并从小到大排序
            var first = a.firstElementChild.innerHTML.replace(/-/g, "");
            var second = b.firstElementChild.innerHTML.replace(/-/g, "");
            return first - second;
        });
        arr.forEach(function (item) {
            ele.appendChild(item);
        });
    } else {
        ele.innerHTML = "该分类下没有任务";
    }
}
//新建任务并添加进json数据
Data.prototype.addTask = function (id, obj) {
    var data = this.data;
    var arr = [];
    (function find(id2, data2) {
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].id == id2) {
                arr = data2[i].task;
            }
            if (data2[i].list.length !== 0) {
                find(id2, data2[i].list);
            }
        }
    }(id, data));
    arr.push(obj);
}
//点击任务显示任务详细
Data.prototype.showTask = function (selector) {
    var ele = document.querySelector(selector);
    var catId = data1.catId;
    var taskId = data1.taskId;
    var arr = [];
    (function find(id2, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id2) {
                arr = data[i].task;
            }
            if (data[i].list.length !== 0) {
                find(id2, data[i].list);
            }
        }
    }(catId, this.data));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].taskId == taskId) {
            ele.querySelector("#taskName2").innerHTML = arr[i].title;
            ele.querySelector("#taskDate2").innerHTML = arr[i].time;
            ele.querySelector("#taskContent2").innerHTML = arr[i].content;
        }
    }
}
//更新当前所选任务
Data.prototype.changeTask = function (id, id2, obj) {
    var data = this.data;
    var arr = [];
    (function find(id, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                arr = data[i].task;
            }
            if (data[i].list.length !== 0) {
                find(id, data[i].list);
            }
        }
    }(id, data));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].taskId == id2) {
            for (var j in arr[i]) {
                //如果传入的obj存在该属性且和原来的不一样则替换
                obj[j] && obj[j] !== arr[i][j] ? arr[i][j] = obj[j] : null;
                //完成状态需要单独判断 否则true和false值会扰乱判断
                typeof obj[j] == "boolean" && obj[j] !== arr[i][j] ? arr[i][j] = obj[j] : null;
            }
        }
    }
    data1.setTask("#list2");
    data1.setListener();
    //当任务变动时跳回所有任务防止逻辑错误
    document.querySelector(".hover3").classList.remove("hover3");
    listLi[0].classList.add("hover3");
}
//点击根据id删除任务
Data.prototype.delTask = function (id, id2) {
    if (id2 == 0) return false;
    var arr = [];
    //找到所属分类存进arr
    (function find(id, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                arr = data[i].task;
            }
            if (data[i].list.length !== 0) {
                find(id, data[i].list);
            }
        }
    }(id, this.data));
    //在arr内按id寻找目标任务
    for (let i = 0; i < arr.length; i++) {
        arr[i].taskId == id2 ? arr.splice(i, 1) : null;
    }
    data1.setTask("#list2");
    data1.setListener();
    data1.setTaskId(null);
}
//给添加的目录增加事件监听
Data.prototype.setListener = function () {
    var ul1 = document.querySelector(".ul1");
    ul1.querySelectorAll("a").forEach(function (item) {
        item.onclick = function () {
            if (document.querySelector(".hover")) {
                document.querySelector(".hover").classList.remove("hover");
            }
            var ul2 = item.parentElement.parentElement.querySelector(".ul2");
            if (ul2) {
                ul2.style.display == "none" ? ul2.style.display = "block" : ul2.style.display = "none";
            }
            item.classList.add("hover");
            //点击后获得当前的data-id值并保存
            data1.setCatId(this.getAttribute("data-id"));
            data1.setTask("#list2");
            var li = document.querySelectorAll("#list2 li");
            li.forEach(function (item) {
                item.onclick = function () {
                    if (document.querySelector(".hover2")) {
                        document.querySelector(".hover2").classList.remove("hover2");
                    }
                    item.classList.add("hover2");
                    data1.setTaskId(this.getAttribute("task-id"));
                    data1.showTask("#content");
                }
            });
        }
        //删除按键点击后运行dalcat删除该分类
        item.previousElementSibling.onclick = function () {
            data1.delCat(item.getAttribute("data-id"));
        }
    });
    var task1 = document.getElementById("task1");
    task1.onclick = function () {
        if (event.target == this) {
            if (document.querySelector(".hover")) {
                document.querySelector(".hover").classList.remove("hover");
            }
            data1.setCatId(null);
            data1.setTask("#list2");
            reset(0);
        }
    }
    //全部添加完后计算任务数量并显示
    data1.showCount();
    //若加载页面时只有默认分类存在 则自动点击默认分类一次 然后点击默认分类一次
    if (document.querySelectorAll(".ul1 a").length == 1) {
        document.querySelector(".hover") ? null : document.querySelector(".ul1 a").click();
        if (document.querySelectorAll(".ul3 li").length == 1) {
            document.querySelector(".ul3 li").click();
        }
    }
}
//list1过滤任务显示 常驻功能无需添加入对象原型
var selectTask = function (selector, value) {
    var ele = document.querySelector(selector);
    //先清空页面
    var li = ele.querySelectorAll("li");
    var li2 = ele.querySelectorAll(".donetrue");
    switch (value) {
        case "所有":
            li.forEach(function (item) {
                item.style.display = "block";
            });
            break;
        case "未完成":
            li.forEach(function (item) {
                item.style.display = "block";
            });
            li2.forEach(function (item) {
                item.style.display = "none";
            });
            break;
        case "已完成":
            li.forEach(function (item) {
                item.style.display = "none";
            });
            li2.forEach(function (item) {
                item.style.display = "block";
            });
            break;
    }
}
//计算分类下所有未完成任务并且显示
Data.prototype.showCount = function () {
    var a = document.querySelectorAll(".ul1 a");
    var data = this.data;
    var countTask = document.getElementById("countTask");
    var countAll = 0;
    a.forEach(function (item) {
        var count = 0;
        var obj = {};
        (function find(id, data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    obj = data[i];
                    (function add(obj) {
                        for (let i = 0; i < obj.task.length; i++) {
                            obj.task[i].done == 0 ? count++ : null;
                        }
                        for (let i = 0; i < obj.list.length; i++) {
                            add(obj.list[i]);
                        }
                    }(obj));
                }
                if (data[i].list.length !== 0) {
                    find(id, data[i].list);
                }
            }
        }(item.getAttribute("data-id"), data));
        item.firstElementChild.innerHTML = `(${count})`;
        countAll += count;
    });
    countTask.innerHTML = `(${countAll})`;
}
//按键监听
//新建分类
var addCat = document.getElementById("addCat");
addCat.onclick = function () {
    if (document.querySelector(".hover") && document.querySelector(".hover").childNodes[0].nodeValue == "默认分类") return false;
    //开始先声明对象
    var allList = new List();
    allList.setTask({
        //判断当前是否有hover状态的目录 有则提取innertext 没有则为一级目录
        title: document.querySelector(".hover") ? document.querySelector(".hover").innerText : "无",
        type: "newCat"
    });
    allList.create();
}
//新建任务
var addTask = document.getElementById("addTask");
//点击之后判断是否已选分类 确认后负责跳转编辑页面
addTask.onclick = function () {
    var catId = data1.catId;
    if (document.querySelector(".hover2")) {
        document.querySelector(".hover2").classList.remove("hover2");
    }
    if (catId) {
        reset(0, 0);
        //新建任务时无法点击分类列表或任务列表
        task.style.pointerEvents = "none";
        list.style.pointerEvents = "none";
    }
}
//新建任务后的取消按钮
var quit = document.querySelector("#contents input[value='取消']");
quit.onclick = function () {
    reset(1, 0);
    //恢复列表可点击状态
    task.style.pointerEvents = "";
    list.style.pointerEvents = "";
}
//新建任务的确认
var deter = document.querySelector("#contents input[value='确认']");
deter.onclick = function () {
    var taskName = document.getElementById("taskName");
    var taskDate = document.getElementById("taskDate");
    var taskContent = document.getElementById("taskContent");
    var catId = data1.catId;
    var taskId = data1.taskId;
    //判断输入信息是否存在且符合规定
    if (taskName.value.length == 0 || taskName.value.length > 10 || taskDate.value.search(/^\d{4}\-\d{2}\-\d{2}$/) == -1 || taskContent.value.length == 0) return false;
    if(taskName.value.search(/[\<\>]/)||taskContent.value.search(/[\<\>]/)!==-1)return false;
    if (!document.querySelector(".hover2")) {
        var obj = {
            taskId: Date.parse(new Date()),
            title: taskName.value,
            time: taskDate.value,
            done: false,
            content: taskContent.value
        }
        data1.addTask(catId, obj);
        data1.setTask("#list2");
        data1.setListener();
    } else {
        var obj = {
            title: taskName.value,
            time: taskDate.value,
            content: taskContent.value
        }
        data1.changeTask(catId, taskId, obj);
        reset(0);
    }
    reset(1, 0);
    task.style.pointerEvents = "";
    list.style.pointerEvents = "";
}
//contents界面 取消完成 完成 编辑按钮
var quitComp = document.querySelector("#content input[value='取消完成']");
var complete = document.querySelector("#content input[value='完成']");
var edit = document.querySelector("#content input[value='编辑']");
[quitComp, complete, edit].forEach(function (item) {
    item.onclick = function () {
        if (document.querySelector(".hover") && document.querySelector(".hover2")) {
            fliter(this);
        }
    }
})
//更新数据辅助函数
function fliter(obj) {
    var value = obj.value;
    var catId = data1.catId;
    var taskId = data1.taskId;
    switch (value) {
        case "取消完成":
            var obj = {
                done: false
            }
            data1.changeTask(catId, taskId, obj);
            break;
        case "完成":
            var obj = {
                done: true
            }
            data1.changeTask(catId, taskId, obj);
            break;
        case "编辑":
            if (data1.taskId == 0) return false;
            taskName.value = taskName2.innerHTML;
            taskDate.value = taskDate2.innerHTML;
            taskContent.value = taskContent2.innerHTML;
            content.style.display = "none";
            contents.style.display = "block";
            task.style.pointerEvents = "none";
            list.style.pointerEvents = "none";
            break;
    }
}
//清空任务数据函数
function reset(value, value2 = 1) {
    //两个参数 参数一判断id并且刷新 参数二判断是否需要切换页面
    if (value == 0) {
        [taskName2, taskDate2, taskContent2].forEach(function (item) {
            item.innerHTML = "";
        });
        if (value2 == 0) {
            content.style.display = "none";
            contents.style.display = "block";
        }
    } else {
        [taskName, taskDate, taskContent].forEach(function (item) {
            item.value = "";
        });
        if (value2 == 0) {
            contents.style.display = "none";
            content.style.display = "block";
        }
    }
}
var listLi = document.querySelectorAll("#list1 li");
//加载时默认为显示所有任务
listLi[0].classList.add("hover3");
listLi.forEach(function (item) {
    item.onclick = function () {
        if (document.querySelector(".hover3")) {
            document.querySelector(".hover3").classList.remove("hover3");
        }
        item.classList.add("hover3");
        selectTask("#list2", item.firstChild.nodeValue);
    }
});
var data1 = new Data(json);
data1.setList(".ul1");
data1.setListener();
//最后页面刷新或关闭时保存data数据进localstroage
window.onunload = function () {
    localStorage.allData = JSON.stringify(data1.data);
}
//2019.10.19 目前写到取消完成任务按钮 编辑按钮有待修改补全
//2019.10.22 初步完成
//2019.10.23 稍作修改 添加任务计数功能

*/
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------
//分割线-------------------------------------------------------------------------------------------------------------------------------

//2019.11.1 进行es6模块化
//根据建立的两个对象多分出两个模块list和data
//两个模块不设置default导出的话 import后的变量必须加大括号
//另外引入模块似乎必须带js模块文件的后缀名
import {List} from "./list.js";
import {Data} from "./data.js";
//全局声明
var task = document.getElementById("task");
var list = document.getElementById("list");
var taskName = document.getElementById("taskName");
var taskDate = document.getElementById("taskDate");
var taskContent = document.getElementById("taskContent");
var taskName2 = document.getElementById("taskName2");
var taskDate2 = document.getElementById("taskDate2");
var taskContent2 = document.getElementById("taskContent2");
var content = document.querySelector("#content");
var contents = document.querySelector("#contents");
//查看localstorage是否有数据
if (localStorage.allData) {
    var json = JSON.parse(localStorage.allData);
} else {
    //没有则添加默认数据
    //确定默认分类
    var json = [
        //默认分类 id设为0
        {
            id: 0,
            catName: "默认分类",
            //task为目录下的任务
            task: [
                //任务1
                {
                    taskId: 0,
                    title: "默认分类示例",
                    time: "1970-01-01",
                    done: true,
                    content: "任务内容"
                },
                //若还有任务 接下来的是任务2
            ],
            //list为目录下的子分类 默认分类不可有子分类 故为空
            list: []
        }
        //接下来是后面可以新添加的分类
    ];
    localStorage.allData = JSON.stringify(json);
}
//list1过滤任务显示 常驻功能无需添加入对象原型
var selectTask = function (selector, value) {
    var ele = document.querySelector(selector);
    //先清空页面
    var li = ele.querySelectorAll("li");
    var li2 = ele.querySelectorAll(".donetrue");
    switch (value) {
        case "所有":
            li.forEach(function (item) {
                item.style.display = "block";
            });
            break;
        case "未完成":
            li.forEach(function (item) {
                item.style.display = "block";
            });
            li2.forEach(function (item) {
                item.style.display = "none";
            });
            break;
        case "已完成":
            li.forEach(function (item) {
                item.style.display = "none";
            });
            li2.forEach(function (item) {
                item.style.display = "block";
            });
            break;
    }
}
//按键监听
//新建分类
var addCat = document.getElementById("addCat");
addCat.onclick = function () {
    if (document.querySelector(".hover") && document.querySelector(".hover").childNodes[0].nodeValue == "默认分类") return false;
    //开始先声明对象
    var allList = new List();
    allList.setTask({
        //判断当前是否有hover状态的目录 有则提取innertext 没有则为一级目录
        title: document.querySelector(".hover") ? document.querySelector(".hover").innerText : "无",
        type: "newCat"
    });
    allList.create(data1);
}
//新建任务
var addTask = document.getElementById("addTask");
//点击之后判断是否已选分类 确认后负责跳转编辑页面
addTask.onclick = function () {
    var catId = data1.catId;
    if (document.querySelector(".hover2")) {
        document.querySelector(".hover2").classList.remove("hover2");
    }
    if (catId) {
        reset(0, 0);
        //新建任务时无法点击分类列表或任务列表
        task.style.pointerEvents = "none";
        list.style.pointerEvents = "none";
    }
}
//新建任务后的取消按钮
var quit = document.querySelector("#contents input[value='取消']");
quit.onclick = function () {
    reset(1, 0);
    //恢复列表可点击状态
    task.style.pointerEvents = "";
    list.style.pointerEvents = "";
}
//新建任务的确认
var deter = document.querySelector("#contents input[value='确认']");
deter.onclick = function () {
    var taskName = document.getElementById("taskName");
    var taskDate = document.getElementById("taskDate");
    var taskContent = document.getElementById("taskContent");
    var catId = data1.catId;
    var taskId = data1.taskId;
    //判断输入信息是否存在且符合规定
    if (taskName.value.length == 0 || taskName.value.length > 10 || taskDate.value.search(/^\d{4}\-\d{2}\-\d{2}$/) == -1 || taskContent.value.length == 0) return false;
    if ((taskName.value.search(/[\<\>]/) || taskContent.value.search(/[\<\>]/)) !== -1) return false;
    if (!document.querySelector(".hover2")) {
        var obj = {
            taskId: Date.parse(new Date()),
            title: taskName.value,
            time: taskDate.value,
            done: false,
            content: taskContent.value
        }
        data1.addTask(catId, obj);
        data1.setTask("#list2", data1);
        data1.setListener(data1);
    } else {
        var obj = {
            title: taskName.value,
            time: taskDate.value,
            content: taskContent.value
        }
        data1.changeTask(catId, taskId, obj, data1);
        reset(0);
    }
    reset(1, 0);
    task.style.pointerEvents = "";
    list.style.pointerEvents = "";
}
//contents界面 取消完成 完成 编辑按钮
var quitComp = document.querySelector("#content input[value='取消完成']");
var complete = document.querySelector("#content input[value='完成']");
var edit = document.querySelector("#content input[value='编辑']");
[quitComp, complete, edit].forEach(function (item) {
    item.onclick = function () {
        if (document.querySelector(".hover") && document.querySelector(".hover2")) {
            fliter(this);
        }
    }
})
//更新数据辅助函数
function fliter(obj) {
    var value = obj.value;
    var catId = data1.catId;
    var taskId = data1.taskId;
    switch (value) {
        case "取消完成":
            var obj = {
                done: false
            }
            data1.changeTask(catId, taskId, obj, data1);
            break;
        case "完成":
            var obj = {
                done: true
            }
            data1.changeTask(catId, taskId, obj, data1);
            break;
        case "编辑":
            if (data1.taskId == 0) return false;
            taskName.value = taskName2.innerHTML;
            taskDate.value = taskDate2.innerHTML;
            taskContent.value = taskContent2.innerHTML;
            content.style.display = "none";
            contents.style.display = "block";
            task.style.pointerEvents = "none";
            list.style.pointerEvents = "none";
            break;
    }
}
//清空任务数据函数
function reset(value, value2 = 1) {
    //两个参数 参数一判断id并且刷新 参数二判断是否需要切换页面
    if (value == 0) {
        [taskName2, taskDate2, taskContent2].forEach(function (item) {
            item.innerHTML = "";
        });
        if (value2 == 0) {
            content.style.display = "none";
            contents.style.display = "block";
        }
    } else {
        [taskName, taskDate, taskContent].forEach(function (item) {
            item.value = "";
        });
        if (value2 == 0) {
            contents.style.display = "none";
            content.style.display = "block";
        }
    }
}
var listLi = document.querySelectorAll("#list1 li");
//加载时默认为显示所有任务
listLi[0].classList.add("hover3");
listLi.forEach(function (item) {
    item.onclick = function () {
        if (document.querySelector(".hover3")) {
            document.querySelector(".hover3").classList.remove("hover3");
        }
        item.classList.add("hover3");
        selectTask("#list2", item.firstChild.nodeValue);
    }
});
var data1 = new Data(json);
data1.setList(".ul1");
data1.setListener(data1);
//最后页面刷新或关闭时保存data数据进localstroage
window.onunload = function () {
    localStorage.allData = JSON.stringify(data1.data);
}
//2019.11.2 初步完成