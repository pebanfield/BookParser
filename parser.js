/**
 * parser
 */
fs = require('fs');

var chapterTitle = "CHAPITRE";
//var chapterTitle = "CHAPTER";

fs.readFile('./books_data/Cinq_Semaines_En_Ballon_fr.txt', 'utf8', function (err,data) {


/*
    var toc = {};
    toc.id = "Five_Weeks_in_a_Balloon";
    toc.title = "Five Weeks in a Balloon";
    toc.author = "Jules Verne";
    toc.language = "eng";
    toc.copyright = "publicdomain";
    toc.year = 1863;
    toc.translation = true;
    toc.chapters = [];
*/

    var toc = {};
    toc.id = "Cinq_Semaines_En_Ballon";
    toc.title = "Cinq Semaines En Ballon";
    toc.author = "Jules Verne";
    toc.language = "fr";
    toc.copyright = "publicdomain";
    toc.year = 1863;
    toc.translation = false;
    toc.chapters = [];



    if (err) {
        return console.log(err);
    }
    var result = data.split("\n");

    var paras = [];
    var paragraphStr = "";
    var paraCount=0;
    var chapterCount=0;
    var isChapterTitle = false;
    var lastChapterTitle = "";

    for(var k=0; k< result.length; k++) {

      var line = result[k];
      if(!isChapterTitle) {

        if (line.indexOf(chapterTitle) > -1) { //chapter title

          if(lastChapterTitle != ""){

            var chapter = {};
            chapter.id = "c" + chapterCount;
            chapter.title = lastChapterTitle;
            toc.chapters.push(chapter);

            var fileChapter = {};
            fileChapter.id = chapter.id;
            fileChapter.title = chapter.title;
            fileChapter.paragraphs = paras;
            fs.writeFile('./books_json/' + fileChapter.id + ".json", JSON.stringify(fileChapter), function (err) {
              if (err) return console.log(err);
            });
            paras=[];
            paraCount=0;
            paragraphStr="";
          }
          chapterCount++;
          lastChapterTitle = line.replace("\r", "");
          lastChapterTitle = lastChapterTitle.replace(".", "");
          isChapterTitle = true;

        } else if (line == "\r" && paragraphStr != "") { //paragraph end

          var paragraph = {};
          paragraph.index = paraCount;
          var lines = paragraphStr.split("\r");
          paragraphStr = "";
          for(var l=0; l<lines.length; l++){
            paragraphStr += lines[l] + " ";
          }
          paragraphStr = paragraphStr.substring(0, paragraphStr.length-2);
          paragraphStr = paragraphStr.replace(/[\u200B-\u200D\uFEFF\u0091\u0092\u009C\u008C]/g, '');
          ///[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
          paragraph.body = paragraphStr;
          if(paragraph.body != "") { //hack
            paras.push(paragraph);
          }
          paragraphStr = "";
          paraCount++;

        } else { //regular line
          paragraphStr += line;
        }
      } else {
        isChapterTitle = false;
      }

    }

  fs.writeFile('./books_json/toc.json', JSON.stringify(toc), function (err) {
    if (err) return console.log(err);
  });

});




