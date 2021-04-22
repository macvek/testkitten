let process = require('process');
module.exports = ops => {
    const GREEN = "\x1b[32m";
    const RESET = "\x1b[0m";
    const RED = "\x1b[31m";
    const SUCCESSICON = '\u2705';
    const FAILUREICON = '\u274c';
    let counter = 0;
    for (each of ops) {
        let name;
        if (typeof each === 'string') {
            console.log(`[ INFO ] ${each}`);
            continue;
        }
        
        try {
            name = toFunctionName(each);

            each((failOrCheck) => { 
                if (typeof failOrCheck === 'string') { throw `Failed with message ${failOrCheck}`} 
                else { callCheck(failOrCheck) } ;
            },
                (giveMeName) => {name = giveMeName},
            );
            if (!name) {
                console.trace(`TEST at idx ${counter} has no name provided, please execute first test argument to provide such`);
            }
            console.log(`${GREEN}[PASSED]${RESET} ${name}`);
            counter++;
        }
        catch(e) {
            console.log(`${RED}[FAILED]${RESET} ${name} with error:`, e);
            process.exitCode = 1;
        }
    }

    const allPassed = counter === ops.length;
    const result = allPassed ? SUCCESSICON : FAILUREICON;
    console.log(`${result} Executed ${ops.length}, succeed: ${counter}, failed: ${ops.length-counter}`);

    function callCheck(check) {
        let mark = check.mark ? `${check.mark}:` : '';
        if (check.assertEquals) {
            let expected = check.assertEquals[0];
            let got = check.assertEquals[1];
            if (Array.isArray(expected) || Array.isArray(got)) {
                throw `${mark}Trying to compare arrays using assertEquals, use assertEqualArrays instead; ${expected}, ${got}`;
            }
            if (expected !== got) {
                throw `${mark}check.assertEquals failed  expected:\`${expected}\`, given: \`${got}\``
            }
        }
        else if (check.assertEqualsArray) {
            let expected = check.assertEqualsArray[0];
            let got = check.assertEqualsArray[1];
            if (!Array.isArray(expected) || !Array.isArray(got)) {
                throw `${mark}Expected two arrays got : ${expected}; ${got}`;
            }

            if (expected.length !== got.length) {
                throw `${mark}Array sizes are different ${expected}; ${got}`
            }

            for (let i=0;i<expected.length;i++) {
                if (expected[i] !== got[i]) {
                    if (typeof expected[i] === 'object' && typeof got[i] === 'object') {
                        throw `${mark}check.assertEqualArrays failed on comparing 2 objects, please use assertJsonEquals for such testing:\`${expected}\`, given: \`${got}\``
                    }
                    else {
                        throw `${mark}check.assertEqualArrays failed  expected:\`${expected}\`, given: \`${got}\``
                    }
                }
            }

        }
        else if (check.assertJsonEquals) {
            let expected = jsonCopy(check.assertJsonEquals[0]);
            let got = jsonCopy(check.assertJsonEquals[1]);
           
            let sortedExpected = sortAttributes(expected);
            let sortedGot = sortAttributes(got);

            console.log(sortedExpected);
            console.log(sortedGot);
            if (JSON.stringify(sortedExpected) !== JSON.stringify(sortedGot)) {
                throw `${mark}check.assertJsonEquals failed expected sorted objects to be equal; expected:\`${sortedExpected}\`, given: \`${sortedGot }\``
            }
        }
        else {
            throw 'Cannot parse {check} object';
        }
    }

    function toFunctionName(each) {
        let asStr = ''+each;
        const endOfName = asStr.indexOf('(');
        if (endOfName > 0) {
            const firstSpace = asStr.indexOf(' ');
            if (firstSpace > -1) {
                return asStr.substr(firstSpace+1, endOfName-(firstSpace+1));
            }
        }
    }

    function jsonCopy(source) {
        return JSON.parse(JSON.stringify(source));
    }

    function sortAttributes(source) {
        if ('object' !== typeof source) {
            return source;
        }

        if (Array.isArray(source)) {
            for (let value of source) {
                sortAttributes(value);
            }

            return source;
        }
        else {
            let attrs = [];
            let repacked = {};
            for (let attrName in source) {
                attrs.push(attrName);
            }

            attrs.sort();
            for (let attrName of attrs) {
                repacked[attrName] = sortAttributes(source[attrName]);
            }

            return repacked;
        }

    }
}
