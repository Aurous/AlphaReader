'use strict';

class SourceService {
  constructor(sourceSlug){
    if(new.target === SourceService){
      throw new TypeError('Cannot construct SourceService instances directly');
    }
    this.sourceSlug = sourceSlug;

    if((this.search === undefined) ||
      (this.chapters === undefined) ||
      (this.pages === undefined) ||
      (this.page === undefined)){
        throw new TypeError('Service must impement all methods');
    }
  }
}

export default SourceService;
