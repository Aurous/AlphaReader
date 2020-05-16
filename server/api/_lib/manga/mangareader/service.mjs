import MangaService from '../MangaService.mjs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class MangaReader extends MangaService {
  constructor(body){
    super('mangareader');
    this.body = body;
  }

  async search(searchTerm){
      if (searchTerm) {
        var url = 'http://www.mangareader.net/search/?w=' + searchTerm;
        return fetch(url)
          .then(res => res.text())
          .then(body => {
            var itemsPerPage = 30;
            var results = [];
            let _ = cheerio.load(body);
            _('#mangaresults .mangaresultitem .mangaresultinner').each(function(result) {
              let search = {};
              _(this).find('a').each(function() {
                search.resultName = _(this).text();
                search.resultUrl = _(this).attr('href');
                search.resultFullUrl = search.resultUrl;
              });

              _(this).find('.imgsearchresults').each(function() {
                search.thumb = _(this).css('background-image');
                search.thumb = search.thumb.replace('url(\'','').replace('\')','');
              });

              _(this).find('.chapter_count').each(function() {
                search.chapters = _(this).text();
              });

              _(this).find('.manga_type').each(function() {
                search.type = _(this).text();
              });

              _(this).find('.manga_genre').each(function() {
                search.genre = _(this).text();
              });

              results.push(search);
            });

            var pages = 0;

            _('#sp').each(function(result) {
              _(this).find('a').each(function() {
                var pageUrl = _(this).attr('href');
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
            return searchResults;
          });
      }else{
        return {'error':'no searchTerms'};
      }
      return {"testing":"testing"}


  }

  async manga(){

  }

  async chapters(){

  }

  async page(){

  }

}

export default MangaReader;
