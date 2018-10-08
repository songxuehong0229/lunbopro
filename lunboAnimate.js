// 点击左右箭头切换图片
window.onload = function() {
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    function animate(offset){
        // 获取的事style.left,是相对左边获取距离，所以第一张图后style.left都为负值
        // 且style.left获取的是字符串，需要用parsesInt()取整转化为数字
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        // 出现空白，偏移量做判断
        if(newLeft<-3000){
            list.style.left = -600 + 'px';
        }
        if(newLeft > -600){
            list.style.left = -3000 + 'px';
        }
    }
    // 自动循环
    var timer;
    function play() {
        timer = setInterval (function (){
            next.onclick()
        },1000)
    }
    play();
    // 清除定时器
    var container = document.getElementById('container');
    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    // 圆点跟着动
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;
    function buttonsShow() {
        // 这里需要清除之前的样式
        for (var i = 0;i < buttons.length;i++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
            }
        }
        // 数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
    }
    prev.onclick = function () {
        index -= 1;
        if(index < 1){
            index = 4;
        }
        buttonsShow();
        animate(600)
        console.log("prev")
    }
    next.onclick = function () {
        index += 1;
        if(index > 4){
            index = 1;
        }
        buttonsShow();
        animate(-600)
        console.log("next")
    }
    // 点击其中一个小圆点，切换到相应的图片
    for(var i = 0; i < buttons.length;i++){
        // 利用闭包，匿名函数自执行
        (function (i) {
            buttons[i].onclick = function () {
                // 
                console.log(i);
                /* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 600 * (index - clickIndex);
                animate(offset);//存放鼠标点击后的位置，用于小圆点的正常显示 
                index = clickIndex;
                buttonsShow();
            }
        })(i)
        
    }
}