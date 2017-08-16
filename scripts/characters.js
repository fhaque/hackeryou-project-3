///////////////////////////////////////////////////////
class Sprite {
    constructor(obj, world) {
        $.extend(this, obj);
        this.world = world;

        this.createDomElement();
        this.world.domElement.append(this.domElement);
    }

    render() {
        this.domElement.image.attr('src',this.asset);
    }

    remove() {
        this.domElement.remove();
        this.world.triggerEvent('remove', this);
    }

    createDomElement() {
        if( !('domElement' in this) ) {
            this.domElement = $('<div>');
            this.domElement.image = $('<img>');
            this.domElement.append(this.domElement.image);

            if (this.id != '') {
                this.domElement.attr('id', this.id);
            }

            if ('class' in this) {
                this.domElement.addClass(this.class);
            }

        }
    }

}

///////////////////////////////////////////////////////

class Pet extends Sprite {
    constructor(obj, world) {
        super(obj.sprite, world);
        this.data = {};
        $.extend(this.data, obj.data);
    }

    update(delta) {
        console.log("Trump updating");
    }

    isAlive() {
        return !this.checkIsDepleted('energy');
    }

    isHappy() {
        return !this.checkIsDepleted('happiness');
    }

    deltaEnergy(delta) {
        this.deltaVal(delta, 'energy');
    }

    deltaHappiness(delta) {
        this.deltaVal(delta, 'happiness');
    }

    poop() {
        this.world.triggerEvent('poop', {
            startingPosition: { x: 20, y: 20 },
            relativeTo: this,
        });
    }


    //Helper Methods //////////////
    checkIsDepleted(propertyName) {
        return this.data[propertyName].current < this.data[propertyName].min;
    }

    checkIsMaxed(propertyName) {
        return this.data[propertyName].current > this.data[propertyName].max;
    }

    deltaVal(delta, propertyName) {
        this.data[propertyName].current += delta;

        if ( this.checkIsDepleted(propertyName) ) {
            this.data[propertyName].current = this.data[propertyName].min;
        }

        if ( this.checkIsMaxed(propertyName) ) {
            this.data[propertyName].current = this.data[propertyName].max;
        }
    }

}

///////////////////////////////////////////////////////

class Poop extends Sprite {
    constructor(obj, world) {
        super(obj.sprite, world);
        this.data = {};
        $.extend(this.data, obj.data);
    }

    update(delta) {
    }

}


///////////////////////////////////////////////////////



