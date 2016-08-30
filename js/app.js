// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';//image of bugs
    this.y_pos_choice = [230,145,65];//starting y-coordinates of bugs
    this.x = -150; //initial x coordinate for bugs
    this.y = this.y_pos_choice[randomize(2,0)]; //randomly selecting a y coordinate from above
    this.speed = randomize(400,200);// possible speeds include any between 400-200
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {// came with instructions
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt);//incrementing the x position by this.speed * dt

    if (this.x > 530) {//this makes bugs loop back to start. Not sure if this is the best way to do this but it works. 
            this.x = -150;//reset x position to -150
            this.y = this.y_pos_choice[randomize(2,0)];//chooses a new y position
            this.speed = randomize(400,200);//chooses a new speed
    }

    collide(this);//checks for any collisions 

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';//draws player image
    this.y = 400;//initial position of player
    this.x = 200;
    this.change_x = 0;//starts the incremental changes in x and y
    this.change_y = 0;
};

Player.prototype.update = function(){
                            
    this.x += this.change_x;// changes x coordinate

    if (this.x <= -10 || this.x >= 405){// keeps the player on the board
        this.x -= this.change_x;
    }

    this.change_x = 0;//only allows player advance one square at a time

    this.y += this.change_y;// changes y coordinate

    if (this.y <= -30 || this.y >= 420 ){// keeps player on board
        this.y -= this.change_y;
    }

    this.change_y = 0;// only allows player to advance on ssquare at a time

    if (this.y <= 25) {//puts the player back to the start when he wins. #endlessGAME
        while (this.y <= 400){
            this.y += 1;
            this.x = 200;
        }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left'){//inputs for movement of player
        this.change_x = -102;
    }
    if (key === 'right'){
        this.change_x = 102;
    }
    if (key === 'up'){
        this.change_y = -82;
    }
    if (key === 'down'){
        this.change_y = 82;
    }
};

var randomize = function (max,min) { //helper function in a few of the other functions. Got it from MDN
    return Math.floor(Math.random() * (max - min + 1)) + min; //this is from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

var collide = function (enemy_bug) {//collide function checks to see if the two images are too close and resets player
    var dist_x = player.x - enemy_bug.x;
    var dist_y = player.y - enemy_bug.y;
    if (dist_x >= -50 && dist_x <=50 && dist_y >= -20 && dist_y <=20) {
        while (player.y <= 400){
            player.y += 1;
            player.x = 200;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];// array of enemies 
allEnemies.push(new Enemy());// instantiates bug 


for (var i = 0 ; i < 5 ; i++){ // makes 5 bugs with allEnemies
    allEnemies.push(new Enemy());
}

var player = new Player();// instantiates player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
