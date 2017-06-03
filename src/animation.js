/**
 * Created by hc on 2017/6/3.
 */
function ShowNumberWithAnimation(randx, randy, randNumber){
    //获取当前数字格
    var numberCell = $("#number-cell-"+randx+"-"+randy);
    //设置当前数字格的背景色和前景色以及数字值
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    //设置当前数字格的显示动画
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(randx,randy),
        left:getPosLeft(randx,randy)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    //获取当前数字格的元素
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top: getPosTop(tox,toy),
        left: getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $("#score").text(score);
}