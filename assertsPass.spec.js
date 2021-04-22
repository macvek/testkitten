let specs = ['assertspass.spec', noAssertion];
module.exports = specs;

if (require.main == module) {
    let testkitten = require('./testkitten.js');
    testkitten(specs);    
}


function noAssertion() {}