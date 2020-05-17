import SourceFactory from '../_lib/manga/SourceFactory.mjs';

class Requests {
  constructor(source){
    this.source = source
  }

  async search(query){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.search(query);
    return results;
  }

  async chapters(uri){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.chapters(uri);
    return results;
  }

  async pages(uri, chapter){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.pages(uri, chapter);
    return results;
  }

  async page(uri, chapter, page){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.page(uri, chapter, page);
    return results;
  }
}

export default Requests;
