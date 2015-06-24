# Simple Snake dizmo

![Snake](/readme/snake.png)

Snake consists of the following three components:

## The field
The field is a two dimensional array (18x18). A '1' indicates a wall and '0' indicates empty space. The actual field is only 16x16. You can extend the array, so that you can add obstacles.

```
field = [
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
```
The rendered empty field:
  ![Snake field](/readme/snake_field.png)

## The snake
The snake is also a two dimensional array (*x2), where the length is equal to the snake length and each element stores the x and y coordinates of the represented snake part.

```{.javascript}
snake = [[10,8],[9,8],[8,8],[8,9],[8,10],[8,11],[7,11],[6,11],[5,11],[4,11],[3,11],[2,11],[1,11],[0,11]];
```
The snake looks like this.
  ![Snake](/readme/snake_snake.png)

## The direction
To calculate the next snake position, we require the direction. The direction can be up, down, left or right. This is set with a key press on one of the corresponding arrow keys.

```{.javascript}
document.onkeydown = function(e) {
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
```

The docked dizmo can write a new value into a corresponding tree node to trigger the callback function you provided with the subscription. For example the docked dizmo writes a new date into 'direction/up’ and the snake will go up.

```{.javascript}
dizmo.onDock(function() {
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
```

## The game
The basis of the game is the gameController.

The gameController function runs as long as the variable gameover is not true.

```{.javascript}
if (gameover === true) {
    displayGameOver();
    return 0;
}
```

If gameover is true, the 'game over' display is shown and the game stops, otherwise the current snake head is taken from the array. The head is always the last array element and we can simply address it with `snake.pop();`.

The futureHeadPosition is calculated according to the direction you selected. To prevent the snake from going backwards, an if-condition is added. If your previous direction was left, the snake is not allowed to go right. If this is the case, the direction is overwritten with the previousDirection. The switch condition checks all four directions.

```{.javascript}
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
```

After the futureHeadPosition is determined, it needs to be checked for an obstacle or food. If the snake hits is a wall or itself, the game is over. If there is food, the tail is not cut. If there is nothing the tail is cut with `snake.shift()`.

```{.javascript}
if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 1) {
    gameover = true;
} else if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 2) {
    foodPosition();
} else {
    var currentTailPosition = snake.shift();
    field[currentTailPosition[0]][currentTailPosition[1]] = 0;
}
```

Draw the snake the field and render the field.

```{.javascript}
for (var i = snake.length - 1; i >= 0; i--) {
    field[snake[i][0]][snake[i][1]] = 1;
}
drawPlayField();
```

After the set time of GAMESPEED of 160 milliseconds has passed, `setTimeout(function()` calls gameController().

```{.javascript}
    setTimeout(function() {
        gameController();
    }, GAMESPEED);
```

## foodPosition
foodPosition() is a recursive function, which tries to set the food randomly at a position. If there is already something, the function is called again until an empty spot is found. This can take some time (especially, when the snake grows long) and most probably needs to be optimized in the next version.

```{.javascript}
function foodPosition() {
    var x = Math.floor(Math.random() * 16) + 1;
    var y = Math.floor(Math.random() * 16) + 1;
    if (field[x][y] > 0) {
        foodPosition();
    } else {
        field[x][y] = 2;
    }
}
```
