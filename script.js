
var c=document.getElementById("canvas");
var cxt=c.getContext("2d");
var data = [];
var clickCount = 0;
var canvasWidth = 600;
var interval = 20;
var isEnd = false;
var colorW = '#666';
var colorH = '#000';


drw_table();
function drw_table() {
    for (var i = 0; i < canvasWidth;) {
        cxt.beginPath();
        cxt.lineWidth="1";
        cxt.strokeStyle="red"; // 红色路径
        cxt.moveTo(i,0);
        cxt.lineTo(i,canvasWidth);
        cxt.stroke(); // 进行绘制
        cxt.beginPath();
        cxt.lineWidth="1";
        cxt.moveTo(0,i);
        cxt.lineTo(canvasWidth,i);
        cxt.stroke(); // 进行绘制
        i = i+interval;
    }
}
function clickEvent(e)
{
    if (!isEnd) {
        x1=e.clientX;
        y1=e.clientY;
        for (var i = 0; i < canvasWidth;) {
            if (x1>=i&&x1<i+interval/2) {
                x1 = i;
                break;
            }
            if (x1>=i+interval/2&&x1<i+interval) {
                x1 = i+interval;
                break;
            }
            i = i+interval;
        }
        for (var i = 0; i < canvasWidth;) {
            if (y1>=i&&y1<i+interval/2) {
                y1 = i;
                break;
            }
            if (y1>=i+interval/2&&y1<i+interval) {
                y1 = i+interval;
                break;
            }
            i = i+interval;
        }
        if (!validateData(x1,y1)) {
            var isTrue = true;
            if (clickCount%2==0) {
                cxt.fillStyle=colorW;
            }else{
                cxt.fillStyle=colorH;
                isTrue = false;
            }
            cxt.beginPath();
            cxt.arc(x1,y1,interval/2,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();
            data.push({'x':x1,'y':y1,'isTrue':isTrue});
            clickCount++;
            if(isOver(x1,y1,isTrue)){
                isEnd = true;
                if (isTrue) {
                    alert('white win');
                }else{
                    alert('black win');
                }
            }
        }else{
            // alert("当前点已经存在");
        }
    }  
}





function reStart() {
    cxt.clearRect(0,0,canvasWidth,canvasWidth);
    drw_table();
    data = [];
    clickCount=0;
    isEnd = false;
}






//white
function validateData(x,y){
    for (var i = 0; i < data.length; i++) {
        if (data[i].x ==x && data[i].y == y) {
            return true;
        }
    }
    return false;
}
//black
function validateDataIsTrue(x,y,isTrue){
    for (var i = 0; i < data.length; i++) {
        if (data[i].x ==x && data[i].y == y &&data[i].isTrue == isTrue) {
            return true;
        }
    }
    return false;
}
function isOver(x1,y1,isTrue) {
    x2 = x3 = x4 = x5 = x1;
    y2 = y3 = y4 = y5 = y1;





    //判断当前点的横向
    if (x1>=5*interval) {
        x2 = x1-5*interval;
    }else{
        x2 = 0;
    }
    lineCount = 0;
    for (var i = 0; i < 10; i++) {
        tempx = x2+interval*i;
        if (validateDataIsTrue(tempx,y2,isTrue)) {
            lineCount++;
            if (lineCount==5) {
                break;
            };
        }else{
            lineCount=0;
        }
    }
    if (lineCount>=5) {
        return true;
    }
    //判断当前点的纵向
    if (y1>=5*interval) {
        y3 = y1-5*interval;
    }else{
        y3=0;
    }
    lineCount = 0;
    for (var i = 0; i < 10; i++) {
        tempy = y3+interval*i;
        if (validateDataIsTrue(x3,tempy,isTrue)) {
            lineCount++;
            if (lineCount==5) {
                break;
            };
        }else{
            lineCount=0;
        }
    }
    if (lineCount>=5) {
        return true;
    }
    
}