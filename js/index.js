var dragPicture = {
    pictureSize: {                                    // 拖拽的图片的原始尺寸
        w: 0,
        h: 0
    },
    point: {
        left: 0,
        top: 0
    },
    newPoint: {                                // 拖拽图片后的位置
        left: 0,
        top: 0
    }
},
mousePoint = {                                  // 拖拽图片时鼠标的坐标
    x: 0,
    y: 0
},   
imageBox = {
    imageBoxSize: {                                     // 图片父元素尺寸
        w: 0,
        h: 0
    },
    canDrag: {                               // 确认图片加载完成可拖动
        h: true,
        v: true
    }
},
imgContainer = document.getElementById("dragPicture"),
imgbox = document.getElementById("imgbox"),
btnShowOrigin = document.getElementById("btnShowOrigin"),
btnFitSize = document.getElementById("btnFitSize"),
canDrag = false;


document.addEventListener('DOMContentLoaded', function(){
    // getSize();
});

function showOrigin(){
    canDrag = true;

    imgContainer.style.left = "auto";
    imgContainer.style.top = "auto";
    imgContainer.style.transform = "none";
    imgContainer.style.maxWidth = "none";
    imgContainer.style.maxHeight = "none";
    imgContainer.style.cursor = "grab";

    btnShowOrigin.style.backgroundColor = "#ffaa44";
    btnShowOrigin.style.color = "#fff";
    btnFitSize.style.backgroundColor = "#fff";
    btnFitSize.style.color = "#000";

    getSize();
}

function fitSize(){
    canDrag = false;
    imgContainer.style.left = "50%";
    imgContainer.style.top = "50%";
    imgContainer.style.transform = "translate(-50%,-50%)";
    imgContainer.style.maxWidth = "100%";
    imgContainer.style.maxHeight = "100%";
    imgContainer.style.cursor = "default";

    btnShowOrigin.style.backgroundColor = "#fff";
    btnShowOrigin.style.color = "#000";
    btnFitSize.style.backgroundColor = "#ffaa44";
    btnFitSize.style.color = "#fff";
}

function getSize(){
    // 获取拖拽容器的大小
    dragPicture.pictureSize = {
        w: imgContainer.offsetWidth,
        h: imgContainer.offsetHeight
    };

    // 获取图片父元素的大小(即图片显示区域)
    imageBox.imageBoxSize = {
        w: imgbox.offsetWidth,
        h: imgbox.offsetHeight
    };

    // 判断是否允许拖拽
    imageBox.dragcheck = {
        h: imageBox.imageBoxSize.w > dragPicture.pictureSize.w ? false : true,
        v: imageBox.imageBoxSize.h > dragPicture.pictureSize.h ? false : true
    };

}
// 鼠标在拖拽容器中按下时触发
function dragContainerMouseDown(e) {
    // 记录鼠标点击时的初始坐标
    mousePoint = {
        x: e.clientX,
        y: e.clientY
    };
    dragPicture.point = dragPicture.newPoint;
    document.body.onmousemove = dragContainerMouseMove;
    document.onmouseup = dragContainerMouseUp;
    return false;
}
// 容器拖拽时触发
function dragContainerMouseMove(e) {
    // 鼠标偏移量 = 初始坐标 - 当前坐标
    let dx = e.clientX - mousePoint.x;  // >0,向右拖动;<0,向左拖动
    let dy = e.clientY - mousePoint.y;  // >0,向下拖动;<0,向上拖动

    // 获取拖拽容器移动后的left和top值
    // 鼠标向左上方移动时,图片的位置在变大,此时dx,dy小于0
    // 鼠标向右下方移动时,图片的位置在变小,此时dx,dy大于0
    if (imageBox.canDrag.h)
        var newx = dx > 0 ? Math.min(0, dragPicture.point.left + dx) : Math.max(- dragPicture.pictureSize.w + imageBox.imageBoxSize.w, dragPicture.point.left + dx );
    if (imageBox.canDrag.v)
        var newy = dy > 0 ? Math.min(0, dragPicture.point.top + dy) : Math.max(- dragPicture.pictureSize.h + imageBox.imageBoxSize.h, dragPicture.point.top + dy );

    dragPicture.newPoint = {
        left: typeof newx != 'undefined' ? newx : dragPicture.point.left,
        top: typeof newy != 'undefined' ? newy : dragPicture.point.top
    };

    if(canDrag){
        imgContainer.style.left = dragPicture.newPoint.left + 'px';
        imgContainer.style.top = dragPicture.newPoint.top + 'px';
    }else{
        imgContainer.style.left = '50%';
        imgContainer.style.top = '50%';
    }

    

    return false;
}
// 移动完成  取消onmousemove和onmouseup事件
function dragContainerMouseUp(e) {
    document.body.onmousemove = null;
    document.onmouseup = null;
}