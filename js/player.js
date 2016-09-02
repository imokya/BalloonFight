var Player = function(type) {
	this.type = type || 1;
	this.status = Player.STATUS.stand;
	this.Container_constructor();
	this.init();
}

Player.STATUS = { stand:1, run:2, fly:3, flap:4, fall:5 };
Player.DIR = { left:1, right:-1 };
Player.MAX_SPEED_X = 4;
Player.MAX_SPEED_Y = 6;

var p = createjs.extend(Player, createjs.Container);

p.init = function() {
	
	this.v = {
		x:0,
		y:0
	}

	this.a = {
		x:0,
		y:0.2
	}

	this.f = 0.93;

	this.pos = {x:0,y:0};

	this.dir = Player.DIR.left;

	this.moving = false;
	this.ground = false;

	this.life = 2;
	this.dead = false;

	var spriteSheet = new createjs.SpriteSheet({
		images: ['img/player'+this.type+'.png'], 
		frames: [[1,1,32,48,0,16,24],[34,1,32,48,0,16,24],[67,1,32,48,0,16,24],[100,1,32,48,0,16,24],[133,1,30,48,0,15,24],[164,1,30,48,0,15,24],[195,1,32,48,0,16,24],[1,50,32,48,0,16,24],[34,50,32,48,0,16,24],[195,1,32,48,0,16,24],[67,50,32,48,0,16,24],[100,50,32,48,0,16,24],[133,50,30,24,0,15,12],[164,50,30,24,0,15,12],[195,50,22,26,0,11,13],[218,50,20,48,0,10,24],[1,99,20,48,0,12,22],[22,99,22,48,0,10,22],[45,99,32,46,0,16,23],[78,99,30,46,0,15,23],[109,99,30,46,0,15,23],[140,99,24,48,0,12,24],[165,99,26,46,0,14,22],[192,99,24,46,0,12,22],[140,99,24,48,0,12,24],[217,99,26,48,0,12,24],[1,148,24,48,0,12,24]],
		animations: {
			stand:[0,2,'stand',0.15],
			run: [3,5,'run',1],
			fly: [6,8,'fly',2.8],
			flap: [9,11,'flap',2.5],
			fall: [12,14,'fall'],
			stand_b:[15,17,'stand_b',0.15],
			run_b:[18,20,'run_b',1],
			fly_b:[21,23,'fly_b',2.8],
			flap_b:[24,26,'flap_b',2.5]
		}
	
	});
	this.sprite = new createjs.Sprite(spriteSheet,'stand');
	this.addChild(this.sprite);
}

p.setPosition = function(x,y) {
	this.pos.x = x;
	this.pos.y = y;
	this.x = this.pos.x;
	this.y = this.pos.y;
}

p.getRect = function() {
	var rect = this.getBounds();
	this.w = rect.width-18;
	this.h = rect.height;
	return new createjs.Rectangle(this.pos.x-this.w/2,this.pos.y-this.h/2,this.w,this.h);
}

p.turnLeft = function() {
	if(this.dead) return;
	this.a.x = -1;
	this.setDirection(Player.DIR.left);
	if(this.status == Player.STATUS.stand) 
		this.setStatus(Player.STATUS.run);
}

p.turnRight = function() {
	if(this.dead) return;
	this.a.x = 1;
	this.setDirection(Player.DIR.right);
	if(this.status == Player.STATUS.stand) 
		this.setStatus(Player.STATUS.run);
}

p.jump = function() {
	if(this.dead) return;
	this.v.y = 0;
	this.v.y -= 3;
	this.setStatus(Player.STATUS.flap);
}

p.update = function(dt) {

	if(this.v.y > 0) {
		if((this.moving && this.ground) || 
		  (!this.ground && this.status != Player.STATUS.fly)) {
			this.setStatus(Player.STATUS.fly);
		}
		this.ground = false;
	}

	this.v.x += this.a.x;
	this.v.y += this.a.y;

	if(this.v.y > Player.MAX_SPEED_Y) this.v.y = Player.MAX_SPEED_Y;

	this.v.x *= this.f;
	this.v.x *= this.f;
	
	this.pos.x += this.v.x;
	this.pos.y += this.v.y;

	var xMin = -this.w/2;
	var xMax = Config.w+this.w/2;
	if(this.pos.x < xMin) {
		this.pos.x = xMax;
	} else if(this.pos.x > xMax) {
		this.pos.x = xMin;
	}
	if(this.pos.y < this.h/2) {
		this.v.y = 0;
		this.pos.y = this.h/2;
	}

	if(this.pos.y > Config.h) {
		game.gameover();
	}

	this.x = this.pos.x;
	this.y = this.pos.y;
}

p.setStatus = function(status) {
	if(this.dead) return;
	if(status && this.status === status) return;
	var status = status || this.status;
	var suffix = this.life < 2 ? '_b' : '';
	switch(status) {
		case Player.STATUS.stand:
			this.sprite.gotoAndPlay('stand'+suffix);
			break;
		case Player.STATUS.run:
			this.sprite.gotoAndPlay('run'+suffix);
			break;
		case Player.STATUS.fly:
			this.sprite.gotoAndPlay('fly'+suffix);
			break;
		case Player.STATUS.flap:
			this.sprite.gotoAndPlay('flap'+suffix);
			break;
		case Player.STATUS.fall:
			this.sprite.gotoAndPlay('fall');
			break;
	}
	this.status = status;
}

p.setDirection = function(dir) {
	switch(dir) {
		case Player.DIR.left:
			this.sprite.scaleX = 1;
			break;
		case Player.DIR.right:
			this.sprite.scaleX = -1;
			break;
	}
}

createjs.promote(Player, 'Container');

module.exports = Player;
