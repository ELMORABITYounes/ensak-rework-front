import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { ISemestre } from 'app/shared/model/semestre.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<ISemestre>;
type EntityArrayResponseType = HttpResponse<ISemestre[]>;

@Injectable({ providedIn: 'root' })
export class SemestreService {
    public resourceUrl =  BASE_URL+'/api/semestres';

    constructor(protected http: HttpClient) {}

    create(semestre: ISemestre): Observable<EntityResponseType> {
        return this.http.post<ISemestre>(this.resourceUrl, semestre, { observe: 'response' });
    }

    update(semestre: ISemestre): Observable<EntityResponseType> {
        return this.http.put<ISemestre>(this.resourceUrl, semestre, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISemestre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISemestre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
