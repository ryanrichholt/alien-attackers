import Ship from "./ship";
import shipSprite from '../../images/ship.png';
import Enemies from "./enemies";
import enemySprite from '../../images/mdInvader2.png';



export default function sketch (p) {
    const width = 800
    const height = 600

    const ship = {
        graphic: p.loadImage(shipSprite),
        x: width/2,
        y: height - 50,
        draw: function(){
            p.image(this.graphic, this.x, this.y, 50, 50)
        }
    }

    p.setup = function () {
      p.createCanvas(width, height);
      p.frameRate(60);
    };

    p.keyPressed = event => {
        if(event.key === "ArrowRight"){
            ship.x += 5
        } else if(event.key === "ArrowLeft"){
            ship.x -= 5
        }
    }

    p.draw = function () {
      p.background(100);
      ship.draw()
    };
  };

// import scoreBoard from "./scoreboard"
// import Shot from "./shots"
// 
// import Enemy from "./enemies"

// function sketch (p) {
//     console.log('p5 given to sketch', p)

//     var scoreBoard;
//     var gameSounds;

//     var gameOn = true;
//     var enemySpeed = 0;
//     var ship;
//     var enemies = [];
//     var shots = [];


//     preload = function() {
//         soundFormats('mp3', 'wav', 'ogg');

//         gameSounds = {
//             laserSound: loadSound('../sounds/laser_gun.wav'),
//             blast: loadSound('../sounds/bomb.mp3'),
//             song: loadSound('../sounds/trimbackground.wav'),
//         }
        
//         gameImages = {
//             background: loadImage('../images/invader.jpg'),
//         }
        
//     }


//     setup = function(){
//         var canvas = p.createCanvas(800, 600);
//         canvas.parent('sketch-holder');
//         p.frameRate(60);

//         scoreBoard = new scoreBoard();
//         ship = new Ship();
//         resetEnemies();

//         gameSounds.song.loop();
//         gameSounds.song.setVolume(0.5);
//         makeRestartButton();
//     }


//     makeRestartButton = function(){
//         var button = p.createButton("restart");
//         button.position(810, 570);
//         button.parent('sketch-holder');
//         button.mousePressed(restartSketch); 
//     }


//     restartSketch = function(){
//         enemies = [];
//         shots = [];
//         ship = new Ship();
//         scoreBoard.reset();
//         resetEnemies();
//         gameOn = true;
//     }


//     resetEnemies = function(){
//         var max_enemy_cols = 9;
//         var max_enemies = 75;
//         var enemySpeed = Math.max(scoreBoard.level * .25, 1);
//         var numberOfEnemies = Math.min(scoreBoard.level + 6, max_enemies);

//         enemies = [];
//         for (var i=0; i < numberOfEnemies; i++) {
//             var col = i % max_enemy_cols;
//             var row = Math.floor(i/max_enemy_cols)
//             enemy = new Enemy(col *80 +80, row *60 +60);
//             enemy.xdir = enemySpeed
//             enemies.push(enemy)
//         }
//     }


//     draw = function() {
//         if (gameOn){
//             p.background(gameImages.background);
//             checkGameStatus();
//             checkShip();
//             moveShots();
//             checkShots();
//             moveEnemies();
//             checkEnemies();
//         }
//     }


//     // Updates shots positions
//     moveShots = function(){    
//         for (var i=0; i < shots.length; i++){
//             shots[i].move();
//             shots[i].show();
//             for (var j=0; j < enemies.length; j++) {
//                 if (shots[i].hits(enemies[j])) {
//                     enemies[j].evap();
//                     shots[i].evaporate();
//                 }
//             }
//         }
//     }

//     // Removes shots that have collided or passed off screen
//     checkShots = function(){   
//         for (var i = shots.length-1; i >= 0; i--) {
//             if (shots[i].toDelete){
//                 shots.splice(i,1);
//             }
//         }
//     }

//     // Updates enemies positions
//     moveEnemies = function(){
//         var edge = false;
        
//         for (var i = 0; i < enemies.length; i++){
//             enemies[i].show();
//             enemies[i].move();
//             if (enemies[i].x > 760 || enemies[i].x <0){
//                 edge = true;
//             }
//             if (enemies[i].y > 550){
//                 gameOver();
//             }
//         }

//         if (edge) {
//             for (var i=0; i< enemies.length; i++){
//                 enemies[i].shiftDown();
//             }
//         }
//     }


//     // Removes dead enemies
//     checkEnemies =  function(){
//         for (var i= enemies.length-1; i >= 0; i--) {
//             if (enemies[i].toDelete){
//                 gameSounds.blast.play();
//
                 // scoreBoard.increaseScore(1);
//                 enemies.splice(i,1);
//             }
//         }
//     }

//     //check to see if any enemies are left
//     checkGameStatus = function() {
//         if (enemies.length == 0) {
//             scoreBoard.increaseLevel(1);
//             ship.reduceRecharge(25);
//             resetEnemies();
//         }
//     }



//     gameOver = function(){
//         gameOn = false;
//         window.location.href = "/gameOver/"+String(scoreBoard.score);   
//     }

//     keyPressed = function () {
//         if (key === " " && gameOn) {
//             if (ship.ready){
//                 ship.shoot();
//                 var shot = new Shot(ship.x, height);
//                 gameSounds.laserSound.play();
//                 shots.push(shot);
//             }
//         }
//     }
// }


// export default sketch