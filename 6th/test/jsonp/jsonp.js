//jsonp实现函数
//注：jsonp唯一参数为object 里面写了多少个键 则实际传入时必须要有这些键
function jsonp({url,params,callback}){
    //使用es6语法promise
    return new Promise((resolve,reject)=>{
        //创建script标签
        let script=document.createElement('script');

        //此处重新设定后台得到的全局函数 键名为callback
        //如果不设定window.callback函数 则会使用调用jsonp时传入的参数callback 此处例子中为show函数被覆盖
        window[callback]=(data)=>{
            resolve(data);
            document.body.removeChild(script);
        }
        //

        //扩展运算符整个params对象 把callback：'show'也并入
        params={...params,callback};

        //整合参数和键加到url末尾
        let arr=[];
        for(let key in params){
            arr.push(`${key}=${params[key]}`);
        }
        //用?作为参数得开头 &链接参数
        script.src=`${url}?${arr.join('&')}`;
        //插入script进入页面
        document.body.appendChild(script);
    })
}
//此处 如果jsonp中没有定义window.callback函数 则后台调用的是这里的函数 否则反之
function show(val){
    console.log(val);
}
jsonp({
    url:'./jsonp.php',
    params:{
        name:'mike',
        password:'123'
    },
    //此处必须传入callback键值对 如果jsonp函数内部有定义window.callback 则callback值是啥没所谓 到时候调用的是那个函数
    //如果没有定义 则调用callback值的函数 此处是调用show
    //当然 如果jsonp定义函数中不添加callback这个参数 那这里就可以不传了 直接定义window.callback函数即可
    callback:'show'
}).then(data=>{
    console.log(data);
});
