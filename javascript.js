alert('JS效果：\n① 距圣诞节时间倒计时 \n② 点击回到顶部按钮 \n③ 轮播图 \n④ 点击搜索框鼠标离开内容改变 \n⑤ 此弹窗');
window.addEventListener('DOMContentLoaded', function () {
    /* 搜索框点击 输入搜索内容 */
    var inputs = document.querySelector('input');
    inputs.addEventListener('focus', function () {
        inputs.value = null;
        inputs.style.border = '1px solid #cfdee6';
        inputs.style.outline = 'none';
    })
    inputs.addEventListener('blur', function () {
        inputs.value = '畅享双十二';
    })
    /* 轮播图 */
    var box = document.getElementById('box');
    var oNavlist = document.getElementById('nav').children;
    var slider = document.getElementById('slider');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var index = 1;
    var timer;
    var isMoving = false;
    box.onmouseover = function () {
        animate(left, { opacity: 50 })
        animate(right, { opacity: 50 })
        clearInterval(timer)
    }
    box.onmouseout = function () {
        animate(left, { opacity: 0 })
        animate(right, { opacity: 0 })
        timer = setInterval(next, 3000);
    }
    right.onclick = next;
    left.onclick = prev;
    for (var i = 0; i < oNavlist.length; i++) {
        oNavlist[i].index = i;
        oNavlist[i].onclick = function () {
            index = this.index + 1;
            navmove();
            animate(slider, { left: -1200 * index });
        }
    }
    function next() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index++;
        navmove();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 6) {
                slider.style.left = '-1200px';
                index = 1;
            }
            isMoving = false;
        });
    }
    function prev() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index--;
        navmove();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 0) {
                slider.style.left = '-6000px';
                index = 5;
            }
            isMoving = false;
        });
    }
    function navmove() {
        for (var i = 0; i < oNavlist.length; i++) {
            oNavlist[i].className = "";
        }
        if (index > 5) {
            oNavlist[0].className = "active";
        } else if (index <= 0) {
            oNavlist[4].className = "active";
        } else {
            oNavlist[index - 1].className = "active";
        }
    }
    timer = setInterval(next, 3000);
    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    function animate(obj, json, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var isStop = true;
            for (var attr in json) {
                var now = 0;
                if (attr == 'opacity') {
                    now = parseInt(getStyle(obj, attr) * 100);
                } else {
                    now = parseInt(getStyle(obj, attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                var cur = now + speed;
                if (attr == 'opacity') {
                    obj.style[attr] = cur / 100;
                } else {
                    obj.style[attr] = cur + 'px';
                }
                if (json[attr] !== cur) {
                    isStop = false;
                }
            }
            if (isStop) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 30)
    }
    test.onclick = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
})
/* 时间倒计时 */
const endTime = new Date("2020/12/25 00:00:00").getTime();
let timer = setInterval(function () {
    const today = new Date().getTime();
    // 获取时间差
    const timer = endTime - today;
    // 获取天数、月数、分钟数、秒数
    let days = Math.floor(timer / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timer % (1000 * 60)) / 1000);

    if (days <= 0) {
        document.getElementById('days').innerHTML = 0;
        document.getElementById('hours').innerHTML = 0;
        document.getElementById('minutes').innerHTML = 0;
        document.getElementById('seconds').innerHTML = 0;
    } else {
        document.getElementById('days').innerHTML = days + '天';
        document.getElementById('hours').innerHTML = hours + '小时';
        document.getElementById('minutes').innerHTML = minutes + '分钟';
        document.getElementById('seconds').innerHTML = seconds + '秒';
    }

}, 1000);


