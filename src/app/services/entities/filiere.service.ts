import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IFiliere } from 'app/shared/model/filiere.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IFiliere>;
type EntityArrayResponseType = HttpResponse<IFiliere[]>;

@Injectable({ providedIn: 'root' })
export class FiliereService {
    public resourceUrl =  BASE_URL+'/api/filieres';

    constructor(protected http: HttpClient) {}

  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }
    create(filiere: IFiliere): Observable<EntityResponseType> {
        return this.http.post<IFiliere>(this.resourceUrl, filiere, { observe: 'response' });
    }

    update(filiere: IFiliere): Observable<EntityResponseType> {
        return this.http.put<IFiliere>(this.resourceUrl, filiere, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFiliere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFiliere[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
