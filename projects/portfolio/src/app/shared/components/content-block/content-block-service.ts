import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  ContentBlock
} from './content-block.model';

@Injectable({
  providedIn: 'root'
})
export class ContentBlockService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getBlocks(
    url: string
  ): Observable<ContentBlock[]> {

    return this.http.get<ContentBlock[]>(
      url
    );

  }

  createBlock(
    url: string,
    block: ContentBlock
  ): Observable<ContentBlock> {

    return this.http.post<ContentBlock>(
      url,
      block
    );

  }

  updateBlock(
    url: string,
    blockId: string,
    block: ContentBlock
  ): Observable<ContentBlock> {

    return this.http.put<ContentBlock>(
      `${url}/${blockId}`,
      block
    );

  }

  deleteBlock(
    url: string,
    blockId: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${url}/${blockId}`
    );

  }

}