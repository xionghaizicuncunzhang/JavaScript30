// 获取元素节点
const player = document.querySelector(".player");
const video = document.querySelector(".player__video");
const progress = document.querySelector(".progress");  // 进度条
const progressBar = document.querySelector(".progress__filled");  // 实时进度条
const toggle = document.querySelector(".toggle");  // 播放按钮
const ranges = document.querySelectorAll('.player__slider');  // 声音条和播放速度条
const skipButtons =  document.querySelectorAll("[data-skip]");  // 快进和后退按钮
const playImg = document.querySelector(".video_play")  // 播放图标

// 播放功能
function togglePlay() {
    video.paused ? video.play() : video.pause()
}

// 播放图标变换
function changeButton() {
    // toggle.textContent = this.paused ? '►' : '❚ ❚';
    playImg.src = this.paused ? './play.png' : './pause.png';  // 替换播放按键的图片链接
}

// 快进后退
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// 声音条和播放速度条更新
function rangeUpdate() {
    video[this.name] = this.value;
}

// 播放进度条随视频改变
function progressUpdate() {
    const now = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${now}%`;
}

// 拖动进度条
function scrub(event) {
    video.currentTime = (event.offsetX / progress.offsetWidth) * video.duration;
}


// 播放事件
video.addEventListener("click", togglePlay);  // 点击视频开始播放
toggle.addEventListener("click", togglePlay);  // 点击按钮开始播放
// 按钮图标事件
video.addEventListener('play', changeButton);  // 播放图标
video.addEventListener('pause', changeButton);  // 暂停图标
// 快进、后退事件
skipButtons.forEach(button => button.addEventListener("click", skip));
// 声音条和播放速度条事件
ranges.forEach(range => range.addEventListener("click", rangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", rangeUpdate));
// 播放进度条随视频改变事件
video.addEventListener("timeupdate", progressUpdate);
// 拖动进度条事件
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (event) => mousedown && scrub(event));  // 监听鼠标拖动
progress.addEventListener("mousedown", () => mousedown = true);  // 鼠标按下拖动
progress.addEventListener("mouseup", () => mousedown =  false);  // 鼠标抬起取消拖动

