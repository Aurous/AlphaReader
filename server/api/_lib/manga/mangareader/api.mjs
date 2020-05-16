import cheerio from 'cheerio';
import request from 'request';

export async function search(searchTerm){
  // var rootUrl = 'http://www.mangareader.net';
  var itemsPerPage = 30;

  if (searchTerm) {
    var url = 'http://www.mangareader.net/search/?w=' + searchTerm;

        var results = [];

      await request(url, function(err, resp, body) {
          if (err)
              throw err;

          let _ = cheerio.load(body);

       _('#mangaresults .mangaresultitem .mangaresultinner').each(function(result) {
        var resultName = null;
        var resultUrl = null;
        var resultFullUrl = null;
        var thumb = null;
        var chapters = null;
        var type = null;
        var genre = null;

        _(this).find('a').each(function() {
          resultName = _(this).text();
          resultUrl = _(this).attr('href');
          resultFullUrl = resultUrl;
          });

        _(this).find('.imgsearchresults').each(function() {
          thumb = _(this).css('background-image');
          thumb = thumb.replace('url(\'','').replace('\')','');
          });

          _(this).find('.chapter_count').each(function() {
            chapters = _(this).text();
          });

          _(this).find('.manga_type').each(function() {
            type = _(this).text();
          });

          _(this).find('.manga_genre').each(function() {
            genre = _(this).text();
          });

        var result = {
                    "resultName": resultName,
                    "resultUrl": resultUrl,
                    "resultFullUrl" : resultFullUrl,
                    "resultThumbImageUrl" : thumb,
                    "resultChapters" : chapters,
                    "resultType" : type,
                    "resultGenre" : genre
                };

                results.push(result);
          });

      var pages = 0;

          _('#sp').each(function(result) {
        _(this).find('a').each(function() {
          var pageUrl = _(this).attr('href');

          if (pageUrl) {
            console.log(pageUrl);
          }
          // console.log($(this).text());
          pages = pageUrl;
        });
      });

          if (results.length < itemsPerPage) {
            pages = (results.length == 0 ? 0 : 1);
          } else {
            pages = (pages / itemsPerPage) + 1;
          }

          var searchResults = {
            "searchTerm" : searchTerm,
            "resultCount" : results.length,
            "resultPageCount" : pages,
            "results": results
          };
          console.log("exit 1", searchResults);
          return JSON.stringify(searchResults);
      });
  } else {
    return 'no searchTerm';
  }
}
