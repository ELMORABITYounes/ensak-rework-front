import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import {IListEtudiants} from "../../shared/model/list-etudiants.model";
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IEtudiant>;
type EntityArrayResponseType = HttpResponse<IEtudiant[]>;

@Injectable({ providedIn: 'root' })
export class EtudiantService {
    public resourceUrl = BASE_URL+'/api/etudiants';

    constructor(protected http: HttpClient) {}

    create(etudiant: IEtudiant): Observable<EntityResponseType> {
        return this.http.post<IEtudiant>(this.resourceUrl, etudiant, { observe: 'response' });
    }

  import(list: IListEtudiants): Observable<any> {
    return this.http.post(`${this.resourceUrl}/import`, list);
  }

    update(etudiant: IEtudiant): Observable<EntityResponseType> {
        return this.http.put<IEtudiant>(this.resourceUrl, etudiant, { observe: 'response' });
    }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtudiant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEtudiant[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

  checkCne(value:string):Observable<boolean>{
    return this.http.get<boolean>(BASE_URL+"/api/checkCne?value="+value)
  }
}
