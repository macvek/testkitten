let testkitten = require('./testkitten');


let assertsPassSpec = require('./assertsPass.spec');
let failureSpec = require('./failure.spec');
let assertionsSpec = require('./assertions.spec');

let allSpecs = []
    .concat(assertsPassSpec)
    .concat(failureSpec)
    .concat(assertionsSpec);

testkitten(allSpecs);
