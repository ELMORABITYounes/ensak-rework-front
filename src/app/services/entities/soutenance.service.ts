import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { createRequestOption } from 'app/shared/index';
import { ISoutenance } from 'app/shared/model/soutenance.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<ISoutenance>;
type EntityArrayResponseType = HttpResponse<ISoutenance[]>;

@Injectable({ providedIn: 'root' })
export class SoutenanceService {
    public resourceUrl =  BASE_URL+'/api/soutenances';

    constructor(protected http: HttpClient) {}

    create(soutenance: ISoutenance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(soutenance);
        return this.http
            .post<ISoutenance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(soutenance: ISoutenance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(soutenance);
        return this.http
            .put<ISoutenance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISoutenance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISoutenance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(soutenance: ISoutenance): ISoutenance {
        const copy: ISoutenance = Object.assign({}, soutenance, {
            date: soutenance.date != null && soutenance.date.isValid() ? soutenance.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((soutenance: ISoutenance) => {
                soutenance.date = soutenance.date != null ? moment(soutenance.date) : null;
            });
        }
        return res;
    }
}
