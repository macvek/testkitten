module.exports = function ResetFailState() {
    if (process.exitCode == 1) {
        process.exitCode = 0;
    }
    else {
        process.exitCode = 1;
        console.log("This test suite should always fail, but error code was 0");
    }
}
