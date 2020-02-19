import printMe from "./print";

document.write('hello world!');
setTimeout(() => {
    console.log(3)
}, 1000);
if (module.hot) {
    module.hot.accept('./print.js', function() { //告诉 webpack 接受热替换的模块
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
