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