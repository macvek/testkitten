# TestKitten
Very basic test framework.
The idea is to have 3 funcitonalites:
* each test is a simple named function
* function gets a callback as argument which is a trigger to mark it as failed, and to aggregate assert functions
* tests can be easily packed into separate files and imported into main one

Also a core function is NOT to have any autodiscovery. Each test must be explicitly marked to be executed.


# Sample 

Please have a look at node_modules/testkitten where there are alltests.spec.js files, which is a test bundle, and it includes test files like failure.spec.js
Every test file can be written as a separate test, or bundled into main one for more rapid development.

```js
let specs = ["failure.spec",    // table with tests, string is shown as an INFO for developer to know from which file tests are used
    iMustFail, checkAssertEqualsPasses, checkAssertEqualsArraysPasses, checkAssertJsonEqualsPasses 
]; 
module.exports = specs;

// if it is standalone execute, then initialize tests; otherwise module returns 'specs' array and root tests executes it
if (require.main == module) {
    let testkitten = require('testkitten');
    
    testkitten(specs);    

}

function iMustFail(fail) {
    fail("Yes"); // fail is a funciton, if it has string passed, then it is a failed message; it can also accept object with assert instructions
}


// some samples of assertions
function checkAssertEqualsPasses(check) {
    check({'assertEquals':['a','a']});
}

function checkAssertEqualsArraysPasses(check) {
    check({'assertEqualsArray': [ [1,2,3,4], [1,2,3,4] ] });
}

function checkAssertJsonEqualsPasses(check) {
    check({'assertJsonEquals': [ 
        {'a':'OK', 'source':[1,2,{'x':'other'}]}, // here order is a, source
        {'source':[1,2,{'x':'other'}], 'a':'OK'}] // here order is source, a
    });
}


```

# license
ISC