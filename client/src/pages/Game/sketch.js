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
    let score = 0;
    let level = 1;

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
        game.enemies.push(new enemy(1, 1))
        gameState = 1
      }
    })

    // gameState = 1 "play game"
    states.push(function(){
      p.background(100);
      ship.draw();
      p.text("Score: " + score, 10, 15);
      p.text("Level: " + level, 10, 30);
      updateQueue(game.shots);
      updateQueue(game.enemies);

    })

    // gameState = 2 "End Game"
    states.push(function(){
      p.background(100);
      p.text("Score: " + score, 10, 15);
      p.text("Level: " + level, 10, 30);
      gameState = 2;
    })


    const newGame = function(){
      return {
        enemies: [],
        shots: [],
        level: 1,
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

    const enemy = function(x, y) { return {
        graphic: sprites.enemy,
        x: x,
        y: y,
        r: 50,
        left: this.x,
        right: this.x,
        speed: 20,
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

        shiftDown: function(){
          this.y = this.y + this.r
          this.speed = this.speed * -1
          if(this.y >= ship.y){
            //TODO: YOU LOSE
            gameSounds.song.stop();
            gameState = 2;

          }
        },

        draw: function(){
            if(this.left() <= 0 || this.right() >= width){
              this.shiftDown()
            } 
            this.x = this.x + this.speed
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
            score++;
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

    const startLevel = function(){
      for(var i = 1; i < game.level * 3; i++){
        let e = new enemy(i * 100, 100);
        game.enemies.push(e)
      }
    }

    const updateQueue = function(queue) {
      const sentinel = {}
      queue.push(sentinel)

      let obj = queue.shift()
      while(!Object.is(obj, sentinel)){
        if(obj.deleteMe){
          // let it get garbage collected?
        } else {
          obj.draw();
          queue.push(obj);
        }
        obj = queue.shift();
      }
    }

    p.draw = function () {
        states[gameState]()
    };
  };

