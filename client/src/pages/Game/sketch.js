import Ship from "./ship";
import Enemies from "./enemies";

import shipSprite from '../../images/ship.png';
import enemySprite from '../../images/mdInvader2.png';
import startButton from '../../images/startbutton.jpg';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import laser from '../../sounds/laser_gun.wav';
import blast from '../../sounds/bomb.mp3';
import bksound from '../../sounds/trimbackground.wav';

import axios from "axios";

export default function sketch (p) {
    let gameState = 0;
    const states = [];
    const width = 800;
    const height = 600;

    let game = null;
    let enemy_speed = 5

    let gameSounds;
    let userProfile;

    p.preload = function() {
        p.soundFormats('mp3', 'wav', 'ogg');
        gameSounds = {
            laserSound: p.loadSound(laser),
            blast: p.loadSound(blast),
            song: p.loadSound(bksound),
        }

        axios.get("api/profile").then(response => { userProfile = response.data.user });
    }

    const sprites = {
      // Preload all the assets
      ship: p.loadImage(shipSprite),
      enemy: p.loadImage(enemySprite),
      startImg: p.loadImage(startButton)
    }

    p.setup = function(){
      p.createCanvas(width, height);
      p.frameRate(60);
    };
    
    // gameState = 0 "menu"
    states.push(function(){
      p.background(0);
      p.image(sprites.startImg, 0, 0);
      p.mousePressed = event => {
        // setup the game
        gameSounds.song.loop();
        p.mousePressed = null
        game = newGame()
        gameState = 1
      }
    })

    // gameState = 1 "play game"
    states.push(function(){
      p.background(100);
      ship.draw();
      p.text("Score: " + game.score, 10, 15);
      p.text("Level: " + game.level, 10, 30);
      updateQueue(game.shots);
      updateQueue(game.enemies);
      checkEdge(game.enemies);          

      if(game.enemies.length === 0){
        game.level += 1;
        let total_enemies = 3 * game.level
        let columns = (width/2)/55  // enemies can fill half the width of the game
        let rows = (total_enemies % columns) + 1
        console.log(game.level, total_enemies, columns, rows)
        

        let col = 1
        let row = 1
        while(game.enemies.length < total_enemies){
          console.log('new enemy', col*55, row*55)
          game.enemies.push(new enemy(col*55, row*55))
          col = col + 1
          if(col > columns){
            col = 1
            row = row + 1
          }
        }
      }

    })

    // gameState = 2 "End Game"
    states.push(function(){
      p.background(100);
      p.text("Score: " + game.score, 10, 15);
      p.text("Level: " + game.level, 10, 30);
      p.text("Click anywhere to start over", 10, 45)

    })


    const newGame = function(){
      return {
        enemies: [],
        shots: [],
        level: 0,
        score: 0
      }
    }
  
    const ship = {
        graphic: sprites.ship,
        x: width/2,
        x_speed: 0,
        y: height - 50,
        y_speed: 0,
        
        shoot: function(){
          let s = new shot(ship.x + 25, ship.y + 15)
          game.shots.push(s)
        },

        draw: function(){
            this.x = this.x + this.x_speed
            p.image(this.graphic, this.x, this.y, 50, 50)
        }
    }

    const shiftDown = enemy => {
      let lose = false;
      for(var i=0; i < game.enemies.length; i++){
        let enemy = game.enemies[i]
        enemy.y = enemy.y + enemy.r/2

        if(enemy.y >= height - 45){
          lose = true;
          break
        }
      }
      if(lose){
        axios.post("api/profile/score", { score: game.score })
        .then(() => {
          console.log('sent score...')
          p.mousePressed = event => {
            gameState = 0
          }
        })
        .catch(() => {
          console.log('unable to post score...')
          p.mousePressed = event => {
            gameState = 0
          }
        })
        gameSounds.song.stop();
        gameState = 2;
      }
    }

    const checkEdge = enemies => {
      for(var i=0; i < enemies.length; i++){
        let enemy = enemies[i]
        if(enemy.left() <= 1 || enemy.right() >= width){
          console.log('Shift down!')
          enemy_speed = enemy_speed * -1
          shiftDown()
          break
        } 
      }
    }

    const enemy = function(x, y) { return {
        graphic: sprites.enemy,
        x: x,
        y: y,
        r: 50,
        health: 100,
        deleteMe: false,

        left: function(){
          return this.x
        },

        right: function(){
          return this.x + this.r
        },

        hit: function(damage){
          this.health = this.health - damage
          if(this.health <= 0){
            this.deleteMe = true
          }
        },

        draw: function(){
            this.x = this.x + enemy_speed  
            p.image(this.graphic, this.x, this.y, this.r, this.r)
        }
    }}

    const shot = function(x, y) { return {
      x: x,
      y: y,
      r: 5,
      damage: 10,
      deleteMe: false,
      
      draw: function(){
        this.y = this.y - 10;
        
        if(this.y < 0){
          this.deleteMe = true;
        }

        for(let i=0; i < game.enemies.length; i++){
          let e = game.enemies[i]
          if(this.hits(e)){
            this.deleteMe = true;
            e.hit(this.damage)
            gameSounds.blast.play();
            game.score++;
          }
        }

        p.ellipse(this.x, this.y, this.r, this.r)
      },
      
      hits: function(enemy) {
        var d = p.dist(this.x, this.y, enemy.x, enemy.y);
        if (d < this.r + enemy.r) {
          return true;
        } else {
          return false;
        }
      },

    }}

    p.keyPressed = event => {
      if(event.code === "ArrowRight"){
        ship.x_speed += 10
      } else if(event.code === "ArrowLeft"){
        ship.x_speed -= 10
      } else if(event.code === "Space"){
        ship.shoot();
        gameSounds.laserSound.play();
      }
    }

    p.keyReleased = event => {
      if(event.code === "ArrowRight"){
          ship.x_speed -= 10
      } else if(event.code === "ArrowLeft"){
          ship.x_speed += 10
      }
    }

    const updateQueue = queue => {
      for(var i=queue.length -1; i >= 0; i--){
        let obj = queue[i]
        if(obj.deleteMe){
          queue.splice(i,1)
        } else {
          obj.draw()
        }
      }
    }

    p.draw = function () {
        states[gameState]()
    };
  };

