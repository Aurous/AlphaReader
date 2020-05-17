import SourceService from '../SourceService.mjs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class MangaReader extends SourceService {
  constructor(){
    super('mangareader');
  }

  async search(searchTerm, query){
    if (searchTerm) {
      var url = 'http://www.mangareader.net/search/?w=' + searchTerm;
      return fetch(url)
        .then(res => res.text())
        .then(body => {
          // const page  -> shot stuff goota fix this for good querying
          var pages = 0;
          var itemsPerPage = 30;
          var results = [];
          let _ = cheerio.load(body);
          var i = 0;
          _('#mangaresults .mangaresultitem .mangaresultinner').each(function(result) {
            let search = {};
            _(this).find('a').each(function() {
              search.name = _(this).text();
              search.url = '/manga/mangareader' + _(this).attr('href');
            });

            _(this).find('.imgsearchresults').each(function() {
              search.thumb = _(this).css('background-image').replace('url(\'','').replace('\')','');
            });

            _(this).find('.chapter_count').each(function() {
              search.chapters = _(this).text();
            });

            _(this).find('.manga_genre').each(function() {
              search.genre = _(this).text();
            });

            results.push(search);
            i++;
          });

          _('#sp').each(function(result) {
            _(this).find('a').each(function() {
              var pageUrl = _(this).attr('href');
              pages = pageUrl;
            });
          });

          return {
            "data": results,
            "pagination":{
              "page": page,
              "pageSize": itemsPerPage,
              "count": results.length,
              "pageCount": pages
            }
          }; // create true pagination.

        });
    }else{
      return {'error':'no searchTerms'};
    }
  }

  async manga(){

  }

  async chapters(){

  }

  async page(){

  }

}

export default MangaReader;
