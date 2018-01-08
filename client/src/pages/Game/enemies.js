import enemySprite from '../../images/mdInvader2.png';

function Enemy(p, x, y) {
    this.x = x;
    this.y = y;
    this.r = 40;
    this.graphic = p.loadImage(enemySprite);

    this.xdir = 1;
    this.ydir = 0;
    // this.velx = 0.0;
    // this.accel = 0;
    // this.force = 0;
    this.toDelete = false;

    this.evap = function() {
        this.toDelete = true;
    }

    this.shiftDown = function(){
        this.xdir *= -1;
        this.y += this.r;
    }

    this.move =function(){
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    this.show = function(){
        p.image(this.graphic, this.x, this.y, this.r, this.r);
        //fill(255, 0, 200);
        //ellipse(this.x, this.y, this.r*2, this.r*2);
    }
};

export default Enemy