const stop_score = require('../lib/stop-score');
const expect = require('chai').expect;
var fixtures = [
    {
        name: 'bob',
        subs: {
            'color': 'red',
            'sex': 'male'
        }
        // sport: 'pinga'
    }, {
        name: 'yamil',
        subs: {
            'color': 'green',
            'sex': 'male'
        }
    },
    {
        name: 'bob',
        subs: {
            'color': 'blue',
            'sex': 'male'
        }
    },
    {
        name: 'john',
        subs: {
            'color': 'blue',
            'sex': 'male'
        }
    },
    {
        name: 'bob',
        subs: {
            'color': 'blue',
            'sex': 'male'
        }
    }
];
var result_fixtures = [{name: 'bob', subs: {color: 'red', sex: 'male'}, score: 15},
    {
        name: 'yamil',
        subs: {color: 'green', sex: 'male'},
        score: 15
    },
    {name: 'bob', subs: {color: 'blue', sex: 'male'}, score: 10},
    {name: 'john', subs: {color: 'blue', sex: 'male'}, score: 10},
    {name: 'bob', subs: {color: 'blue', sex: 'male'}, score: 10}];


describe("# Game Calculator", function () {
    it("should calculate scores", function () {
        var results = stop_score(fixtures);
        expect(results).to.deep.equal(result_fixtures);
    })
});

