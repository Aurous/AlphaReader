'use strict';

class MangaService {
  constructor(mangaSlug){
    if(new.target === MangaService){
      throw new TypeError('Cannot construct MangaService instances directly');
    }
    this.mangaSlug = mangaSlug;

    if((this.search === undefined) ||
      (this.manga === undefined) ||
      (this.chapters === undefined) ||
      (this.page === undefined)){
        throw new TypeError('Service must impement all methods');
    }
  }

  getMangaName(){
    return this.mangaSlug;
  }
}

export default MangaService;
