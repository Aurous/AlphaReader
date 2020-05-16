'use strict';

import MangaReader from './mangareader/service.mjs';

export default function(body, manga){
  switch(manga){
    case 'mangareader':
      return new MangaReader(body);
    default:
      throw new TypeError("Unknown MangaService");
  }
}
