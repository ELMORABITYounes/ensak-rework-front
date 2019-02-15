import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IEnseignement } from 'app/shared/model/enseignement.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IEnseignement>;
type EntityArrayResponseType = HttpResponse<IEnseignement[]>;

@Injectable({ providedIn: 'root' })
export class EnseignementService {
    public resourceUrl = BASE_URL+'/api/enseignements';

    constructor(protected http: HttpClient) {}

    create(enseignement: IEnseignement): Observable<EntityResponseType> {
        return this.http.post<IEnseignement>(this.resourceUrl, enseignement, { observe: 'response' });
    }

    update(enseignement: IEnseignement): Observable<EntityResponseType> {
        return this.http.put<IEnseignement>(this.resourceUrl, enseignement, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnseignement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnseignement[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

  queryByUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnseignement[]>(this.resourceUrl+"/byUser", { params: options, observe: 'response' });
  }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
