/*source*/
var res = {
    BackGround_png : "res/background.png",
    Start_N_png : "res/start_N.png",
    Start_S_png : "res/start_S.png",
    Sushi_1n_png : "res/sushi_1n.png",
    Sushi_plist : "res/sushi.plist",
    Sushi_png : "res/sushi.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var StartLayer = cc.Layer.extend({
    ctor:function(){
		this._super();
        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
        	x: size.width / 2,
        	y: size.height / 2
            // scale: 1.3,
            // rotation: 180
        });
        this.addChild(this.bgSprite, 0);

        var startItem = new cc.MenuItemImage(
        	res.Start_N_png,
        	res.Start_S_png,
        	function(){
                cc.director.runScene( cc.TransitionMoveInL.create(1, new PlayScene()) );
        	},this);

        startItem.attr({
        	x: size.width / 2,
        	y: size.height / 2,
        	anchorX:0.5,
        	anchorY:0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

		return true;
	}
});

var StartScene = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new StartLayer();
    	this.addChild(layer);
    }
});

var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    scoreLabel:null,
    score:0,
    timeoutLabel:null,
    timeout:30,//游戏时间
    SushiSprites:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.bgSprite, 0);

        //score
        this.scoreLabel = new cc.LabelTTF("score: 0", "Arial", 20);
        this.scoreLabel.attr({
            x:size.width - 100,
            y:size.height - 30
        });
        this.addChild(this.scoreLabel, 5);

        //timeout
        this.timeoutLabel = new cc.LabelTTF("" +this.timeout, "Arial", 30 );
        this.timeoutLabel.attr({
            x:30,
            y:size.height - 30
        });

        this.addChild(this.timeoutLabel, 5);
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);
        this.SushiSprites = [];
        var speed = 0.2;var delay=0.2;
        this.schedule(this.update,speed,4*1024,delay);
        this.schedule(this.timer,1,this.timeout,1);

        return true;
    },
    timer:function(){
        if(this.timeout == 0){
            var gameOver = new cc.LayerColor(cc.color(255,255,255,60));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
            titleLabel.attr({
                x:size.width/2,
                y:size.height/2
            });
            gameOver.addChild(titleLabel, 150);

            var TryAgainItem = new cc.MenuItemFont("Try Again", function(){
                cc.director.runScene( cc.TransitionMoveInL.create(1, new PlayScene()) );
            },this);

            TryAgainItem.attr({
                x: size.width/2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var menu = new cc.Menu(TryAgainItem);
            menu.x = 0;
            menu.y = 0;

            gameOver.addChild(menu, 1);
            this.addChild(gameOver);
            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }   
        this.timeout -= 1;
        this.timeoutLabel.setString(""+ this.timeout);
    },
    addScore:function(){
        this.score += 1;
        this.scoreLabel.setString("score: "+this.score);   
    },
    update:function(){
        this.addSushi();
        this.removeSushi();
    },
    addSushi:function(){
        var sushi = new SushiSprite(res.Sushi_1n_png);
        // var sushi = new cc.Sprite(res.Sushi_1n_png);

        var size = cc.winSize;
        var x = size.width * cc.random0To1();
        sushi.attr({
            x:x,
            y:size.height-20
        });

        var dropAction = cc.MoveTo.create(2, cc.p(sushi.x, -300) );
        sushi.runAction(dropAction);

        this.SushiSprites.push(sushi);
        this.addChild(sushi, 5);
    },
    removeSushi:function(){
         for (var i=0; i<this.SushiSprites.length; i++){
             if(this.SushiSprites[i].y<0){
                 this.SushiSprites[i].removeFromParent();
                 this.SushiSprites[i] = undefined;
                 this.SushiSprites.splice(i,1);
                 i = i-1;
             }
         }
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

var SushiSprite = cc.Sprite.extend({
    disappearAction:null,//消失动画
    touchListener:null,
    index:null,//在数组中的索引
    onEnter:function () {
        this._super();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
        this.addTouchEventListenser();
    },
    onExit:function () {
        this.disappearAction.release();
        this._super();
    },
    createDisappearAction : function() {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_"+i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.02);
        var action = new cc.Animate(animation);
        return action;
    },
    addTouchEventListenser:function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) { 
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();  
                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    //cc.log("pos.x="+pos.x+",pos.y="+pos.y);
                    target.removeTouchEventListenser();
                    target.stopAllActions();
                    var ac = target.disappearAction;
                    var seqAC = cc.Sequence.create(ac, cc.CallFunc.create(function(){
                            target.getParent().addScore();
                            //target.getParent().removeSushiByindex(target.index - 1);
                            target.removeFromParent();
                    }, target) );
                    target.runAction(seqAC);
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    removeTouchEventListenser:function(){
        cc.eventManager.removeListener(this.touchListener);
    }
});