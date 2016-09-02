!function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){!function(t){function e(){var e=t.queue=new createjs.LoadQueue((!1));e.on("complete",s),e.loadManifest(h.manifest,!0,"img/")}function s(){t.game=new p}function n(){var t=window.innerWidth,i=window.innerHeight;t>i&&(e(),window.removeEventListener("resize",n))}var o,a,h=t.Config=i(2),r=i(1),c=i(5),d=[],p=function(){this.init()};p.prototype.init=function(){this.w=h.w=window.innerWidth,this.h=h.h=window.innerHeight,this.can=document.querySelector("#game"),this.can.setAttribute("width",this.w),this.can.setAttribute("height",this.h),this.stage=new createjs.Stage(this.can),createjs.Touch.enable(this.stage),createjs.Ticker.on("tick",this.tick.bind(this)),this.stage.update(),this.container=new createjs.Container,this.createWater(),this.createPlatform(),this.createPlayer(),this.stage.addChild(this.container),this.createControl()},p.prototype.tick=function(t){o.dead||a.dead||this.checkCollision(),this.stage.update(),o.update(t),a.update(t)},p.prototype.gameover=function(){for(var t in d){var e=d[t];this.container.removeChild(e)}d=[];var i=new c;i.setText("game over"),i.x=h.w/2,i.y=h.h/2,this.stage.addChild(i),this.stage.removeChild(o),this.stage.removeChild(a),this.stage.off("tick")},p.prototype.checkCollision=function(){var t=this;d.forEach(function(e){t.checkPlatform(o,e),t.checkPlatform(a,e)}),this.checkEnemy()},p.prototype.checkEnemy=function(){var t=o.getRect(),e=a.getRect();if(t.pad(-15,12,12,0),e.pad(-15,12,12,0),t.intersects(e)){var i=t.intersection(e);if(i&&(i.width<i.height?(o.v.x>0?o.pos.x-=i.width:o.pos.x+=i.width,o.v.x*=-1):(o.v.y>0?o.pos.y-=i.height:o.pos.y+=i.height,o.v.y*=-1),i.height<40)){var s=o.pos.y>a.pos.y?o:a;--s.life<1?(s.setStatus(r.STATUS.fall),s.a.y=.6,s.dead=!0):s.setStatus()}}},p.prototype.checkPlatform=function(t,e){var i=t.getRect(),s=e.getRect(),n=s.y-i.height/2-i.height/2-2,o=n+10;return t.v.y>0&&i.x>s.x&&i.x<s.x+s.width&&i.y>n&&i.y<o&&(t.v.y=0,t.pos.y=s.y-i.height/2,t.status!=r.STATUS.fly&&t.status!=r.STATUS.flap||(t.moving=!1,t.a.x=0),t.moving?t.setStatus(r.STATUS.run):t.setStatus(r.STATUS.stand),t.ground=!0,!0)},p.prototype.createControl=function(){var t="ontouchmove"in window;t?this.createTouchControl():this.createKeyboardControl()},p.prototype.createTouchControl=function(){var t=new createjs.Bitmap("img/left.png");t.x=20,this.stage.addChild(t);var e=new createjs.Bitmap("img/right.png");e.x=90,this.stage.addChild(e),t.alpha=e.alpha=.8,t.y=e.y=h.h-90;var i=t.getBounds(),s=e.getBounds();i.x=t.x,i.y=t.y,s.x=e.x,s.y=e.y,this.stage.on("stagemousedown",function(t){var e=t.stageX,n=t.stageY;i.contains(e,n)?(o.turnLeft(),o.moving=!0):s.contains(e,n)?(o.turnRight(),o.moving=!0):o.jump()}),this.stage.on("stagemouseup",function(t){o.status==r.STATUS.run&&(o.a.x=0,o.moving=!1)})},p.prototype.createKeyboardControl=function(){document.addEventListener("keydown",function(t){switch(t.keyCode){case 37:o.turnLeft(),o.moving=!0;break;case 39:o.turnRight(),o.moving=!0;break;case 32:o.jump()}},!1),document.addEventListener("keyup",function(t){o.status==r.STATUS.run&&(o.a.x=0,o.moving=!1)},!1)},p.prototype.createPlayer=function(){o=new r,o.setPosition(150,150),this.stage.addChild(o),a=new r(2),a.setPosition(450,50),this.stage.addChild(a)},p.prototype.createWater=function(){var t=new(i(6));this.container.addChild(t),t.y=h.h-t.getBounds().height+20},p.prototype.createPlatform=function(){d=[];var t=this,e=[{x:100,y:200},{x:200,y:100},{x:400,y:150}];e.forEach(function(e){var s=new(i(4));s.x=e.x,s.y=e.y,t.container.addChild(s),d.push(s)})},new(i(3))({mode:"portrait"}),window.addEventListener("resize",n,!1),n()}(window)},function(t,e){var i=function(t){this.type=t||1,this.status=i.STATUS.stand,this.Container_constructor(),this.init()};i.STATUS={stand:1,run:2,fly:3,flap:4,fall:5},i.DIR={left:1,right:-1},i.MAX_SPEED_X=4,i.MAX_SPEED_Y=6;var s=createjs.extend(i,createjs.Container);s.init=function(){this.v={x:0,y:0},this.a={x:0,y:.2},this.f=.93,this.pos={x:0,y:0},this.dir=i.DIR.left,this.moving=!1,this.ground=!1,this.life=2,this.dead=!1;var t=new createjs.SpriteSheet({images:["img/player"+this.type+".png"],frames:[[1,1,32,48,0,16,24],[34,1,32,48,0,16,24],[67,1,32,48,0,16,24],[100,1,32,48,0,16,24],[133,1,30,48,0,15,24],[164,1,30,48,0,15,24],[195,1,32,48,0,16,24],[1,50,32,48,0,16,24],[34,50,32,48,0,16,24],[195,1,32,48,0,16,24],[67,50,32,48,0,16,24],[100,50,32,48,0,16,24],[133,50,30,24,0,15,12],[164,50,30,24,0,15,12],[195,50,22,26,0,11,13],[218,50,20,48,0,10,24],[1,99,20,48,0,12,22],[22,99,22,48,0,10,22],[45,99,32,46,0,16,23],[78,99,30,46,0,15,23],[109,99,30,46,0,15,23],[140,99,24,48,0,12,24],[165,99,26,46,0,14,22],[192,99,24,46,0,12,22],[140,99,24,48,0,12,24],[217,99,26,48,0,12,24],[1,148,24,48,0,12,24]],animations:{stand:[0,2,"stand",.15],run:[3,5,"run",1],fly:[6,8,"fly",2.8],flap:[9,11,"flap",2.5],fall:[12,14,"fall"],stand_b:[15,17,"stand_b",.15],run_b:[18,20,"run_b",1],fly_b:[21,23,"fly_b",2.8],flap_b:[24,26,"flap_b",2.5]}});this.sprite=new createjs.Sprite(t,"stand"),this.addChild(this.sprite)},s.setPosition=function(t,e){this.pos.x=t,this.pos.y=e,this.x=this.pos.x,this.y=this.pos.y},s.getRect=function(){var t=this.getBounds();return this.w=t.width-18,this.h=t.height,new createjs.Rectangle(this.pos.x-this.w/2,this.pos.y-this.h/2,this.w,this.h)},s.turnLeft=function(){this.dead||(this.a.x=-1,this.setDirection(i.DIR.left),this.status==i.STATUS.stand&&this.setStatus(i.STATUS.run))},s.turnRight=function(){this.dead||(this.a.x=1,this.setDirection(i.DIR.right),this.status==i.STATUS.stand&&this.setStatus(i.STATUS.run))},s.jump=function(){this.dead||(this.v.y=0,this.v.y-=3,this.setStatus(i.STATUS.flap))},s.update=function(t){this.v.y>0&&((this.moving&&this.ground||!this.ground&&this.status!=i.STATUS.fly)&&this.setStatus(i.STATUS.fly),this.ground=!1),this.v.x+=this.a.x,this.v.y+=this.a.y,this.v.y>i.MAX_SPEED_Y&&(this.v.y=i.MAX_SPEED_Y),this.v.x*=this.f,this.v.x*=this.f,this.pos.x+=this.v.x,this.pos.y+=this.v.y;var e=-this.w/2,s=Config.w+this.w/2;this.pos.x<e?this.pos.x=s:this.pos.x>s&&(this.pos.x=e),this.pos.y<this.h/2&&(this.v.y=0,this.pos.y=this.h/2),this.pos.y>Config.h&&game.gameover(),this.x=this.pos.x,this.y=this.pos.y},s.setStatus=function(t){if(!(this.dead||t&&this.status===t)){var t=t||this.status,e=this.life<2?"_b":"";switch(t){case i.STATUS.stand:this.sprite.gotoAndPlay("stand"+e);break;case i.STATUS.run:this.sprite.gotoAndPlay("run"+e);break;case i.STATUS.fly:this.sprite.gotoAndPlay("fly"+e);break;case i.STATUS.flap:this.sprite.gotoAndPlay("flap"+e);break;case i.STATUS.fall:this.sprite.gotoAndPlay("fall")}this.status=t}},s.setDirection=function(t){switch(t){case i.DIR.left:this.sprite.scaleX=1;break;case i.DIR.right:this.sprite.scaleX=-1}},createjs.promote(i,"Container"),t.exports=i},function(t,e){var i=i||{};i.manifest=["water.png","platform.png","player1.png","player2.png","font.png","left.png","right.png"],t.exports=i},function(t,e){var i=function(t,e){for(var i in e)t[i]=e[i]},s=function(t){this.config={elem:null,mode:"landscape",id:"ori-tip",backgroundColor:"#000",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC",w:60,h:97,zIndex:999,container:null},i(this.config,t),this.init()},n=s.prototype;n.init=function(){this.createDom(),this.createStyle()},n.createDom=function(){var t=this.config;this.elem=t.elem||document.createElement("div"),this.elem.style["box-sizing"]="border-box",this.elem.style.position="fixed",this.elem.style.width="100%",this.elem.style.height="100%",this.elem.style.top="0px",this.elem.style["background-color"]=t.backgroundColor,this.elem.style["z-index"]=t.zIndex,this.elem.setAttribute("id",t.id);var e=document.createElement("div");e.classList.add("tip-icon"),e.style.width=t.w+"px",e.style.height=t.h+"px",e.style.background="url("+t.icon+") center center no-repeat",e.style["background-size"]="cover",this.elem.appendChild(e),this.container=t.container||document.body,this.container.appendChild(this.elem)},n.createStyle=function(){var t=this.config,e="landscape"==t.mode?"portrait":"landscape",i=["@media screen and (orientation:"+t.mode+")","{","#"+t.id+" { display:block; }","} ","@media screen and (orientation:"+e+")","{","#"+t.id+" { display:none; }","}","#"+t.id+">div { position:absolute;margin:auto;top:0;right:0;bottom:0;left:0; }"].join("");this.head=document.head||document.getElementsByTagName("head")[0],this.style=document.createElement("style"),this.style.type="text/css",this.style.styleSheet?this.style.styleSheet.cssText=i:this.style.appendChild(document.createTextNode(i)),this.head.appendChild(this.style)},n.destroy=function(){this.elem&&this.elem.parentNode.removeChild(this.elem),this.style&&this.style.parentNode.removeChild(this.style)},t.exports=s},function(t,e){var i=function(){this.Container_constructor(),this.init()},s=createjs.extend(i,createjs.Container);s.init=function(){var t=new createjs.Bitmap("img/platform.png"),e=t.getBounds().width,i=t.getBounds().height;this.addChild(t),this.setBounds(0,0,e,i)},s.getRect=function(){var t=this.getBounds(),e=t.width,i=t.height-2;return new createjs.Rectangle(this.x,this.y+1,e,i)},createjs.promote(i,"Container"),t.exports=i},function(t,e){var i=function(){this.Container_constructor(),this.init()},s=createjs.extend(i,createjs.Container);s.init=function(){var t=new createjs.SpriteSheet({images:["img/font.png"],frames:[[1,1,14,14,0,7,7],[16,1,12,14,0,6,7],[29,1,14,14,0,7,7],[44,1,14,14,0,7,7],[59,1,14,14,0,7,7],[74,1,14,14,0,7,7],[89,1,14,14,0,7,7],[104,1,14,14,0,7,7],[1,16,14,14,0,7,7],[16,16,14,14,0,7,7],[31,16,14,14,0,7,7],[46,16,14,14,0,7,7],[61,16,14,14,0,7,7],[76,16,14,14,0,7,7],[91,16,14,14,0,7,7],[106,16,14,14,0,7,7],[1,31,14,14,0,7,7],[16,31,14,14,0,7,7],[31,31,12,14,0,6,7],[44,31,14,14,0,7,7],[59,31,14,14,0,7,7],[74,31,12,14,0,6,7],[87,31,14,14,0,7,7],[102,31,14,14,0,7,7],[1,46,14,14,0,7,7],[16,46,14,14,0,7,7],[31,46,14,14,0,7,7],[46,46,14,14,0,7,7],[61,46,14,14,0,7,7],[76,46,12,14,0,6,7],[89,46,14,14,0,7,7],[104,46,14,14,0,7,7],[1,61,14,14,0,7,7],[16,61,14,14,0,7,7],[31,61,12,14,0,6,7],[44,61,14,14,0,7,7],[59,61,4,4,0,2,2]],animations:{0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:3,3:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15,g:16,h:17,i:18,j:19,k:20,l:21,m:22,n:23,o:24,p:25,q:26,r:27,s:28,t:29,u:30,v:31,w:32,x:33,y:34,z:35,".":36}});this.font=new createjs.BitmapText("",t),this.font.letterSpacing=4,this.addChild(this.font)},s.setText=function(t){this.font.text=t;var e=this.font.getBounds();this.regX=e.width/2-4,this.regY=e.height/2},createjs.promote(i,"Container"),t.exports=i},function(t,e){var i=function(){this.Container_constructor(),this.init()},s=createjs.extend(i,createjs.Container);s.init=function(){for(var t=new createjs.Bitmap("img/water.png"),e=t.getBounds().width,i=t.getBounds().height,s=Math.ceil(Config.w/e),n=0;n<s;n++){var o=t.clone();o.x=n*e,this.addChild(o)}this.setBounds(0,0,Config.w,i)},createjs.promote(i,"Container"),t.exports=i}]);