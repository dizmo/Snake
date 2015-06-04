Simple Snake dizmo
==================

How the simple snake dizmo is made.  
![Snake](/readme/snake.png)

## Components
Snake consists of the following three components. 

### Field
The Field is a two dimensional array (18x18). A '1' indicates a wall and '0' indicates empty space. The actual field is only 16x16, the advantage to have a bigger array like that is to have the ability to add obstacles. 
<code><pre>field = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
</code></pre>
    
The rendered empty field:  
  ![Snake field](/readme/snake_field.png)
  

### Snake
The Snake is also a two dimensional array (*x2) the length is equal to the snake length and element has stores the x and y coordinates of the represented snake part.
<code><pre>snake = [[10,8],[9,8],[8,8],[8,9],[8,10],[8,11],[7,11],[6,11],[5,11],[4,11],[3,11],[2,11],[1,11],[0,11]];
</code></pre>

The snake looks like this.  
  ![Snake](/readme/snake_snake.png)  
  
### Direction
To calculate the next snake position the direction is necessary. 
The direction can be up, down, left or right. This is set with a key press on one of the corresponding Arrow keys
<pre><code>document.onkeydown = function(e) {  
    switch (e.which) {  
        case 37: // left  
            snakeDirection = 'left';  
            break;  
        case 38: // up  
            snakeDirection = 'up';  
            break;  
        case 39: // right  
            snakeDirection = 'right';  
            break;  
        case 40: // down  
            snakeDirection = 'down';  
            break;  
        default:  
            return; // exit this handler for other keys  
    }
    e.preventDefault(); // prevent the default action (scroll / move   caret)  
};  
</code></pre>
or provided by a docked dizmo. Here a subscription to the property eg. direction/left is set. 
<code><pre>dizmo.onDock(function() {
        var dockedDizmos = dizmo.getDockedDizmos();
        for (var i = 0; i < dockedDizmos.length; i++) {
            dockedDizmos[i].publicStorage.subscribeToProperty('direction/up', function() {
                snakeDirection = 'up';
            });
            dockedDizmos[i].publicStorage.subscribeToProperty('direction/left', function() {
                snakeDirection = 'left';
            });
            dockedDizmos[i].publicStorage.subscribeToProperty('direction/right', function() {
                snakeDirection = 'right';
            });
            dockedDizmos[i].publicStorage.subscribeToProperty('direction/down', function() {
                snakeDirection = 'down';
            });
        }
    });
</code></pre>

## Game 
The Basis of the game is the gameController

### gameController
The gameController function turns as long as the variable gameover is not `true`.
<code><pre>if (gameover === true) {
        displayGameOver(); 
        return 0;
    }</code></pre>
If `gameover` is `true` the game over display is showed and the game stops otherwise the current Snake head is taken from the array. The head is always the las array element an therefore this can be done by simply `snake.pop();`.  
Then the futureHeadPosition is calculated according to the direction you selected. 
To prevent the snake from going backwards an if-condition is added. If your previous direction was `left` the snake is not allowed to go `right` if this is the case the direction is overwritten with the `previousDirection`.
All four directions are checked inside this switch condition.
<code><pre>
    var currentHeadPosition = snake.pop();
    var futureHeadPosition = [0, 0];
    switch (snakeDirection) {
        case 'left':
            if (previousDirection == 'right') {
                snake.push(currentHeadPosition);
                futureHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] + 1];
                snake.push(futureHeadPosition);
                break;
            }
            previousDirection = 'left';
            snake.push(currentHeadPosition);
            futureHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] - 1];
            snake.push(futureHeadPosition);
            break;
            ...
</code></pre>
After the futureHeadPosition is determined, it needs to be checked for an obstacle or food. If there is a wall or the snake the game is over. It there is food the tail is not cut. If there is nothing the tail is cut `snake.shift()`.
<code><pre>    if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 1) {
        gameover = true;
    } else if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 2) {
        foodPosition();
    } else {
        var currentTailPosition = snake.shift();
        field[currentTailPosition[0]][currentTailPosition[1]] = 0;
    }    
</code></pre>
The snake is now drawn into the field and the field is rendered.
<code><pre>
    for (var i = snake.length - 1; i >= 0; i--) {
        field[snake[i][0]][snake[i][1]] = 1;
    }
    drawPlayField();
</code></pre>
After the `GAMESPEED`as the timeout time the gameController starts again.
<code><pre>
    setTimeout(function() {
        gameController();
    }, GAMESPEED);</code></pre>


### food Position
The foodPosition is a recursive function which tries to set the food randomly at a position. If there is already something the function is called again until an empty spot is found. This can take sometime (at least when the snake gets long) and most probably needs to be optimized in the next version. 
<code><pre>
function foodPosition() {
    var x = Math.floor(Math.random() * 16) + 1;
    var y = Math.floor(Math.random() * 16) + 1;
    if (field[x][y] > 0) {
        foodPosition();
    } else {
        field[x][y] = 2;
    }
}
</code></pre>
