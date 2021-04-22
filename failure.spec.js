let reset = require('./resetfailstate.js');
let specs = ["failure.spec", iMustFail, reset];
module.exports = specs;

if (require.main == module) {
    let testkitten = require('./testkitten.js');
    
    testkitten(specs);    

}

function iMustFail(fail) {
    fail("Yes");
}