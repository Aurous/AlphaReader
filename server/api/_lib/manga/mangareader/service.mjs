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

  successful(res){
    if(res.ok) return res;
    throw new TypeError('Call Unsuccessful');
  }

  generateGenre(array){
    let genre = new Array(36).fill(0);
    array.forEach((item) => { genre[this.genreMap[item]] = 1; });
    return genre.join('');
  }

  async search(query){
    const searchTerm = query.search || "";
    const itemsPerPage = 30;
    const page = query.page - 1 || 0;
    const readDirection = this.readDirectionMap[query.dir] || 0;
    const genre = (typeof(query.genre) === 'object') ? this.generateGenre(query.genre) : query.genre || "";
    const sort = this.sortingMap[query.sort] || 0;
    var url = this.url + 'search/?'+'w='+searchTerm+'&p='+(page*itemsPerPage)+'&rd='+readDirection+'&genre='+genre+'&order='+sort;
    return fetch(url)
      .then(res => res.text())
      .then(body => {
        let _ = cheerio.load(body);
        let pageCount;
        const data = [];
        const manga = _('#mangaresults .mangaresultitem .mangaresultinner');
        if(manga.length > 0){
          manga.each(function(result){
            let search = {};
            search.name  = _(this).find('a').text();
            search.url = '/chapters/mangareader' + _(this).find('a').attr('href');
            search.thumb = _(this).find('.imgsearchresults').css('background-image').replace('url(\'','').replace('\')','').replace('r0','l0');
            search.testing = _('tr').filter(() => { return _(this).text().trim() === 'Reading Direction:'; }).next().text();
            search.chapters = _(this).find('.chapter_count').text();
            search.genre = _(this).find('.manga_genre').text();
            data.push(search);
          });
          const params = (!!_('#sp').children().last().attr('href')) ? new URLSearchParams(_('#sp').children().last().attr('href').split('?')[1]) : 0;
          pageCount = (params === 0 || data.length === 0) ? 0 : parseInt(params.get('p')) / itemsPerPage;
        }
        let results = {};
        results.url = url || undefined;
        results.data = data || {};
        results.pagination = {};
        results.pagination.page = (page + 1) || undefined;
        results.pagination.pageCount = (pageCount + 1) || undefined;
        results.pagination.pageSize = data.length || undefined;
        return results;
      });
  }

  async chapters(uri){
    const url = this.url + uri;
    return fetch(url)
      .then(res => res.text())
      .then(body => {
        let _ = cheerio.load(body);
        let chapters = [];
        _('#listing tr').each(function(result){
          if(_(this).attr('class') != 'table_head'){
						let chapter = {};
            chapter.url = "/pages/mangareader" + _(this).find('td').first().find("a").attr('href');
            chapter.title = _(this).find('td').first().text().replace(/(?:\r\n|\r|\n)/g, '');
            chapter.date = _(this).find('td').last().text();
            chapters.push(chapter);
          }
        });
        let results = {};
				results.url = url || undefined;
				results.chapterCount = chapters.length || undefined;
				results.chapters = chapters || undefined;
        return results;
      });
  }

  async pages(uri, chapter){
    const url = this.url + uri + "/" + chapter;
    return fetch(url)
      .then(res => res.text())
      .then(body => {
        let _ = cheerio.load(body);
        let pages = [];
        _('#pageMenu option').each(function(result) {
          let page = {};
          page.url = "/page/mangareader" + ((parseInt(_(this).text()) === 1) ? _(this).attr('value') + "/1" : _(this).attr('value'));
          page.number = _(this).text();
          pages.push(page);
        });
      let results = {};
      results.url = url || undefined;
      results.pageCount = pages.length;
      results.pages = pages;
      return results;
    });
  }

  async page(uri, chapter, page){
    const url = this.url + uri + "/" + chapter + ((parseInt(page) === 1) ? "" : ("/" + page));
    return fetch(url)
      .then(this.successful)
      .then(res => res.text())
      .then(body => {
        let _ = cheerio.load(body);
        let image = {};
        image.width = _('#imgholder').find('img').first().attr('width');
        image.height = _('#imgholder').find('img').first().attr('height');
        image.url = _('#imgholder').find('img').first().attr('src');
        let results = {};
        results.url = url || undefined;
        results.image = image;
        return results;
      });
  }
}

export default MangaReader;
