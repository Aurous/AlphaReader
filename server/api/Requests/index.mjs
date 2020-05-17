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

  async manga(uri){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.manga(uri);
    return results;
  }

  async chapters(uri){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.chapters(uri);
    return results;
  }

  async page(uri){
    const SourceService = SourceFactory(this.source);
    const results = await SourceService.page(uri);
    return results;
  }
}

export default Requests;
