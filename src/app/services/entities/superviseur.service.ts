import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { ISuperviseur } from 'app/shared/model/superviseur.model';
import {IUser} from "../../shared/model/user.model";
import {ISociete} from "../../shared/model/societe.model";
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<ISuperviseur>;
type EntityArrayResponseType = HttpResponse<ISuperviseur[]>;

@Injectable({ providedIn: 'root' })
export class SuperviseurService {
    public resourceUrl =  BASE_URL+'/api/superviseurs';

    constructor(protected http: HttpClient) {}

    create(superviseur: ISuperviseur): Observable<EntityResponseType> {
        return this.http.post<ISuperviseur>(this.resourceUrl, superviseur, { observe: 'response' });
    }

    update(superviseur: ISuperviseur): Observable<EntityResponseType> {
        return this.http.put<ISuperviseur>(this.resourceUrl, superviseur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISuperviseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getBySociete(societe:ISociete): Observable<ISuperviseur[]>{
      return this.http.post<ISuperviseur[]>(`${this.resourceUrl}/bySociete`, societe);
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISuperviseur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

  queryBySociete(societeId): Observable<ISuperviseur[]> {
    return this.http.get<ISuperviseur[]>(`${this.resourceUrl}/bySocieteId/${societeId}`);
  }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
