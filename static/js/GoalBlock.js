GoalBlockClass = EntityClass.extend({
    zIndex : 50,
    myPhysBody: null,

    init: function (inputx, inputy, settings) {
        this.currSpriteName = 'bonus.png';
        this.pos.x = 200;
        this.pos.y = 300;
        this.hpos.x = 235;
        this.hpos.y = 335;
        this.hsize.x = 70;
        this.hsize.y = 70;

    },
    setPhysBody: function(){
        var  entityDef = {
            id: "bonus",
            type: 'static',
            x: this.hpos.x,
            y: this.hpos.y,
            halfHeight: this.hsize.y / 2,
            halfWidth: this.hsize.x / 2,
            damping: 0,
            friction: 1,
            restitution: 0.2,
            density: 1.0,
            angle: 0,
            collidesWith: ['all'],
            userData: {
                "id": "bonus",
                "ent": this
            }
        }
        this.myPhysBody = gPhysicsEngine.addBody(entityDef);
    },
    update: function(){
        if(this.myPhysBody !== null){
            var mPos = this.myPhysBody.GetPosition();
            this.pos.x = mPos.x - 35;
            this.pos.y = mPos.y - 35;
        }
        this.parent();
    },
    draw: function(){
        this.parent();
    },
    onTouch: function(otherBody, point, impulse){
        if(!this.myPhysBody) return false;

        if(otherBody === null || !otherBody.GetUserData()){
            return false;
        }

        var data = otherBody.GetUserData();

        if(data.id == 'Player'){
            //goal
            gGameEngine.flag = true;
            console.log('Win');
        }


    }
});
gGameEngine.factory['bonus'] = GoalBlockClass;
