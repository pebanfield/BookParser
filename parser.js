/**
 * parser
 */
fs = require('fs')
fs.readFile('./books/verne/Five_Weeks_in_a_Balloon.txt', 'utf8', function (err,data) {

    if (err) {
        return console.log(err);
    }
    var result = data.split("\n");

    var paras = [];
    var paragraph = "";
    var paraCount=0;
    for(var k=0; k< result.length; k++) {

      var line = result[k];
      if(line == "\r"){
        paraCount++;
        paras[paraCount] = paragraph;
        paragraph = "";
      } else {
        paragraph += line;
      }

    }
    console.log("para.length = " + paras.length);

});




