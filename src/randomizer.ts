/**
 * Generates a random number or points to test plot
 */

var data: any[] = [];
var totalPoints = 300;

export class randomizer{
    constructor() {

    }

    public genRandom() {
        if (data.length > 0) {
            data = data.slice(1);
        }
        // Do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
    
            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }
            data.push(y);
        }
    
        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
    
        return res;        
    }
}

