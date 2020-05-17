import SourceService from '../SourceService.mjs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class MangaReader extends SourceService {
  constructor(){
    super('mangareader');
    this.url = 'http://www.mangareader.net/';
    this.readDirectionMap = { "both": 0, "manhwa": 1, "manga": 2 };
    this.statusMap = { "both": 0, "ongoing": 1, "complete": 2 };
    this.sortingMap = { "similarity": 0, "alphabetical": 1, "popularity": 2 };
    this.genreMap = {
      "Action": 0, "Adventure": 1, "Comedy": 2, "Demons": 3, "Drama": 4, "Ecchi": 5, "Fantasy": 6, "Gender Bender": 7, "Harem": 8, "Historical": 9, "Horror": 10,
      "Josei": 11, "Magic": 12, "Martial Arts": 13, "Mature": 14, "Mecha": 15, "Military": 16, "Mystery": 17, "One Shot": 18, "Psychological": 19, "Romance": 20,
      "school life": 21, "sci-fi": 22, "seinen": 23, "shoujo": 24, "shoujoai": 25, "shounen": 26, "shounenai": 27, "slice of life": 28, "smut": 29, "sports": 30,
      "Super Power": 31, "Supernatural": 32, "Tragedy": 33, "Vampire": 34, "Yaoi": 35, "Yuri": 36
    };
  }

  generateGenre(){
    let genre = new Array(36).fill(0);

  }

  async search(query){
    const searchTerm = query.search || "";
    const itemsPerPage = 30;
    const page = query.page - 1 || 0; // page number
    const readDirection = this.readDirectionMap[query.dir] || 0; //
    const genre = this.genreMap[query.genre] || "";
    const sort = this.sortingMap[query.sort] || 0;
    const genre =
    // rd=0&status=0&order=0&genre=&p=15&i=1
    var url = this.url + 'search/?'
      + 'w=' + searchTerm
      + '&p='  + (page * itemsPerPage)
      + '&rd=' + readDirection
      + '&genre=' + genre
      + '&order=' + sort;
    return fetch(url)
      .then(res => res.text())
      .then(body => {
        var pageCount = 0;
        const results = [];
        let _ = cheerio.load(body);
        _('#mangaresults .mangaresultitem .mangaresultinner').each(function(result) {
          let search = {};
          search.name  = _(this).find('a').text();
          search.url = '/manga/mangareader' + _(this).find('a').attr('href');
          search.thumb = _(this).find('.imgsearchresults').css('background-image').replace('url(\'','').replace('\')','');
          search.chapters = _(this).find('.chapter_count').text();
          search.genre = _(this).find('.manga_genre').text();
          results.push(search);
        });
        const test = _('#sp').children().last().attr('href');

        _('#sp').each(function(result) {
          _(this).find('a').each(function() {
            var pageUrl = _(this).attr('href');

            if (results.length < itemsPerPage) {
              pageCount = (results.length == 0 ? 0 : 1);
            } else {
              pageCount = (pageCount / itemsPerPage) + 1;
            }
          });
        });

        // use different return method with undefined so that some elements are dynamic

        return {
          "url": url,
          "data": results,
          "pagination":{
            "currentPage": page + 1,
            "pageCount": pageCount,
            "count": results.length,
            "pageSize": itemsPerPage,
          }
        }; // create true pagination.
      });
  }

  async manga(){

  }

  async chapters(){

  }

  async page(){

  }

}

export default MangaReader;
