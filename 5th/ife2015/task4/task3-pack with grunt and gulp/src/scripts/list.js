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
List.prototype.create = function (obj) {
    var prom = prompt(`请输入要添加的分类名称\n父目录为：${this.setting.title}`);
    var idName = obj.catId
    if (!prom || prom.search(/[\<\>]/) !== -1) {
        alert("分类名不符合格式");
        return false;
    };
    var obj2 = {
        catName: prom,
        id: Date.parse(new Date()),
        task: [],
        list: []
    }
    obj.addCat(idName, obj2);
    obj.setList(".ul1");
    obj.setListener(obj);
}
export {List};