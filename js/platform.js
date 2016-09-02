var Platform = function() {
	this.Container_constructor();
	this.init();
}

var p = createjs.extend(Platform, createjs.Container);

p.init = function() {
	var texture = new createjs.Bitmap('img/platform.png');
	var w = texture.getBounds().width;
	var h = texture.getBounds().height;
	this.addChild(texture);
	this.setBounds(0,0,w,h);
	
}

p.getRect = function() {
	var rect = this.getBounds();
	var w = rect.width;
	var h = rect.height-2;
	return new createjs.Rectangle(this.x,this.y+1,w,h);
}

createjs.promote(Platform, 'Container');

module.exports = Platform;
