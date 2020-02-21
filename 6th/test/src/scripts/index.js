/****************************************************************************/
/****************************************************************************/
//pc端
//视频控件
const video = document.querySelector("video");
const videoDiv = document.querySelector(".video div");
video.onclick = () => {
    if (video.paused) {
        video.play();
        videoDiv.style.visibility = "hidden";
    } else if (video.played) {
        video.pause();
        videoDiv.style.visibility = "visible";
    }
}
//评论列表
//注册登录功能略去 点击两个按钮后直接改成发送评论按钮
const buttonReg = document.querySelector(".button_register");
const buttonLogin = document.querySelector(".button_login");
const buttonSend = document.querySelector(".button_send");
const messageContent = document.querySelector("#messageContent");
//登陆注册
const displayButtonSend = () => {
    buttonReg.style.display = 'none';
    buttonLogin.style.display = 'none';
    buttonSend.style.display = 'block';
    messageContent.setAttribute("placeholder", "请输入评论内容");
}
//点赞
const buttonLike = () => {
    const messageBox = document.getElementsByClassName("message_main_list_box");
    for (let box of messageBox) {
        const span = box.querySelector("span");
        span.onclick = () => {
            if (!span.classList.contains("liked")) {
                span.firstChild.nodeValue++;
                span.classList.add("liked");
            } else {
                span.firstChild.nodeValue--;
                span.classList.remove("liked");
            }
        }
    }
}
//发送评论
const addMessage = () => {
    if (!messageContent.value) {
        console.log("内容为空，发送失败");
        return;
    }
    const messageList = document.querySelector(".message_main_list");
    const div = document.createElement("div");
    //获取当前时间
    const date = new Date();
    const hours = date.getHours().length === 1 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    div.setAttribute("class", "message_main_list_box");
    div.innerHTML = `
        <span>0</span>
        <div>
            <img src="./images/钱.png" alt="头像">
            <span class="name">匿名用户</span>
            <span class="detail">广州 ${hours}：${minutes}</span>
            <p>${messageContent.value}</p>
            <span><img src="./images/气泡2.jpg" alt="图片">回复</span>
        </div>
    `;
    messageList.appendChild(div);
    //给span附加监听 点赞功能
    buttonLike();
    //清除input内容
    messageContent.value = "";
}
//按钮
buttonReg.onclick = () => {
    displayButtonSend();
    console.log("注册成功");
}
buttonLogin.onclick = () => {
    displayButtonSend();
    console.log("登陆成功");
}
buttonSend.onclick = () => {
    addMessage();
    console.log("发送成功");
}
//往期回顾列表
const videoBox = document.querySelectorAll(".video_box");
for (let i = 0; i < videoBox.length; i++) {
    videoBox[i].onclick = () => {
        switch (i) {
            case 0: {
                video.setAttribute("src", "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4");
            }
                break;
            case 1: {
                video.setAttribute("src", "http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4");
            }
                break;
            case 2: {
                video.setAttribute("src", "http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4");
            }
                break;
        }
    }
}
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
//移动端
//视频控件
const videoMob = document.querySelectorAll("video")[1];
const videoDivMob = document.querySelector(".mobile_video div");
videoMob.onclick = () => {
    if (videoMob.paused) {
        videoMob.play();
        videoDivMob.style.visibility = "hidden";
    } else if (videoMob.played) {
        videoMob.pause();
        videoDivMob.style.visibility = "visible";
    }
}
//评论列表
const buttonRegMob = document.querySelector(".mob_button_register");
const buttonLoginMob = document.querySelector(".mob_button_login");
const buttonSendMob = document.querySelector(".mob_button_send");
const messageContentMob = document.querySelector("#mobileMessageContent");
//登陆注册
const displayButtonSendMob = () => {
    buttonRegMob.style.display = 'none';
    buttonLoginMob.style.display = 'none';
    buttonSendMob.style.display = 'block';
    messageContentMob.setAttribute("placeholder", "请输入评论内容");
}
//点赞
const buttonLikeMob = () => {
    const messageBox = document.getElementsByClassName("mobile_message_main_list_box");
    for (let box of messageBox) {
        const span = box.querySelectorAll("span")[2];
        span.onclick = () => {
            if (!span.classList.contains("liked")) {
                span.firstChild.nodeValue++;
                span.classList.add("liked");
            } else {
                span.firstChild.nodeValue--;
                span.classList.remove("liked");
            }
        }
    }
}
//发送评论
const addMessageMob = () => {
    if (!messageContentMob.value) {
        console.log("内容为空，发送失败");
        return;
    }
    const messageList = document.querySelector(".mobile_message_main_list");
    const div = document.createElement("div");
    //获取当前时间
    const date = new Date();
    const hours = date.getHours().length === 1 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    div.setAttribute("class", "mobile_message_main_list_box");
    div.innerHTML = `
        <div>
            <img src="./images/钱.png" alt="头像">
            <span class="name">匿名用户</span>
            <span class="detail">广州 ${hours}：${minutes}</span>
            <span>0</span>
        </div>
        <p>${messageContentMob.value}</p>
        <p><img src="./images/气泡2.jpg" alt="图片">回复</p>
    `;
    messageList.appendChild(div);
    //给span附加监听 点赞功能
    buttonLikeMob();
    //清除input内容
    messageContentMob.value = "";
}
//按钮
buttonRegMob.onclick = () => {
    displayButtonSendMob();
    console.log("注册成功");
}
buttonLoginMob.onclick = () => {
    displayButtonSendMob();
    console.log("登陆成功");
}
buttonSendMob.onclick = () => {
    addMessageMob();
    console.log("发送成功");
}
//往期回顾列表
const videoBoxMob = document.querySelectorAll(".mobile_video_box");
for (let i = 0; i < videoBoxMob.length; i++) {
    videoBoxMob[i].onclick = () => {
        switch (i) {
            case 0: {
                videoMob.setAttribute("src", "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4");
            }
                break;
            case 1: {
                videoMob.setAttribute("src", "http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4");
            }
                break;
        }
    }
}
/**********************************************************/
/**********************************************************/
/**********************************************************/
/**********************************************************/
//监听滚动和调节窗口
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const banner = document.querySelector('.banner');
const bannerMob = document.querySelector('.mobile_banner');
const observer = () => {
    const winWidth = window.innerWidth;
    const scroTop = document.documentElement.scrollTop || document.body.scrollTop;
    //滚动条宽度为17px
    if (winWidth <= 1457 && winWidth > 785) {
        const num = (winWidth - 380) / 1060;
        main.style.transformOrigin = '0 0'
        main.style.transform = `scale(${num})`;
    }
    //同时检测侧边栏
    const winHei = window.innerHeight;
    if (winHei < 934) {
        aside.style.setProperty('--winHei-value', `${winHei - 72}`);
    }
    if (scroTop > 1078 && winWidth > 1440) {
        aside.classList.add('aside_fix');
    } else {
        aside.classList.remove('aside_fix');
    }
}
//窗口大小变化
window.onresize = observer;
//滚动
window.onscroll = observer;
//载入
window.onload = () => {
    observer();
    buttonLike();
    buttonLikeMob();
};