import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';
import { Instrument } from '../model/instrument.model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Array<Instrument>>(env.API + '/instruments');
  }
}
