
function init(){
    var canvas = document.getElementById('mycanvas');
    W = canvas.width = 2000;
    H = canvas.height = 900;
    pen = canvas.getContext('2d');
    cell_size = 67;
    food = getRandomFood();
    gameover = false;
    score = 3;

    food_img = new Image();
    food_img.src = "assets/apple1.png";

    trophy = new Image();
    trophy.src = "assets/trophy.png";

    snake = {
        init_len : 3,
        color : "solid blue",
        cells : [],
        direction : "right",

        createSnake: function(){
            for(var i = this.init_len; i>0; i--){
                this.cells.push({x:i, y:0});
            }
        },

        drawSnake: function(){ 

            for(var i=0; i<this.cells.length; i++){
            pen.fillStyle = this.color;
            pen.fillRect(this.cells[i].x*cell_size, this.cells[i].y*cell_size, cell_size-3, cell_size-3 );
            }
        },

        updateSnake: function(){
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
     
            var nextX, nextY;

            if(this.direction == "right"){
                nextX = headX+1;
                nextY = headY;
            }

            else if(this.direction == "left"){
                nextX = headX-1;
                nextY = headY;
            }

            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }

            else{
                nextX = headX;
                nextY = headY-1;
            }

            this.cells.unshift({x:nextX, y:nextY});

            // preventing snake from going out
            var lastX = Math.round(W/cell_size);
            var lastY = Math.round(H/cell_size);

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
                gameover = true;
            }
        }
    };

    snake.createSnake();

    //Adding the event Listerner on the Document Object

    function keyPressed(e){
        // conditional statements for directions
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else{
            snake.direction = "down";
        }
    }

    document.addEventListener('keydown', keyPressed);

}

function draw(){
    //erase the old frame
    pen.clearRect(0,0,W,H); 
    
    snake.drawSnake();
    
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x*cell_size, food.y*cell_size, cell_size, cell_size);
    
    pen.drawImage(trophy, 22, 22, cell_size, cell_size);

    pen.fillStyle = "blue";
    pen.font = "23px Roboto"
    pen.fillText(score,50,50);
}

function update(){
    snake.updateSnake();

}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cell_size)/cell_size);
    var foodY = Math.round(Math.random()*(H-cell_size)/cell_size);

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop(){
    if(gameover == true){
        clearInterval(f);
        alert("Game Over !! STOP Playing and Start Studying.")
    }
    draw();
    update();
}

init();

var f = setInterval(gameloop, 135);
