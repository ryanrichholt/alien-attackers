import shipSprite from '../../images/ship.png'

function Ship(p, x, y){
	var self = this

	this.x = x;
	this.y = y;
	this.graphic = p.loadImage(shipSprite);
	this.weapon = null;
	this.recharge = 500;
	this.ready = true;
	
	this.dir = 0;
	this.vel = 0;
	this.maxVel = 10;
	this.accel = 1.5;
	this.friction = 0.8;

	this.reduceRecharge = function(amount){
		this.recharge -= amount;
		if (this.recharge < 0){
			this.recharge = 0
		}
	}

	this.show = function() {
		p.image(this.graphic, this.x, this.y+170, 50);
	}

	this.setDir = function(dir) {
		this.dir = dir;
	}

	this.move = function(dir){
		if(this.dir === 0){
			this.vel = this.vel * this.friction;
		} else {
			this.vel += this.dir * this.accel;
		}
		
		this.vel = Number((this.vel).toFixed(3));

		if(this.vel > this.maxVel){
			this.vel = this.maxVel;
		} else if (this.vel < -1 * this.maxVel){
			this.vel = -1 * this.maxVel;
		}

		this.x += this.vel;
		this.x = p.constrain(this.x, 0, 750);
	}

	this.shoot = function(){
		this.ready = false;
		setTimeout(function(){
			self.ready = true;
		}, this.recharge);
	}
}

export default Ship