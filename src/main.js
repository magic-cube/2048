/**
 * Created by hc on 2017/6/3.
 */

//定义一个javascript数组
var board = new Array();
var hasConflicted = new Array();
var score = 0;

$(function () {
   newgame();
});

function newgame(){
    //初始化棋盘
    init();

    //生成两个随机位置的随机数字
    generateOneNumber();
    generateOneNumber();


}

function restartgame(){
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

//javascript无法直接定义出一个二维数组,需要使用如下方式
function init(){
    for(var i=0;i<4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            //初始化小格子的值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;

            var gridCell = $("#grid-cell-"+i+"-"+j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top",getPosTop(i,j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left",getPosLeft(i,j));
        }
    }

    updateBoardView();
    score = 0;

    $("score").text(0);

}

//重新布局
function updateBoardView(){
    //清除之前页面上的东西,重新设置
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0,设置数字格宽高都为0
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}

function generateOneNumber(){
    //生成一个随机位置的随机数字
    //1.生成一个随机的位置
    var randx =parseInt(Math.floor(Math.random()*4));//x坐标
    var randy =parseInt(Math.floor(Math.random()*4));//y坐标

    while(true){
        if(board[randx][randy] == 0){
            break;
        }
        var randx =parseInt(Math.floor(Math.random()*4));//x坐标
        var randy =parseInt(Math.floor(Math.random()*4));//y坐标
    }
    //2.生成一个随机的数字(2048游戏规则,新生成的数字只可以是2或4)
    var randNumber = Math.random()< 0.5 ? 2: 4;

    //3.在随机位置上显示出随机数字
    board[randx][randy] = randNumber;

    //实现随机数字显示的动画
    ShowNumberWithAnimation(randx, randy, randNumber);
}




