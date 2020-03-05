/*
let xhr = new XMLHttpRequest();
xhr.open('get', 'ajax-test.php', false);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    } else {
        console.log('error');
    }
}
xhr.send();

*/
let num=0;

Object.defineProperty(window,'aa',{
    get:function(){
        return ++num;
    }
})
console.log(aa===1&&aa===2&&aa===3)