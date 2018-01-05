export default function sketch (p) {

    var scoreBoard;
    var gameSounds;

    var gameOn = true;
    var enemySpeed = 0;
    var ship;
    var enemies = [];
    var shots = [];


    p.preload = function() {
        p.soundFormats('mp3', 'wav', 'ogg');

        p.gameSounds = {
            laserSound: p.loadSound('../sounds/laser_gun.wav'),
            blast: p.loadSound('../sounds/bomb.mp3'),
            song: p.loadSound('../sounds/trimbackground.wav'),
        }
        
        p.gameImages = {
            background: p.loadImage('../images/invader.jpg'),
        }
        
    }


    p.setup = function(){
        var canvas = p.createCanvas(800, 600);
        canvas.parent('sketch-holder');
        p.frameRate(60);

        scoreBoard = new p.scoreBoard();
        ship = new p.Ship();
        p.resetEnemies();

        gameSounds.song.loop();
        gameSounds.song.setVolume(0.5);
        p.makeRestartButton();
    }


    p.makeRestartButton = function(){
        var button = p.createButton("restart");
        button.position(810, 570);
        button.parent('sketch-holder');
        button.mousePressed(p.restartSketch); 
    }


    p.restartSketch = function(){
        enemies = [];
        shots = [];
        ship = new p.Ship();
        scoreBoard.reset();
        p.resetEnemies();
        gameOn = true;
    }


    p.resetEnemies = function(){
        var max_enemy_cols = 9;
        var max_enemies = 75;
        var enemySpeed = Math.max(scoreBoard.level * .25, 1);
        var numberOfEnemies = Math.min(scoreBoard.level + 6, max_enemies);

        enemies = [];
        for (var i=0; i < numberOfEnemies; i++) {
            var col = i % max_enemy_cols;
            var row = Math.floor(i/max_enemy_cols)
            p.enemy = new p.Enemy(col *80 +80, row *60 +60);
            p.enemy.xdir = enemySpeed
            enemies.push(p.enemy)
        }
    }


    p.draw = function() {
        if (gameOn){
            p.background(p.gameImages.background);
            p.checkGameStatus();
            p.checkShip();
            p.moveShots();
            p.checkShots();
            p.moveEnemies();
            p.checkEnemies();
        }
    }


    // Updates shots positions
    p.moveShots = function(){    
        for (var i=0; i < shots.length; i++){
            shots[i].move();
            shots[i].show();
            for (var j=0; j < enemies.length; j++) {
                if (shots[i].hits(enemies[j])) {
                    enemies[j].evap();
                    shots[i].evaporate();
                }
            }
        }
    }

    // Removes shots that have collided or passed off screen
    p.checkShots = function(){   
        for (var i = shots.length-1; i >= 0; i--) {
            if (shots[i].toDelete){
                shots.splice(i,1);
            }
        }
    }

    // Updates enemies positions
    p.moveEnemies = function(){
        var edge = false;
        
        for (var i = 0; i < enemies.length; i++){
            enemies[i].show();
            enemies[i].move();
            if (enemies[i].x > 760 || enemies[i].x <0){
                edge = true;
            }
            if (enemies[i].y > 550){
                p.gameOver();
            }
        }

        if (edge) {
            for (var i=0; i< enemies.length; i++){
                enemies[i].shiftDown();
            }
        }
    }


    // Removes dead enemies
    p.checkEnemies =  function(){
        for (var i= enemies.length-1; i >= 0; i--) {
            if (enemies[i].toDelete){
                gameSounds.blast.play();
                scoreBoard.increaseScore(1);
                enemies.splice(i,1);
            }
        }
    }

    //check to see if any enemies are left
    p.checkGameStatus = function() {
        if (enemies.length == 0) {
            scoreBoard.increaseLevel(1);
            ship.reduceRecharge(25);
            p.resetEnemies();
        }
    }

    p.checkShip = function(){
        if(p.keyIsDown(p.LEFT_ARROW) & p.keyIsDown(p.RIGHT_ARROW)){
            ship.setDir(0);
        } else if(p.keyIsDown(p.LEFT_ARROW)){
            ship.setDir(-1);
        } else if(p.keyIsDown(p.RIGHT_ARROW)){
            ship.setDir(1);
        } else {
            ship.setDir(0);
        }
        ship.move();
        ship.show();
    }

    p.gameOver = function(){
        gameOn = false;
        window.location.href = "/gameOver/"+String(scoreBoard.score);   
    }

    p.keyPressed = function () {
        if (p.key === " " && gameOn) {
            if (ship.ready){
                ship.shoot();
                var shot = new p.Shot(ship.x, p.height);
                gameSounds.laserSound.play();
                shots.push(shot);
            }
        }
    }
}

