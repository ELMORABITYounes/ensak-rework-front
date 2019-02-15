import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { ISociete } from 'app/shared/model/societe.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<ISociete>;
type EntityArrayResponseType = HttpResponse<ISociete[]>;

@Injectable({ providedIn: 'root' })
export class SocieteService {
    public resourceUrl =  BASE_URL+'/api/societes';

    constructor(protected http: HttpClient) {}

  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }
    create(societe: ISociete): Observable<EntityResponseType> {
        return this.http.post<ISociete>(this.resourceUrl, societe, { observe: 'response' });
    }

    update(societe: ISociete): Observable<EntityResponseType> {
        return this.http.put<ISociete>(this.resourceUrl, societe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISociete>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISociete[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
