/****************************************************************************/
/****************************************************************************/
//视频控件
const video = document.querySelector("video");
const videoMob = document.querySelectorAll("video")[1];
const videoDiv = document.querySelector(".video div");
const videoDivMob = document.querySelector(".mobile_video div");
video.onclick = () => {
    if (video.paused) {
        video.play();
        videoDiv.style.visibility = "hidden";
    } else if (video.played) {
        video.pause();
        videoDiv.style.visibility = "visible";
    }
}
//移动端
videoMob.onclick = () => {
    if (videoMob.paused) {
        videoMob.play();
        videoDivMob.style.visibility = "hidden";
    } else if (videoMob.played) {
        videoMob.pause();
        videoDivMob.style.visibility = "visible";
    }
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
            case 3: {
                videoMob.setAttribute("src", "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4");
            }
                break;
            case 4: {
                videoMob.setAttribute("src", "http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4");
            }
                break;
        }
    }
}
/****************************************************************************/
/****************************************************************************/
//监听滚动和调节窗口
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const banner = document.querySelector('.banner');
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
    const winWidth = window.innerWidth;
    if (winWidth > 785) {
        setTimeout(() => {
            banner.style.backgroundImage = 'url("./img/banner1.png")';
        }, 3000);
    }
};
