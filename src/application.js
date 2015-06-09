var paper = Raphael(document.getElementById('canvas_container'), 360, 360);
var GAMESPEED = 200;
var color = '#a6ce39';
var snake = [
    [8, 8]
];
var snakeDirection;
var previousDirection;
var size = 16;
var gameover;
var field;

function restore() {
    snake = [
        [8, 8]
    ];
    snakeDirection = 'right';
    previousDirection = 'right';
    gameover = false;
    paper.clear();
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
}


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
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

function drawPlayField() {
    paper.clear();
    for (var i = 0; i < size + 2; i++) {
        for (var j = 0; j < size + 2; j++) {
            if (field[j][i] > 0) {
                paper.rect((i * 20), (j * 20), 20, 20).attr('fill', color).attr('stroke-width', 1).attr('stroke', color);
            }
        }
    }
}

function foodPosition() {
    var x = Math.floor(Math.random() * 16) + 1;
    var y = Math.floor(Math.random() * 16) + 1;
    var snakePos = snake[snake.length - 1];

    if (field[x][y] > 0) {
        foodPosition();
    } else if (snakePos[0] == x && snakePos[1] == y) {
        foodPosition();
    } else {
        field[x][y] = 2;
    }
}

function displayGameOver() {
    var txt = paper.rect(120, 140, 120, 80).attr('fill', 'black').attr('stroke-width', 0);
    txt.click(function() {
        startGame();
    });
    var t = paper.text(180, 170, "GAME\nOVER").attr('fill', 'white').click(function() {
        startGame();
    });
    var score = snake.length - 1;
    paper.text(180, 200, "score " + score).attr('fill', 'white').click(function() {
        startGame();
    });
}

function gameController() {
    if (gameover === true) {
        displayGameOver();
        return 0;
    }

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
        case 'up':
            if (previousDirection == 'down') {
                snake.push(currentHeadPosition);
                futureHeadPosition = [currentHeadPosition[0] + 1, currentHeadPosition[1]];
                snake.push(futureHeadPosition);
                break;
            }
            previousDirection = 'up';
            snake.push(currentHeadPosition);
            futureHeadPosition = [currentHeadPosition[0] - 1, currentHeadPosition[1]];
            snake.push(futureHeadPosition);
            break;
        case 'right':
            if (previousDirection == 'left') {
                snake.push(currentHeadPosition);
                futureHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] - 1];
                snake.push(futureHeadPosition);
                break;
            }
            previousDirection = 'right';
            snake.push(currentHeadPosition);
            futureHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] + 1];
            snake.push(futureHeadPosition);
            break;
        case 'down':
            if (previousDirection == 'up') {
                snake.push(currentHeadPosition);
                futureHeadPosition = [currentHeadPosition[0] - 1, currentHeadPosition[1]];
                snake.push(futureHeadPosition);
                break;
            }
            previousDirection = 'down';
            snake.push(currentHeadPosition);
            futureHeadPosition = [currentHeadPosition[0] + 1, currentHeadPosition[1]];
            snake.push(futureHeadPosition);
            break;
        default:
            return;
    }

    if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 1) {
        gameover = true;
    } else if (field[futureHeadPosition[0]][futureHeadPosition[1]] == 2) {
        foodPosition();
    } else {
        var currentTailPosition = snake.shift();
        field[currentTailPosition[0]][currentTailPosition[1]] = 0;
    }

    for (var i = snake.length - 1; i >= 0; i--) {
        field[snake[i][0]][snake[i][1]] = 1;
    }

    drawPlayField();
    setTimeout(function() {
        gameController();
    }, GAMESPEED);
}

function startGame() {
    restore();
    foodPosition();
    drawPlayField();
    gameController();
}

function prepeareGame() {
    restore();
    drawPlayField();

    paper.rect(120, 140, 120, 80).attr('fill', 'black').attr('stroke-width', 0).click(function() {
        startGame();
    });
    paper.text(180, 90, "click to\nSTART").attr('fill', 'white').click(function() {
        startGame();
    });
}

window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    // dizmo.setSize(360, 360);
    dizmo.canDock(true);

    prepeareGame();

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

    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };
});