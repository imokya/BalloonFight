var extend = function(des,src) {
	for(var i in src) {
		des[i] = src[i];
	}
}

var OrientationTip = function(config) {
	this.config = {
		elem:null,
		mode:'landscape',
		id:'ori-tip',
		backgroundColor:'#000',
		icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC',
		w:60,
		h:97,
		zIndex:999,
		container:null
	}
	extend(this.config,config);
	this.init();
}

var p = OrientationTip.prototype;

p.init = function() {
	this.createDom();
	this.createStyle();
}

p.createDom = function() {
	var conf = this.config;
	this.elem = conf.elem || document.createElement('div');
	this.elem.style['box-sizing'] = 'border-box';
	this.elem.style['position'] = 'fixed';
	this.elem.style['width'] = '100%';
	this.elem.style['height'] = '100%';
	this.elem.style['top'] = '0px';
	this.elem.style['background-color'] = conf.backgroundColor;
	this.elem.style['z-index'] = conf.zIndex;
	this.elem.setAttribute('id',conf.id);
	var icon = document.createElement('div');
	icon.classList.add('tip-icon');
	icon.style['width'] = conf.w + 'px';
	icon.style['height'] = conf.h + 'px';
	icon.style['background'] = 'url('+conf.icon+') center center no-repeat';
	icon.style['background-size'] = 'cover';
	this.elem.appendChild(icon);
	this.container = conf.container || document.body;
	this.container.appendChild(this.elem);
}

p.createStyle = function() {
	var conf = this.config;
	var rmode = conf.mode == 'landscape' ? 'portrait' : 'landscape';
	var css = [
		'@media screen and (orientation:'+conf.mode+')',
		'{',
			'#'+conf.id+' { display:block; }',
		'} ',
		'@media screen and (orientation:'+rmode+')',
		'{',
			'#'+conf.id+' { display:none; }',
		'}',
		'#'+conf.id+'>div { position:absolute;margin:auto;top:0;right:0;bottom:0;left:0; }',
	].join('');	

	this.head = document.head || document.getElementsByTagName('head')[0];
	this.style = document.createElement('style');
	
	this.style.type = 'text/css';
	if(this.style.styleSheet) {
		this.style.styleSheet.cssText = css;
	} else {
		this.style.appendChild(document.createTextNode(css));
	}
	this.head.appendChild(this.style);
}

p.destroy = function() {
	this.elem && this.elem.parentNode.removeChild(this.elem);
	this.style && this.style.parentNode.removeChild(this.style);
}

module.exports = OrientationTip;
