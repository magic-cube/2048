/**
 * Created by hc on 2017/6/3.
 */
//keydown事件表示键盘被按下
$(document).keydown(function (event){
    switch(event.keyCode){
        case 37://left
            //moveLeft()//完成向左移动的逻辑
            if(moveLeft()){
                //重新生成新的数字
                setTimeout("generateOneNumber()", 210);
                //判断游戏是否结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 38://up
            if(moveUp()){
                //重新生成新的数字
                setTimeout("generateOneNumber()", 210);
                //判断游戏是否结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 39://right
            if(moveRight()){
                //重新生成新的数字
                setTimeout("generateOneNumber()", 210);
                //判断游戏是否结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 40://down
            if(moveDown()){
                //重新生成新的数字
                setTimeout("generateOneNumber()", 210);
                //判断游戏是否结束
                setTimeout("isgameover()", 300);
            }
            break;
    }
});

function moveLeft(){
    //返回值是bool类型
    if(!canMoveLeft(board)){
        //当前格子无法移动
        return false;
    }
    //向左移动的逻辑
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){//j=1开始,最左侧不需向左移动
            //当前数字格有值,(不是0)
            if(board[i][j] != 0){
                for(var k=0;k<j;k++){
                    //分两种情况,1.当前值不为0,并且中间格子的值必须为0
                    if(board[i][k] == 0 &&noBlockHorizontalCol(i,k,j,board)){
                        //才能向左移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,k,j,board)&& !hasConflicted[i][k]){
                        //2.左边格子值与当前格子值相同
                        //才能向左移动
                        showMoveAnimation(i,j,i,k)

                        //add
                        board[i][k] += board[i][j];//相同,相加
                        board[i][j] = 0;//移动之后,清除原位置的值

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //移动完成之后需要重新设置布局
    setTimeout("updateBoardView();",200);

    return true;
}

function moveRight(){
    //返回值是bool类型
    if(!canMoveRight(board)){
        //当前格子无法移动
        return false;
    }
    //向右移动的逻辑
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){//j=2开始,最右侧不需向右移动
            //当前数字格有值,(不是0)
            if(board[i][j] != 0){
                for(var k=3;k>j;k--){
                    //分两种情况,1.当前值不为0,并且中间格子的值必须为0
                    if(board[i][k] == 0 &&noBlockHorizontalCol(i,j,k,board)){
                        //才能向右移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,j,k,board)&& !hasConflicted[i][k]){
                        //2.右边格子值与当前格子值相同
                        //才能向右移动
                        showMoveAnimation(i,j,i,k)

                        //add
                        board[i][k] += board[i][j];//相同,相加
                        board[i][j] = 0;//移动之后,清除原位置的值

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;

                    }
                }
            }
        }
    }
    //移动完成之后需要重新设置布局
    setTimeout("updateBoardView();",200);

    return true;
}

function moveUp(){
    //返回值是bool类型
    if(!canMoveUp(board)){
        //当前格子无法移动
        return false;
    }
    //向上移动的逻辑
    for(var i=1;i<4;i++){//i=1开始,最上侧不需向上移动
        for(var j=0;j<4;j++){
            //当前数字格有值,(不是0)
            if(board[i][j] != 0){
                for(var k=0;k<i;k++){
                    //分两种情况,1.当前值不为0,并且中间格子的值必须为0
                    if(board[k][j] == 0 && noBlockHorizontalRow(k,i,j,board)){
                        //才能向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] &&  noBlockHorizontalRow(k, i, j, board)&& !hasConflicted[k][j]){
                        //2.上边格子值与当前格子值相同
                        //才能向右移动
                        showMoveAnimation(i,j,k,j)

                        //add
                        board[k][j] += board[i][j];//相同,相加
                        board[i][j] = 0;//移动之后,清除原位置的值

                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;


                    }
                }
            }
        }
    }
    //移动完成之后需要重新设置布局
    setTimeout("updateBoardView();",200);

    return true;
}

function moveDown(){
    //返回值是bool类型
    if(!canMoveDown(board)){
        //当前格子无法移动
        return false;
    }
    //向下移动的逻辑
    for(var i=2;i>=0;i--){//i=2开始,最下侧不需向下移动
        for(var j=0;j<4;j++){
            //当前数字格有值,(不是0)
            if(board[i][j] != 0){
                for(var k=3;k>i;k--){
                    //分两种情况,1.当前值不为0,并且中间格子的值必须为0
                    if(board[k][j] == 0 && noBlockHorizontalRow(i,k,j,board)){
                        //才能向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] &&  noBlockHorizontalRow(i, k, j, board)&& !hasConflicted[k][j]){
                        //2.上边格子值与当前格子值相同
                        //才能向右移动
                        showMoveAnimation(i,j,k,j)

                        //add
                        board[k][j] += board[i][j];//相同,相加
                        board[i][j] = 0;//移动之后,清除原位置的值

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;

                    }
                }
            }
        }
    }
    //移动完成之后需要重新设置布局
    setTimeout("updateBoardView();",200);

    return true;
}


function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
    //alert("gameover");
}



