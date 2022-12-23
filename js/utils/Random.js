class Random {

    static chance = new Chance();

    static setSeed(value) {
        Random.chance = new Chance(value);
    }

    static getRandomInt(min, max) {
        return Random.chance.integer({ min, max });
    }

    static getSubArray(array, quantity) {
        return Random.chance.pickset(array, quantity);
    }

    static getOne(array) {
        return Random.chance.pickone(array);
    }
}
