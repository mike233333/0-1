window.onresize=()=>{
    const winWidth=window.innerWidth;
    const main=document.querySelector("main");
    const aside=document.querySelector("aside");
    //滚动条宽度为17px
    if(winWidth<=1457&&winWidth>785){
    }
}

//视频控件
const video=document.querySelector("video");
video.onclick=()=>{
    if(video.paused){
        video.play();
    }else if(video.played){
        video.pause();
    }
}