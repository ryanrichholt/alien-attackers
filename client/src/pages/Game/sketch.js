import Ship from "./ship";
import Enemies from "./enemies";

import shipSprite from '../../images/ship.png';
import enemySprite from '../../images/mdInvader2.png';
import startButton from '../../images/startbutton.jpg';

export default function sketch (p) {
    let gameState = 0;
    const states = [];
    const width = 800;
    const height = 600;

    let game = null;


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
      // p.text('Click anywhere to start!', width/2, height/2)
      p.mousePressed = event => {
        // setup the game
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
      updateQueue(game.shots);
      updateQueue(game.enemies);
    })

    //TODO Third state that allows you to post score to profile
    const newGame = function(){
      return {
        enemies: [],
        shots: [],
        level: 0,
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
            gameState = 0
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
        ship.shoot()
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

