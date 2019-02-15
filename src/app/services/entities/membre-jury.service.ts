import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IMembreJury } from 'app/shared/model/membre-jury.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IMembreJury>;
type EntityArrayResponseType = HttpResponse<IMembreJury[]>;

@Injectable({ providedIn: 'root' })
export class MembreJuryService {
    public resourceUrl = BASE_URL+'/api/membre-juries';

    constructor(protected http: HttpClient) {}

    create(membreJury: IMembreJury): Observable<EntityResponseType> {
        return this.http.post<IMembreJury>(this.resourceUrl, membreJury, { observe: 'response' });
    }

    update(membreJury: IMembreJury): Observable<EntityResponseType> {
        return this.http.put<IMembreJury>(this.resourceUrl, membreJury, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMembreJury>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMembreJury[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
