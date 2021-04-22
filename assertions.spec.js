let reset = require('./resetfailstate');

let specs = [
    'assertions.spec SUCCESSES',
    checkAssertEqualsPasses,
    checkAssertEqualsArraysPasses,
    checkAssertJsonEqualsPasses,
    'assertions.spec FAILURES',
    checkAssertEqualsFails, reset,
    checkAssertEqualsFailsWithMark, reset,
    checkAssertEqualsArraysFailsOnNestedArray, reset,
    checkAssertEqualsArraysFailsOnIncorrectValues, reset,
    checkAssertEqualsArraysFailsOnDifferentTypes, reset,
    checkAssertEqualsArraysFailsOnDifferentSizes, reset,
    checkAssertJsonEqualsFails, reset
];
module.exports = specs;

if (require.main == module) {
    let testkitten = require('./testkitten.js');
    testkitten(specs);    
}


function checkAssertEqualsPasses(check) {
    check({'assertEquals':['a','a']});
}

function checkAssertEqualsFails(check) {
    check({'assertEquals':['a','b']});
}

function checkAssertEqualsFailsWithMark(check) {
    check({'mark':"A<>B", 'assertEquals':['a','b']});
}

function checkAssertEqualsArraysPasses(check) {
    check({'assertEqualsArray': [ [1,2,3,4], [1,2,3,4] ] });
}

function checkAssertEqualsArraysFailsOnNestedArray(check) {
    check({'assertEqualsArray': [ [1,2,[3,4]], [1,2,[3,4]] ] });
}

function checkAssertEqualsArraysFailsOnIncorrectValues(check) {
    check({'assertEqualsArray': [ [1,2,3], [1,2,4 ] ]});
}

function checkAssertEqualsArraysFailsOnDifferentTypes(check) {
    check({'assertEqualsArray': [ [1,2,3], {} ]});
}

function checkAssertEqualsArraysFailsOnDifferentSizes(check) {
    check({'assertEqualsArray': [ [1,2,3], [1,2] ]});
}

function checkAssertJsonEqualsPasses(check) {
    check({'assertJsonEquals': [ 
        {'a':'OK', 'source':[1,2,{'x':'other'}]}, // here order is a, source
        {'source':[1,2,{'x':'other'}], 'a':'OK'}] // here order is source, a
    });
}

function checkAssertJsonEqualsFails(check) {
    check({'assertJsonEquals': [ 
        {'a':'OK', 'b':[1,2]},
        {'a':'OK', 'b':[1,2,3]},
    ]});
}