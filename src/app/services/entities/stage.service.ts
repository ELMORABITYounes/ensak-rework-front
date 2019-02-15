import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { createRequestOption } from 'app/shared/index';
import { IStage } from 'app/shared/model/stage.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IStage>;
type EntityArrayResponseType = HttpResponse<IStage[]>;

@Injectable({ providedIn: 'root' })
export class StageService {
    public resourceUrl = BASE_URL+'/api/stages';

    constructor(protected http: HttpClient) {}
  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }
    create(stage: IStage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stage);
        return this.http
            .post<IStage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stage: IStage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stage);
        return this.http
            .put<IStage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

  queryByUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStage[]>(this.resourceUrl+"/byUser", { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(stage: IStage): IStage {
        const copy: IStage = Object.assign({}, stage, {
            dateDebut: stage.dateDebut != null && stage.dateDebut.isValid() ? stage.dateDebut.format(DATE_FORMAT) : null,
            dateFin: stage.dateFin != null && stage.dateFin.isValid() ? stage.dateFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
            res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((stage: IStage) => {
                stage.dateDebut = stage.dateDebut != null ? moment(stage.dateDebut) : null;
                stage.dateFin = stage.dateFin != null ? moment(stage.dateFin) : null;
            });
        }
        return res;
    }
}
