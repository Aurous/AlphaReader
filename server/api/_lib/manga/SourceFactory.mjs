'use strict';

import MangaReader from './mangareader/service.mjs';

export default function(source){
  switch(source){
    case 'mangareader':
      return new MangaReader();
    default:
      throw new TypeError("Unknown MangaService");
  }
}
