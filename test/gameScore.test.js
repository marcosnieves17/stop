const stop_score = require('../lib/stop-score');
const expect = require('chai').expect;
var fixtures = {
    letter: "a",
    players: [
        {
            name: 'Cesar',
            subs: {
                name: 'Ana',
                lastname: 'Augusto',
                country: 'Angola',
                food: 'arroz',
                animal: 'abeja'
            }
        },
        {
            name: 'Yamil',
            subs: {
                name: 'Ana',
                lastname: 'Arroyo',
                country: 'Alemania',
                food: 'Ajo',
                animal: 'abeja'
            }
        },
        {
            name: 'David',
            subs: {
                name: 'Alicia',
                lastname: 'zAsusta',
                country: 'zAustralia',
                food: 'zAjo',
                animal: 'zantilope'
            }
        },
    ]
};
var result_fixtures = [ { name: 'Cesar',
        subs:
        { name: 'Ana',
            lastname: 'Augusto',
            country: 'Angola',
            food: 'arroz',
            animal: 'abeja' },
        score: 40 },
        { name: 'Yamil',
            subs:
            { name: 'Ana',
                lastname: 'Arroyo',
                country: 'Alemania',
                food: 'Ajo',
                animal: 'abeja' },
            score: 40 },
        { name: 'David',
            subs:
            { name: 'Alicia',
                lastname: 'zAsusta',
                country: 'zAustralia',
                food: 'zAjo',
                animal: 'zantilope' },
            score: 10 } ];


describe("# Game Calculator", function () {
    it("should calculate scores", function () {
        var results = stop_score(fixtures.players, fixtures.letter);
        // console.log(results);
        expect(results).to.deep.equal(result_fixtures);
    })
});

