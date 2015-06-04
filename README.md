Simple Snake dizmo
==================

How the simple snake dizmo is made.  
![Snake](/readme/snake.png)

## Components
Snake consists of the following three components. 

### Field
The Field is a two dimensional array (18x18). A '1' indicates a wall and '0' indicates empty space. The actual field is only 16x16, the advantace to have a bigger array like that is to have the ability to add obstacles. 
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

### food Position
