var taskName = document.getElementById("taskName");
var taskDate = document.getElementById("taskDate");
var taskContent = document.getElementById("taskContent");
var taskName2 = document.getElementById("taskName2");
var taskDate2 = document.getElementById("taskDate2");
var taskContent2 = document.getElementById("taskContent2");
var content = document.querySelector("#content");
var contents = document.querySelector("#contents");
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
    var that = this;
    (function getTree(data2) {
        var obj = data2;
        for (let i = 0; i < obj.length; i++) {
            var str = "";
            if (obj == that.data) {
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
    })(that.data);
    ele.innerHTML = result;
}
//点击根据id删除分类
Data.prototype.delCat = function (id, obj) {
    if (id == 0) return false;
    var arr = [];
    var obj2 = {};
    //从头开始遍历直到找到与输入id相同的任务
    (function find(id2, data2) {
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].id == id2) {
                arr = data2;
                obj2 = data2[i];
            }
            //如果没找到则向下一层继续找
            if (data2[i].list.length !== 0) {
                find(id2, data2[i].list);
            }
        }
    }(id, this.data));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == obj2) {
            arr.splice(i, 1);
        }
    }
    //删除后更新页面并添加监听
    obj.setList(".ul1");
    obj.setListener(obj);
    obj.setCatId(null);
}
//提供对象并根据其内部数据渲染已有任务
Data.prototype.setTask = function (selector, obj) {
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
                obj.setTaskId(this.getAttribute("task-id"));
                obj.showTask("#content", obj);
            }
            //删除按钮
            li.firstElementChild.onclick = function () {
                obj.delTask(catId, this.parentElement.getAttribute("task-id"), obj);
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
Data.prototype.showTask = function (selector, obj) {
    var ele = document.querySelector(selector);
    var catId = obj.catId;
    var taskId = obj.taskId;
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
Data.prototype.changeTask = function (id, id2, obj, obj2) {
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
    obj2.setTask("#list2", obj2);
    obj2.setListener(obj2);
    //当任务变动时跳回所有任务防止逻辑错误
    var listLi = document.querySelectorAll("#list1 li");
    document.querySelector(".hover3").classList.remove("hover3");
    listLi[0].classList.add("hover3");
}
//点击根据id删除任务
Data.prototype.delTask = function (id, id2, obj) {
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
    obj.setTask("#list2", obj);
    obj.setListener(obj);
    obj.setTaskId(null);
}
//给添加的目录增加事件监听
Data.prototype.setListener = function (obj) {
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
            obj.setCatId(this.getAttribute("data-id"));
            obj.setTask("#list2", obj);
            var li = document.querySelectorAll("#list2 li");
            li.forEach(function (item) {
                item.onclick = function () {
                    if (document.querySelector(".hover2")) {
                        document.querySelector(".hover2").classList.remove("hover2");
                    }
                    item.classList.add("hover2");
                    obj.setTaskId(this.getAttribute("task-id"));
                    obj.showTask("#content", obj);
                }
            });
        }
        //删除按键点击后运行dalcat删除该分类
        item.previousElementSibling.onclick = function () {
            obj.delCat(item.getAttribute("data-id"), obj);
        }
    });
    var task1 = document.getElementById("task1");
    task1.onclick = function () {
        if (event.target == this) {
            if (document.querySelector(".hover")) {
                document.querySelector(".hover").classList.remove("hover");
            }
            obj.setCatId(null);
            obj.setTask("#list2", obj);
            reset(0);
        }
    }
    //全部添加完后计算任务数量并显示
    obj.showCount();
    //若加载页面时只有默认分类存在 则自动点击默认分类一次 然后点击默认分类一次
    if (document.querySelectorAll(".ul1 a").length == 1) {
        document.querySelector(".hover") ? null : document.querySelector(".ul1 a").click();
        if (document.querySelectorAll(".ul3 li").length == 1) {
            document.querySelector(".ul3 li").click();
        }
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
        if (item.parentElement.parentElement.parentElement.getAttribute("class") == "ul1") {
            countAll += count;
        }
    });
    countTask.innerHTML = `(${countAll})`;
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
export { Data };