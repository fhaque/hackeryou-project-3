///////////////////////////////////////////////////////
class Sprite {
    constructor(obj) {
        $.extend(this, obj);
    }

    update(delta) {}
    render() {}

}

class Pet extends Sprite {
    constructor(obj) {
        super(obj.sprite);
        this.data = {};
        $.extend(this.data, obj.data);
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

const trump = new Pet(GAME_DATA.trump);




