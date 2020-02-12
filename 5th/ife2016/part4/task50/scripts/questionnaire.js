//问卷模块
class Questionnaire {
    constructor(data) {
        this.data = data;
        //初始化直接运行init函数
        this.init();
    }
    //初始化
    init() {
        //设置IDB库并创建store
        var request = indexedDB.open('questionnaire');
        request.onupgradeneeded = (e) => {
            var db = e.target.result;
            var objs = db.createObjectStore('questionList');
        }
    }
    //确认保存问卷 obj为包含问卷问题的区域 检测区域内的node信息并填充到data里 type为问卷属于保存还是发布状态
    //新建之前先检查id数据是否已经存在于indexedDB里
    set(obj, type) {
        var newObj = {
            id: Date.parse(new Date()),
            state: type,
            name: '',
            select: false,
            list: [],
            deadline: '',
            submit: 0
        }
        var titleId = document.querySelector('#create-title').getAttribute('data-id');
        newObj.name = document.querySelector('#create-title').firstElementChild.value;
        obj.querySelectorAll('li').forEach(item => {
            var que = {
                type: type,
                question: '',
                option: [],
                must: true,
                answer: [],
                submitCount: 0
            }
            que.type = item.getAttribute('data-id');
            que.question = item.querySelector('input').value;
            item.querySelectorAll('div').forEach(item => {
                if (item.querySelector('input')) {
                    que.option.push(item.querySelectorAll('input')[1].value);
                }
            });
            //是否必填识别暂未添加
            if (item.getAttribute('data-id') == 'word') {
                var checkbox = item.querySelector('span input');
                checkbox.checked ? null : que.must = false;
            }
            newObj.list.push(que);
        });
        //问卷截止日期 判断是否马上结束 虽然不会出现那这种状况吧
        newObj.deadline = document.querySelector('#create-foot input[type=text]').value;
        var deadline = new Date(newObj.deadline.replace(/-/g, '/'));
        var nowDate = new Date();
        if (deadline.getTime() < nowDate.getTime()) {
            newObj.state = 'over';
        }
        //判断是新建问卷还是修改问卷
        if (this.data.find((item) => item.id == titleId)) {
            this.data.forEach((item, index, array) => {
                item.id == titleId ? array[index] = newObj : null;
            })
        } else {
            this.data.push(newObj);
        }
        this.saveIDB(this.data);
        console.log('创建成功，即将清空页面。\n问卷详细可前往问卷列表查看');
        obj.innerHTML = '';
        //清空后返回新建按钮页面
        var create1 = document.querySelector('#create-1');
        var create2 = document.querySelector('#create-2');
        create1.style.display = 'none';
        create2.style.display = 'block';
    }
    //obj为要添加问题的页面 type为添加的题目类型 单选 single、多选 multi、文字 word 而setting为复用等操作时需要多添加的部分
    addNewQue(obj, type, setting) {
        if (obj.querySelectorAll('li').length >= 10) {
            console.log('问题数量上限为10，添加问题失败');
            return false;
        };
        var li = document.createElement('li');
        //li点击后获得class标记以便controller控制
        li.addEventListener('click', () => {
            if (document.querySelector('.sele')) {
                document.querySelector('.sele').classList.remove('sele');
            }
            li.classList.add('sele');
        });
        var settings = setting || {
            type: type,
            question: '',
            option: [''],
            must: true,
            answer: [],
            submitCount: 0
        }
        switch (settings.type) {
            case 'single':
                var str = ``;
                for (let i = 0; i < settings.option.length; i++) {
                    str += `<div>
                            <input type="radio"><input type="text" placeholder="选项内容" value='${settings.option[i]}'>
                            <input type="button" value="X">
                        </div>`;
                }
                li.innerHTML = `
                        <p>Q<span data-id='queCount'></span>单选题</p>
                        <input type="text" placeholder="题目内容" value='${settings.question}'>` + str + `
                        <div data-id="addOpt" class='addOpt'>Add Option</div>`;
                li.setAttribute('data-id', 'single');
                break;
            case 'multi':
                var str = ``;
                for (let i = 0; i < settings.option.length; i++) {
                    str += `<div>
                            <input type="checkbox"><input type="text" placeholder="选项内容" value='${settings.option[i]}'>
                            <input type="button" value="X">
                        </div>`;
                }
                li.innerHTML = `
                        <p>Q<span data-id='queCount'></span>多选题</p>
                        <input type="text" placeholder="题目内容" value='${settings.question}'>` + str + `
                        <div data-id="addOpt" class='addOpt'>Add Option</div>`;
                li.setAttribute('data-id', 'multi');
                break;
            case 'word':
                li.innerHTML = `
                        <p>Q<span data-id='queCount'></span>文字题</p>
                        <input type="text" placeholder="题目内容">
                        <textarea name="" id="" cols="30" rows="10" placeholder="回答内容" value='${settings.question}'></textarea>
                        <span>
                            <p><input type="checkbox">此项必填</p>
                        </span>`;
                li.setAttribute('data-id', 'word');
                break;
            default:
                break;
        }
        this.addQueListener(obj, li);
        obj.appendChild(li);
    }
    //显示问卷填写页面 效果为显示单个问题 需要重复调用 obj为问卷填写页面 逻辑上和addNewQue差不多 就少几个按钮
    addQueOnFill(obj, setting) {
        var li = document.createElement('li');
        var count = document.querySelectorAll('.queFill li').length;
        switch (setting.type) {
            case 'single':
                var str = ``;
                setting.option.forEach((item, index) => {
                    str += `<div>
                            <p><input type="radio" value="${index + 1}" name="${count + 1}">${item}</p>
                        </div>`;
                    li.innerHTML = `
                        <p>Q${count + 1}单选题</p>
                        <p>${setting.question}</p>
                    `+ str;
                });
                li.setAttribute('data-id', 'single');
                break;
            case 'multi':
                var str = ``;
                setting.option.forEach((item, index) => {
                    str += `<div>
                            <p><input type="checkbox" value="${index + 1}">${item}</p>
                        </div>`;
                    li.innerHTML = `
                        <p>Q${count + 1}多选题</p>
                        <p>${setting.question}</p>
                    `+ str;
                });
                li.setAttribute('data-id', 'multi');
                break;
            case 'word':
                li.innerHTML = `
                    <p>Q${count + 1}文字题</p>
                    <p>${setting.question}</p>
                    <span>${setting.must ? '此项必填' : '此项选填'}</span>
                    <textarea name="" id="" cols="30" rows="10" placeholder="回答内容"></textarea>
                `;
                li.setAttribute('data-id', 'word');
            default:
                break;
        }
        obj.appendChild(li);
    }
    //提交问卷按键 obj为问卷界面
    submitQue(obj) {
        var li = obj.querySelectorAll('li');
        var id = document.querySelector('#fill-title').getAttribute('data-id');
        var objQue;
        var request = window.indexedDB.open('questionnaire', 1);
        request.onsuccess = (e) => {
            var db = e.target.result;
            var tran = db.transaction('questionList', 'readwrite');
            var store = tran.objectStore('questionList');
            var request = store.get('queList');
            request.onsuccess = () => {
                var result = request.result;
                result.forEach(item => item.id == id ? objQue = item : null);
                if (!objQue) return false;
                if (objQue.state != 'publish') {
                    console.log('问卷不处于发布状态，填写无效');
                    return false;
                }
                objQue.submit += 1;
                objQue.list.forEach((item, index) => {
                    var answer = li[index].querySelectorAll('input:checked');
                    if (answer.length == 0) {
                        if (item.type == 'word') {
                            if (item.must && li[index].querySelector('textarea').value.length == 0) {
                                console.log('此题必填，提交失败');
                            } else {
                                item.answer.push(li[index].querySelector('textarea').value);
                            }
                        } else {
                            console.log('此题必填，提交失败');
                        }
                    } else {
                        var arr = [];
                        answer.forEach(item => arr.push(item.value));
                        item.answer.push(...arr);
                    }
                    item.submitCount += 1;
                });
                this.data.forEach((item, index, array) => {
                    item.id == id ? array[index] = objQue : item;
                });
                this.saveIDB(this.data);
                console.log('即将返回问卷列表页面');
                this.showQueOnList(document.getElementsByTagName('tbody')[0]);
                location.hash = '/navi-list';
                //在这里innerhtml会无限清除 根本啥都显示不出来 原因不明
                //obj.innerHTML='';
                //document.querySelector('#fill-title').removeAttribute('data-id');
            }
        }
    }
    //实时更新每个问题的顺序 防止问题上下移动后顺序乱了 obj为目标问题
    updateQueCount(obj, que) {
        document.addEventListener('click', () => {
            obj.querySelectorAll('li').forEach((item, index) => {
                if (item === que) {
                    que.querySelector('span').innerHTML = index + 1;
                }
            })
        })
    }
    //给新添加的问卷添加各种监听 obj为主页面 li为当前创建的li问题
    addQueListener(obj, li) {
        //每次问题顺序变动后更新计数
        this.updateQueCount(obj, li);
        //删除选项
        li.querySelectorAll('input[type=button]').forEach(item => {
            item.onclick = () => { this.removeOption(item) };
        });
        //增加选项
        li.querySelector('div[data-id=addOpt]') ? li.querySelector('div[data-id=addOpt]').onclick = () => {
            this.addOption(event.target);
        } : null;
    }
    //查看数据按钮 item为问卷的数据 count是问卷总提交次数
    showQueData(obj, item, submitCount) {
        var div = document.createElement('div');
        var canvas = document.createElement('canvas');
        var divCount = document.querySelectorAll('.queData div').length;
        //标题下方总提交次数计数
        document.querySelector('#data-title span').innerHTML = `问卷提交总次数：${submitCount}次`;
        div.innerHTML = `
            <p>Q${divCount + 1}${item.type == 'single' ? '单选题' : item.type == 'multi' ? '多选题' : '文字题'}</p>
            <p>该问题总提交次数为${item.submitCount}次</p>
        `;
        //canvas画图部分
        var ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 300;
        var objData = {};
        var str = '';
        if (item.type == 'word') {
            item.answer.forEach(item2 => {
                objData[1] ? objData[1] += 1 : objData[1] = 1;
            })
        } else {
            item.answer.forEach(item2 => str += item2);
            var singleOpt = str.split('');
            singleOpt.forEach(item3 => {
                objData[item3] ? objData[item3] += 1 : objData[item3] = 1;
            });
        }
        //画坐标轴
        //纵轴
        this.drawLine(ctx, 50, 50, 50, 270);
        //纵轴
        this.drawLine(ctx, 50, 270, 550, 270);
        //画坐标
        //纵轴
        this.drawMarker(ctx);
        //横轴
        this.drawMarker(ctx, objData);
        //画柱条
        this.drawRect(ctx, objData, submitCount);
        div.appendChild(canvas);
        obj.appendChild(div);
        //返回按钮
        document.querySelector('#data-foot input').onclick = () => {
            location.hash = '/navi-list';
            obj.innerHTML = '';
        }
    }
    //画图部分功能
    //画线
    drawLine(obj, x, y, x2, y2) {
        obj.beginPath();
        obj.moveTo(x, y);
        obj.lineTo(x2, y2);
        obj.strokeStyle = 'black';
        obj.stroke();
    }
    //画坐标
    drawMarker(obj, data) {
        if (!data) {
            obj.fillText('100%', 10, 50, 40);
            obj.fillText('75%', 10, 105, 40);
            obj.fillText('50%', 10, 160, 40);
            obj.fillText('25%', 10, 215, 40);
            obj.fillText('0', 20, 270, 40);
        } else {
            var len = Object.keys(data).length;
            var num = 500 / (+len + 1);
            var count = 1;
            for (let i in data) {
                obj.fillText(i, num * count + 50, 290, 50);
                count++;
            }
        }
    }
    //画柱条
    drawRect(obj, data, submitCount) {
        var len = Object.keys(data).length;
        var num = 500 / (+len + 1);
        var count = 1;
        for (let i in data) {
            obj.fillStyle = 'red';
            obj.fillRect(num * count + 25, 50 + 220 * (1 - data[i] / submitCount), 50, 220 * data[i] / submitCount);
            count++;
        }
    }
    //添加题目按钮点击 显示或隐藏添加题目的类型
    showQueSelect(obj) {
        if (obj.style.display === 'none') {
            obj.style.display = 'flex';
        } else if (obj.style.display === 'flex') {
            obj.style.display = 'none';
        } else {
            obj.style.display = 'flex';
        }
    }
    //单个选项点击x按钮去除该选项 obj为事件对象 event.target
    removeOption(obj) {
        if (obj.parentElement.parentElement.querySelectorAll('div').length <= 2) {
            console.log('选项至少存在一个');
            return false;
        }
        obj.parentElement.parentElement.removeChild(obj.parentElement);
    }
    //点击addOptiin添加选项 obj为事件对象
    addOption(obj) {
        var parNode = obj.parentElement;
        if (parNode.querySelectorAll('div').length >= 5) {
            console.log('选项上限为四个');
            return false;
        }
        var newOpt = document.createElement('div');
        if (parNode.getAttribute('data-id') === 'single') {
            newOpt.innerHTML = `
                <input type="radio"><input type="text" placeholder="选项内容">
                <input type="button" value="X">`;
        } else if (parNode.getAttribute('data-id') === 'multi') {
            newOpt.innerHTML = `
                <input type="checkbox"><input type="text" placeholder="选项内容">
                <input type="button" value="X">`;
        }
        newOpt.querySelector('input[type=button]').onclick = () => {
            this.removeOption(event.target);
        }
        parNode.insertBefore(newOpt, obj);
    }
    //controller部分功能 上下移动复用删除 obj为事件对象
    controller(obj) {
        if (!document.querySelector('.sele')) return false;
        var targetOpt = document.querySelector('.sele');
        var parNode = targetOpt.parentElement;
        var preNode = targetOpt.previousElementSibling;
        var nexNode = targetOpt.nextElementSibling;
        switch (obj.innerHTML) {
            case '上移':
                if (!preNode) {
                    console.log('题目已到最顶');
                    return false;
                }
                var oldChild = parNode.removeChild(targetOpt);
                parNode.insertBefore(oldChild, preNode);
                break;
            case '下移':
                if (!nexNode) {
                    console.log('题目已到最底');
                    return false;
                }
                var oldChild = parNode.removeChild(targetOpt);
                parNode.insertBefore(oldChild, nexNode.nextElementSibling);
                break;
            case '复用':
                var setting = {
                    type: targetOpt.getAttribute('data-id'),
                    question: targetOpt.querySelector('input').value,
                    option: [],
                    must: true
                };
                if (targetOpt.querySelectorAll('div')) {
                    var div = targetOpt.querySelectorAll('div');
                    div.forEach(item => {
                        if (item.querySelector('input')) {
                            setting.option.push(item.querySelectorAll('input')[1].value);
                        }
                    });
                } else {
                    setting.option.push('');
                }
                this.addNewQue(parNode, null, setting);
                break;
            case '删除':
                parNode.removeChild(targetOpt);
                break;
            default:
                break;
        }
    }
    //储存data进indexedDB
    saveIDB(data) {
        //打开已经创建的某个idb
        var request = indexedDB.open('questionnaire', 1);
        request.onsuccess = (e) => {
            var db = e.target.result;
            //建立事务 并储存data数据
            var tran = db.transaction('questionList', 'readwrite');
            var store = tran.objectStore('questionList');
            store.put(data, 'queList');
        }
        localStorage.data = JSON.stringify(this.data);
    }
    /*
    showQueOnList(obj) {
        //这个连环嵌套把我看瞎了 讲道理应该有更好的解决办法才对 以现在的水平实在是想不出来
        //如果直接把open indexedDB部分写进每个函数倒是方便了 就是得复制粘贴很多次
        //问卷列表 问卷编辑按钮 promise感觉好麻烦 还不如直接get数据success里面执行函数算了
        function queEdit(objBut, obj, result) {
            var id = objBut.parentElement.parentElement.getAttribute('data-id');
            //取得对应问卷的数据
            var tarQue;
            result.forEach(item => {
                if (item.id == id) {
                    tarQue = item;
                }
            });
            //标题
            document.querySelector('#create-title input').value = tarQue.name;
            tarQue.list.forEach(item => {
                this.addNewQue(obj, null, item);
            });
            document.querySelector('#create-foot input[type=text]').value = tarQue.deadline;
        }
        result.forEach(item => {
            var tr = document.createElement('tr');
            tr.setAttribute('data-id', item.id);
            tr.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td><span>${item.name}</span></td>
                    <td><span>${item.state}</span></td>
                    <td><input class="edit" type="button" value="编辑问卷"><input type="button" value="查看问卷"></td>
                    `;
            tr.querySelector('input[value="编辑问卷"]').onclick = () => {
                var queEdit2=queEdit.bind(this);
                queEdit2(event.target,obj,result);
            }
            obj.appendChild(tr);
        })
    }
    //包裹函数 为了request获取到了才执行
    thing(fn, ...obj) {
        this.getIDB(fn, obj);
    }
    //取得indexedDB里面的数据 算了 直接每个方法都写一次
    getIDB(fn, obj) {
        var request = indexedDB.open('questionnaire', 1);
        var obj;
        request.onsuccess = (e) => {
            var db = e.target.result;
            //建立事务 并取得data数据
            var tran = db.transaction('questionList', 'readwrite');
            var store = tran.objectStore('questionList');
            var request = store.get('queList');
            request.onsuccess = () => {
                var fn2=fn.bind(this);
                fn2(...obj, request.result);
            }
        };
    }
    */
    //问卷列表页面根据indexedDB数据更新列表 obj为列表页面
    //问卷列表展示
    showQueOnList(obj) {
        obj.innerHTML = '';
        var creaQue = document.querySelector('.queAll ul');
        var fillQue = document.querySelector('.queFill ul');
        var dataQue = document.querySelector('.queData');
        var request = indexedDB.open('questionnaire', 1);
        request.onsuccess = (e) => {
            var db = e.target.result;
            //建立事务 并取得data数据
            var tran = db.transaction('questionList', 'readwrite');
            var store = tran.objectStore('questionList');
            var request = store.get('queList');
            request.onsuccess = () => {
                var result = request.result;
                if (!result) return false;
                result.forEach(item => {
                    var tr = document.createElement('tr');
                    tr.setAttribute('data-id', item.id);
                    tr.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td><span>${item.name}</span></td>
                        <td><span>${item.state}</span></td>
                        ${item.state === 'ready' ? '<td><input class="edit" type="button" value="编辑问卷"><input type="button" value="查看问卷"></td>' :
                            '<td><input class="edit" type="button" value="查看数据"><input type="button" value="查看问卷"></td>'}
                        `;
                    tr.querySelectorAll('input').forEach(item => {
                        switch (item.getAttribute('value')) {
                            case '编辑问卷': {
                                item.onclick = () => {
                                    var id = event.target.parentElement.parentElement.getAttribute('data-id');
                                    //取得对应问卷的数据
                                    var tarQue;
                                    result.forEach(item => {
                                        if (item.id == id) {
                                            tarQue = item;
                                        }
                                    });
                                    //标题
                                    document.querySelector('#create-title input').value = tarQue.name;
                                    //给标题设置id用于保存时根据id覆盖原数据
                                    document.querySelector('#create-title').setAttribute('data-id', id);
                                    //先清空页面
                                    creaQue.innerHTML = '';
                                    tarQue.list.forEach(item => {
                                        this.addNewQue(creaQue, null, item);
                                    });
                                    document.querySelector('#create-foot input[type=text]').value = tarQue.deadline;
                                    //点击编辑后跳转
                                    window.location.hash = '/navi-create';
                                    //跳转后显示内容界面
                                    var create1 = document.querySelector('#create-1');
                                    var create2 = document.querySelector('#create-2');
                                    create1.style.display = 'block';
                                    create2.style.display = 'none';
                                }
                            }
                                break;
                            case '查看数据': {
                                item.onclick = () => {
                                    var id = event.target.parentElement.parentElement.getAttribute('data-id');
                                    //取得对应问卷的数据
                                    var tarQue;
                                    result.forEach(item => {
                                        if (item.id == id) {
                                            tarQue = item;
                                        }
                                    });
                                    //标题
                                    document.querySelector('#data-title p').value = tarQue.name;
                                    //先清空页面
                                    dataQue.innerHTML = '';
                                    tarQue.list.forEach(item => {
                                        this.showQueData(dataQue, item, tarQue.submit);
                                    });
                                    //点击后跳转
                                    window.location.hash = '/navi-data';
                                }
                            }
                                break;
                            case '查看问卷': {
                                item.onclick = () => {
                                    var id = event.target.parentElement.parentElement.getAttribute('data-id');
                                    //取得对应问卷的数据
                                    var tarQue;
                                    result.forEach(item => {
                                        if (item.id == id) {
                                            tarQue = item;
                                        }
                                    });
                                    //标题
                                    document.querySelector('#fill-title p').innerHTML = tarQue.name || '无标题';
                                    //同样设置id 不知道有没有用先留一个标签吧
                                    document.querySelector('#fill-title').setAttribute('data-id', id);
                                    //先清空页面
                                    fillQue.innerHTML = '';
                                    tarQue.list.forEach(item => {
                                        this.addQueOnFill(fillQue, item);
                                    });
                                    //点击后跳转
                                    window.location.hash = '/navi-fill';
                                }
                            }
                                break;
                            default:
                                break;
                        }
                    })
                    obj.appendChild(tr);
                })
            }
        };
    }
    //删除问卷
    deleteQue(obj, deleteObj) {
        var request = indexedDB.open('questionnaire', 1);
        request.onsuccess = (e) => {
            var db = e.target.result;
            //建立事务 并取得data数据
            var tran = db.transaction('questionList', 'readwrite');
            var store = tran.objectStore('questionList');
            var request = store.get('queList');
            request.onsuccess = () => {
                var result = request.result;
                //对比传入对象的id 符合则删除
                deleteObj.forEach(item => {
                    var deleteId = item.getAttribute('data-id');
                    result.forEach((item2, index, array) => {
                        item2.id == deleteId ? array.splice(index, 1) : null;
                    });
                });
                this.data = result;
                this.saveIDB(this.data);
                this.showQueOnList(obj);
            }
        }
    }
    //判定一次问卷状态并更新 obj为问卷列表页面
    refreshQue(obj) {
        var queList = obj.querySelectorAll('tr');
        if (queList.length !== 0) {
            var request = indexedDB.open('questionnaire', 1);
            request.onsuccess = (e) => {
                var db = e.target.result;
                //建立事务 并取得data数据
                var tran = db.transaction('questionList', 'readwrite');
                var store = tran.objectStore('questionList');
                var request = store.get('queList');
                request.onsuccess = () => {
                    var result = request.result;
                    queList.forEach(item => {
                        var id = item.getAttribute('data-id');
                        result.forEach(item2 => {
                            if (item2.id == id) {
                                var deadline = new Date(item2.deadline.replace(/-/g, '/'));
                                var nowDate = new Date();
                                if (deadline.getTime() < nowDate.getTime()) {
                                    item2.state = 'over';
                                }
                            }
                        });
                    });
                    this.data = result;
                    this.saveIDB(this.data);
                    this.showQueOnList(obj);
                }
            }
        }
    }
}
export default Questionnaire;