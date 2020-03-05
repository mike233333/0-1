//异步调用php 使用async/await以及fetch
//await接promise 意思就是接受resolve的返回值  如果是reject或者有错误 则没有值
//然后因为是在try里 所以错误后会被catch到
async function a() {
    try {
        const b = await fetch('./ajax-test.php');
        const c = await b.text();
        console.log(c)
    } catch (e) {
        console.log('error' + e);
    }
}
a();

//实现函数柯里化
const curry = (fn, ...args1) => (...args2) => (
    arg => arg.length >= fn.length ? fn(...arg) : curry(fn, ...arg)
)([...args1, ...args2]);
const foo = (a, b, c) => console.log(a * b * c);
curry(foo)(2)(3)(4); // -> 24
curry(foo, 2)(3, 4); // -> 24
curry(foo, 2, 3)(4); // -> 24
curry(foo, 2, 3, 4, 5)(); // -> 24

//实现判断数据类型的函数
const getType = (obj) => {
    console.log(Object.prototype.toString.call(obj).replace('[object', '').replace(']', ''));
}
getType(null)
getType(undefined)
getType({})
getType([])
getType(123)
getType(true)
getType('123')
getType(/123/)
getType(new Date())

//给出 ['1', '3', '10'].map(parseInt) 执行结果
//结果为[1,NaN,2]
//关键原因就是map函数把parseInt函数当成回调函数了
//具体就是function（value,index,array）=parseInt（num，martix）
//martix是指计算用的几进制取值为2-36区间 超出则返回结果为NaN 此处传值自动传成数组的index了
//所以下面的代码就等于parseInt(1,0)=1 parseInt(3,1)=NaN parseInt(10,2)=2
//想要正确得出答案要这么写['1', '3', '10'].map(value=>parseInt(value))
console.log(['1', '3', '10'].map(parseInt)) // -> [1,NaN,2]

//实现Array的flat方法->用于扁平化数组
function flattenByDeep(array, deep = 1) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i]) && deep >= 1) {
            //递归
            result = result.concat(flattenByDeep(array[i], deep - 1))
        } else {
            result.push(array[i])
        }
    }
    return result;
}
const arr = [1, 2, [3, [4, 5]]];
console.log(flattenByDeep(arr, 2));

//数组去重 有挺多个方法的
//new Set方法 比较简洁
const arr2 = [1, 1, 2, 3, 4, 5, 5, 6];
function distinct1(arr) {
    return [...new Set(arr)];
}
//据说是最快的方法for of+object
function distinct2(arr) {
    let obj = {};
    let result = [];
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i);
            obj[i] = 1;
        }
    }
    return result;
}

// 实现一个方法，可以给 obj 所有的属性添加动态绑定事件，当属性值发生变化时会触发事件
let obj = {
    key_1: 1,
    key_2: 2
}
function func(key) {
    console.log(key + ' 的值发生改变：' + this[key]);
}
bindData(obj, func);
obj.key_1 = 2; // 此时自动输出 "key_1 的值发生改变：2"
obj.key_2 = 1; // 此时自动输出 "key_2 的值发生改变：1"
//解答：
function bindData(obj, fn) {
    for (let key in obj) {
        Object.defineProperty(obj, key, {
            set(newVal) {
                if (this.value !== newVal) {
                    this.value = newVal;
                    fn.call(obj, key);
                }
            },
            get() {
                return this.value;
            }
        })
    }
}

//异步执行顺序问题
async function async1() {
    console.log(1);
    const result = await async2();
    console.log(3);
}

async function async2() {
    console.log(2);
}

Promise.resolve().then(() => {
    console.log(4);
});

setTimeout(() => {
    console.log(5);
});

async1();
console.log(6);

//运行顺序
//第一个宏任务是全局
//往下运行 遇到settimeout或者interval则新加宏任务
//遇到await则运行里面的代码 然后中断接下来同域代码的执行
//被中断的同域代码 这部分代码被添加到微任务
//遇到promise直接执行 then后面的被加入微任务
//上面的执行顺序为 1 2 6 4 3 5
//流程开始
//从上往下执行
//先执行promise 然后遇到then 添加进微任务中
//执行settimeout 添加新一个宏任务 以后再执行
//然后执行async1() 打印1 然后执行await后面的async2()
//async2里打印2 随后函数中await下一行后面代码被添加到微任务中 也就是打印3
//跳出后执行async1后面的打印6
//第一次宏任务执行完毕 执行微任务
//按照微任务添加顺序是先打印4后打印3
//微任务执行完毕 执行下一个宏任务 也即上面的settimeout 所以打印5
//流程结束
