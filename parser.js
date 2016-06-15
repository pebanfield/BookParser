/**
 * parser
 */
var LineByLineReader = require('line-by-line'),
  lr = new LineByLineReader('./books/verne/Five_Weeks_in_a_Balloon.txt', {skipEmptyLines: true }),
  row = 0;

lr.on('error', function (err) {
    throw err;
});

lr.on('open', function() {
    // Do something, like initialise progress bar etc.
});

lr.on('line', function (line) {
    console.log(++row + ": " + line);
});

lr.on('end', function () {
    console.log("Ok we're done - exiting now.");
});