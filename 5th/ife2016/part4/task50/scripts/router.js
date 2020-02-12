//路由模块
class Router {
    constructor() {
        this.routes = {};
        this.currUrl = '';
    }
    //path为路径 fn为该路径下应该触发的函数
    route(path, fn) {
        this.routes[path] = fn || function () { };
    }
    updatePage() {
        this.currUrl = location.hash.slice(1) || '/';
        this.routes[this.currUrl] && this.routes[this.currUrl](this.currUrl.slice(1));
    }
    init() {
        //每次hash改变则触发routes对应的函数 load时同理
        window.addEventListener('load', this.updatePage.bind(this));
        window.addEventListener('hashchange', this.updatePage.bind(this));
    }
}
export default Router;