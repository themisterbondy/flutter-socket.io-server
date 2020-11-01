const Band = require("./band");

class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }
    getBands() {
        return this.bands;
    }
    deleteBand(id = '') {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteBand(id = '') {
        console.log('voteBand:', id)
        this.bands = this.bands.map(band => {
            if (band.id == id) {
                console.log('voteBand: ++')
                band.votes++
                return band;
            } else {
                console.log('voteBand: null');
                return band;
            }

        })
    }
}

module.exports = Bands;