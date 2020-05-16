import MangaFactory from '../_lib/manga/MangaFactory.mjs';

class Requests {
  constructor(){
    // placeholder
  }

  async search(uri){
    const mangaService = MangaFactory(uri, "mangareader");
    const results = await mangaService.search(uri);
    console.log("exit 2", results);
    return results;
  }

  manga(){

  }

  chapters(){

  }

  page(){

  }
}

export default Requests;
