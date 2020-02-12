import Router from './router.js';
import Questionnaire from './questionnaire.js';
import Calendar from './Calendar.js';
var navigater = document.querySelector('#navigater');
var naviLi = navigater.querySelectorAll('li');
var home = document.querySelector('#home');
var create = document.querySelector('#create');
var fill = document.querySelector('#fill');
var data = document.querySelector('#data');
var list = document.querySelector('#list');

//header部分路由跳转函数 参数path为需要跳转的页面的hash路径 其余隐藏
const naviFilter = (path) => {
    [home, create, fill, data, list].forEach(node => {
        node.style.display = 'none';
    });
    switch (path) {
        case 'navi-home':
            home.style.display = 'flex';
            break;
        case 'navi-create':
            create.style.display = 'block';
            break;
        case 'navi-fill':
            fill.style.display = 'block';
            break;
        case 'navi-data':
            data.style.display = 'block';
            break;
        case 'navi-list':
            list.style.display = 'block';
            break;
        default:
            break;
    }
}
var router = new Router();
router.init();
//header页面跳转路由
naviLi.forEach((node, index) => {
    router.route(`/${node.getAttribute('id')}`, naviFilter);
    node.onclick = () => {
        location.hash = `/${node.getAttribute('id')}`;
    }
});
//新建页面点击按钮进入新建细节页面
var create2But = document.querySelector('#create-2 input');
create2But.onclick = () => {
    var create1 = document.querySelector('#create-1');
    var create2 = document.querySelector('#create-2');
    create1.style.display = 'block';
    create2.style.display = 'none';
}
//问卷列表界面新建按钮
var listCreateQue=document.querySelector('#list #createQue');
listCreateQue.onclick=()=>{
    var create1 = document.querySelector('#create-1');
    var create2 = document.querySelector('#create-2');
    create1.style.display = 'block';
    create2.style.display = 'none';
    location.hash='/navi-create';
}

var json = localStorage.data?JSON.parse(localStorage.data):[];
var que = new Questionnaire(json);
//问卷数据格式
/*
//可算是把这破玩意弄明白了
var request = indexedDB.open('questionnaire', 1);
request.onupgradeneeded = (e) => {
    var idbResult = e.target.result;
    var objs = idbResult.createObjectStore('questionList');
}
var request = indexedDB.open('questionnaire', 1);
request.onsuccess = (e) => {
    var db = e.target.result;
    var tran = db.transaction('questionList', 'readwrite');
    var store = tran.objectStore('questionList');
    store.add(json, 'queList');
}
*/
//新建问卷按钮监听部分
var queAll = document.querySelector('.queAll');
var queUl = document.querySelector('.queAll ul');
//添加问题按钮
var addQueBut = document.querySelector('#create-add span');
var ulBut = document.querySelector('#create-add ul');
addQueBut.onclick = () => {
    que.showQueSelect(ulBut);
}
//添加问题类型选择按钮 单选多选文字
var singleQueBut = document.querySelectorAll('#create-add li')[0],
    multiQueBut = document.querySelectorAll('#create-add li')[1],
    wordQueBut = document.querySelectorAll('#create-add li')[2];
singleQueBut.onclick = () => {
    que.addNewQue(queUl, 'single');
}
multiQueBut.onclick = () => {
    que.addNewQue(queUl, 'multi');
}
wordQueBut.onclick = () => {
    que.addNewQue(queUl, 'word');
}
//que控制台按钮 上下移动复用删除
var controllerUp = document.querySelectorAll('#create-controller span')[0],
    controllerDown = document.querySelectorAll('#create-controller span')[1],
    controllerCopy = document.querySelectorAll('#create-controller span')[2],
    controllerDelete = document.querySelectorAll('#create-controller span')[3];
var controllerBut = document.querySelectorAll('#create-controller span');
controllerBut.forEach(item => {
    item.onclick = () => {
        que.controller(item);
    }
});
//保存或发布问卷
var saveBut = document.querySelectorAll("#create-foot input[type=button]")[0],
    publishBut = document.querySelectorAll("#create-foot input[type=button]")[1];
var listTbody = document.getElementsByTagName('tbody')[0];
saveBut.onclick = () => {
    que.set(queUl, 'ready');
    listTbody.innerHTML = '';
    que.showQueOnList(listTbody);
    //注意获得input的方法 querysele似乎无法动态获取 但是getelebyTagname可以
}
publishBut.onclick = () => {
    que.set(queUl, 'publish');
    listTbody.innerHTML = '';
    que.showQueOnList(listTbody);
}
//页面加载时自动加载indexdeDB中已有问卷数据
window.onload = () => {
    que.showQueOnList(listTbody);
    console.log('本地数据已加载完成');
}
//提交问卷
var submitBut = document.querySelector('#fill-foot input');
var queFill = document.querySelector('.queFill');
submitBut.onclick = () => {
    que.submitQue(queFill);
}
//问卷列表checkbox功能
//全选按钮
var seleAllCheckbox=document.querySelector('#selectAll');
seleAllCheckbox.onchange=()=>{
    if(event.target.checked){
        listTbody.querySelectorAll('input[type=checkbox]').forEach(item=>item.checked=true);
    }else{
        listTbody.querySelectorAll('input[type=checkbox]').forEach(item=>item.checked=false);
    }
}
//删除按钮
var deleteBut=document.querySelector('#list #deleteQue');
deleteBut.onclick=()=>{
    var checkedItem=listTbody.querySelectorAll('input:checked');
    var arr=[];
    checkedItem.forEach(item=>arr.push(item.parentElement.parentElement));
    que.deleteQue(listTbody,arr);
}
//新建页面日期input 引入calendar模块
var now = new Date();
var calen = new Calendar(now.getFullYear(), now.getMonth(), now.getDate());
//每分钟更新问卷列表各个问卷状态
setInterval(() => {
    que.refreshQue(listTbody);
}, 60000);

//第一版完成于2019.12.24