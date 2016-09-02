var Water = function() {
	this.Container_constructor();
	this.init();
}

var p = createjs.extend(Water, createjs.Container);

p.init = function() {
	var texture = new createjs.Bitmap('img/water.png');
	var w = texture.getBounds().width;
	var h = texture.getBounds().height;
	var num = Math.ceil(Config.w / w);
	for(var i = 0;i < num; i++) {
		var t = texture.clone();
		t.x = i * w;
		this.addChild(t);
	}
	this.setBounds(0, 0, Config.w, h);
}

createjs.promote(Water, 'Container');

module.exports = Water;