var li = document.querySelectorAll(".list>li");
var list = document.querySelector(".list")
var left = document.querySelector("#left");
var right = document.querySelector("#right");
var li1 = document.querySelectorAll("#cate li");
left.ontouchend = function () {
    change(this.id);
}
right.ontouchend = function () {
    change(this.id);
}
var pageX=0;
var pageX2=0;
//点击时保存坐标
window.ontouchstart=function(){
    event.preventDefault();
    pageX=event.changedTouches[0].pageX;
}
//滑动时保存坐标
window.ontouchmove=function(){
    event.preventDefault();
    pageX2=event.changedTouches[0].pageX;
}
//松开后进行计算滑动距离大于300则滑动换页
window.ontouchend=function(){
    if(pageX2==0)return false;
    if(pageX2-pageX>300){
        event.preventDefault();
        change("left");
    }else if(pageX-pageX2>300){
        event.preventDefault();
        change("right");
    }
}
var countLeft = 1;
var countRight = 1;
function change(value) {
    if (value == "left") {
        if (countLeft == 1) return false;
        list.style.transform = `translateX(-${countLeft - 2}00%)`;
        countRight--;
        countLeft--;
    } else {
        if (countRight == 3) return false;
        list.style.transform = `translateX(-${countRight}00%)`;
        countRight++;
        countLeft++;
    }
}//查看localstorage是否有数据
if (localStorage.allData) {
    var json = JSON.parse(localStorage.allData);
} else {
    //任务数据
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
        , {
            id: 1,
            catName: "默认分类1",
            //task为目录下的任务
            task: [
                //任务1
                {
                    taskId: 1,
                    title: "默认分类示例2",
                    time: "1970-01-02",
                    done: true,
                    content: "任务内容"
                },
                //若还有任务 接下来的是任务2
            ],
            //list为目录下的子分类 默认分类不可有子分类 故为空
            list: [
                {
                    id: 2,
                    catName: "默认分类2",
                    //task为目录下的任务
                    task: [
                        //任务1
                        {
                            taskId: 2,
                            title: "默认分类示例3",
                            time: "1970-01-03",
                            done: true,
                            content: "任务内容"
                        },
                        //若还有任务 接下来的是任务2
                        {
                            taskId: 3,
                            title: "默认分类示例3",
                            time: "2000-01-03",
                            done: true,
                            content: "任务内容"
                        },
                    ],
                    //list为目录下的子分类 默认分类不可有子分类 故为空
                    list: []
                }

            ]
        }

    ];
    localStorage.allData = JSON.stringify(json);
}

//Date对象 负责添加元素进页面
function Data(data) {
    this.data = data;
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
                if (obj[i].list.length !== 0) {
                    str = `<li><input type='button' value='↓'><a data-id='${obj[i].id}'>${obj[i].catName}</a>`;
                } else {
                    str = `<li><a data-id='${obj[i].id}'>${obj[i].catName}</a>`;
                }
            } else {
                if (obj[i].list.length !== 0) {
                    str = `<li><input type='button' value='↓'><a data-id='${obj[i].id}'>${obj[i].catName}</a>`;
                } else {
                    str = `<li><a data-id='${obj[i].id}'>${obj[i].catName}</a>`;
                }
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
            li.innerHTML = `<a>${data[i].title}</a>`;
            li.setAttribute("task-id", data[i].taskId);
            li.ontouchend = function () {
                if (document.querySelector(".hover2")) {
                    document.querySelector(".hover2").classList.remove("hover2");
                }
                this.classList.add("hover2");
                data1.setTaskId(this.getAttribute("task-id"));
                data1.showTask("#task");
                change("right");
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
            ele.querySelector("#taskName").innerHTML = arr[i].title;
            ele.querySelector("#taskDate").innerHTML = arr[i].time;
            ele.querySelector("#taskContent").innerHTML = arr[i].content;
        }
    }
}
//给添加的目录增加事件监听
Data.prototype.setListener = function () {
    var ul1 = document.querySelector(".ul1");
    ul1.querySelectorAll("a").forEach(function (item) {
        item.ontouchend = function () {
            if (document.querySelector(".hover")) {
                document.querySelector(".hover").classList.remove("hover");
            }
            item.classList.add("hover");
            //点击后获得当前的data-id值并保存
            data1.setCatId(this.getAttribute("data-id"));
            data1.setTask("#list");
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
            change("right");
        }
        if (item.previousElementSibling) {
            item.previousElementSibling.ontouchend = function () {
                var ul2 = item.parentElement.querySelector(".ul2");
                if (ul2) {
                    ul2.style.display == "none" ? ul2.style.display = "block" : ul2.style.display = "none";
                }
            }
        }
    });
    var task1 = document.getElementById("cate");
    task1.ontouchend = function () {
        if (event.target == this) {
            if (document.querySelector(".hover")) {
                document.querySelector(".hover").classList.remove("hover");
            }
            document.querySelector("#list .ul3").innerHTML="没有点选分类";
            document.querySelectorAll("#task span").forEach(function(item){
                item.innerHTML="";
            });
            document.querySelector("#task span").innerHTML="没有点选任务";
        }
    }
}
var data1 = new Data(json);
data1.setList(".ul1");
data1.setListener();
window.unonload = function () {
    localStorage.allData = JSON.stringify(data1.data);
}

//2019.10.31初步完成 只有显示功能 没有写入功能