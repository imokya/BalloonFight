(function(global) {
	
	var Config = global.Config = require('./config');
	var Player = require('./Player');
	var Font = require('./text');
	var platforms = [];
	var player,enemy;

	var Game = function() {
		this.init();
	}

	Game.prototype.init = function() {
		this.w = Config.w = window.innerWidth;
		this.h = Config.h = window.innerHeight;
		this.can = document.querySelector('#game');
		this.can.setAttribute('width',this.w);
		this.can.setAttribute('height',this.h);
		this.stage = new createjs.Stage(this.can);
		createjs.Touch.enable(this.stage);
		createjs.Ticker.on('tick',this.tick.bind(this));
		this.stage.update();

		this.container = new createjs.Container();

		this.createWater();
		this.createPlatform();
		this.createPlayer();

		this.stage.addChild(this.container);
		this.createControl();
	}

	Game.prototype.tick = function(dt) {
		if(!player.dead && !enemy.dead) this.checkCollision();
		this.stage.update();
		player.update(dt);
		enemy.update(dt);
	}

	Game.prototype.gameover = function() {
		for(var i in platforms) {
			var platform = platforms[i];
			this.container.removeChild(platform);
		}
		platforms = [];
		var font = new Font();
		font.setText('game over');
		font.x = Config.w / 2; 
		font.y = Config.h / 2;
		this.stage.addChild(font);
		this.stage.removeChild(player);
		this.stage.removeChild(enemy);
		this.stage.off('tick');
	}

	Game.prototype.checkCollision = function() {
		var game = this;
		platforms.forEach(function(platform) {
			game.checkPlatform(player,platform);
			game.checkPlatform(enemy,platform);
		})
		this.checkEnemy();
	}

	Game.prototype.checkEnemy = function() {
		var playerRect = player.getRect();
		var enemyRect = enemy.getRect();
		playerRect.pad(-15,12,12,0);
		enemyRect.pad(-15,12,12,0);
		
		if(playerRect.intersects(enemyRect)) {
			var rect = playerRect.intersection(enemyRect);
			if(rect) {
				if(rect.width < rect.height) {
					if(player.v.x > 0) {
						player.pos.x -= rect.width;
					} else {
						player.pos.x += rect.width;
					}
					player.v.x *= -1;
				} else {
					if(player.v.y > 0) {
						player.pos.y -= rect.height;
					} else {
						player.pos.y += rect.height;
					}
					player.v.y *= -1;
				}
				if(rect.height < 40) {
					var target = player.pos.y > enemy.pos.y ? player : enemy;
					if(--target.life<1) {
						target.setStatus(Player.STATUS.fall);
						target.a.y = 0.6;
						target.dead = true;
					} else {
						target.setStatus();
					}
				}
			}
		}
	}

	Game.prototype.checkPlatform = function(player,platform) {
		var playerRect = player.getRect();
		var rect = platform.getRect();
		var yMin = rect.y-playerRect.height/2-playerRect.height/2-2;
		var yMax = yMin + 10;
		if(player.v.y > 0 && playerRect.x > rect.x && playerRect.x < rect.x + rect.width) {
			if(playerRect.y > yMin && playerRect.y < yMax) {
				player.v.y = 0;
				player.pos.y = rect.y-playerRect.height/2;
				if(player.status == Player.STATUS.fly || player.status == Player.STATUS.flap) {
					player.moving = false;
					player.a.x = 0;
				}
				if(!player.moving) {
					player.setStatus(Player.STATUS.stand);
				} else {
					player.setStatus(Player.STATUS.run);
				}
				player.ground = true;
				return true;
			} 
		}
		return false;
	}

	Game.prototype.createControl = function() {
		var touch = 'ontouchmove' in window;
		touch ? this.createTouchControl() : this.createKeyboardControl();
	}

	Game.prototype.createTouchControl = function() {
		var left = new createjs.Bitmap('img/left.png');
		left.x = 20;
		this.stage.addChild(left);

		var right = new createjs.Bitmap('img/right.png');
		right.x = 90;
	
		this.stage.addChild(right);

		left.alpha = right.alpha = 0.8;
		left.y = right.y = Config.h - 90;
		
		var LRect = left.getBounds();
		var RRect = right.getBounds();
		LRect.x = left.x;
		LRect.y = left.y;
		RRect.x = right.x;
		RRect.y = right.y;

		this.stage.on('stagemousedown',function(e) {
			var tx = e.stageX;
			var ty = e.stageY;
			if(LRect.contains(tx,ty)) {
				player.turnLeft();
				player.moving = true;
			} else if(RRect.contains(tx,ty)) {
				player.turnRight();
				player.moving = true;
			} else {
				player.jump();
			}
		});
		this.stage.on('stagemouseup',function(e) {
			if(player.status == Player.STATUS.run) {
				player.a.x = 0;
				player.moving = false;
			}
		});
	}

	Game.prototype.createKeyboardControl = function() {
		document.addEventListener('keydown',function(e) {
			switch(e.keyCode) {
				case 37:
					player.turnLeft();
					player.moving = true;
					break;
				case 39:
					player.turnRight();
					player.moving = true;
					break;
				case 32:
					player.jump();
					break;
			}
		}, false);
		document.addEventListener('keyup',function(e) {
			if(player.status == Player.STATUS.run) {
				player.a.x = 0;
				player.moving = false;
			}
		},false);
	}

	Game.prototype.createPlayer = function() {
		player = new Player();
		player.setPosition(150,150);
		this.stage.addChild(player);

		enemy = new Player(2);
		enemy.setPosition(450,50);
		this.stage.addChild(enemy);
	}

	Game.prototype.createWater = function() {
		var water = new (require('./water'));
		this.container.addChild(water);
		water.y = Config.h - water.getBounds().height+20;
	}

	Game.prototype.createPlatform = function() {
		platforms = [];
		var game = this;
		var pos = [{x:100,y:200},{x:200,y:100},{x:400,y:150}];
		pos.forEach(function(o) {
			var platform = new (require('./platform'));
			platform.x = o.x;
			platform.y = o.y;
			game.container.addChild(platform);
			platforms.push(platform);
		});
	}
	
	function load() {
		var queue = global.queue = new createjs.LoadQueue(false);
		queue.on('complete', onLoadComplete);
		queue.loadManifest(Config.manifest,true,'img/');
	}

	function onLoadComplete() {
		global.game = new Game();
	}
	
	new (require('./orientation'))({
		mode:'portrait'
	});

	function resize() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		if(w > h) {
			load();
			window.removeEventListener('resize',resize);
		}
	}
	window.addEventListener('resize',resize,false);
	resize();
	
})(window);





