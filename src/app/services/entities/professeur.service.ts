import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IProfesseur } from 'app/shared/model/professeur.model';
import {IListProfesseurs} from "../../shared/model/list-professeurs.model";
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IProfesseur>;
type EntityArrayResponseType = HttpResponse<IProfesseur[]>;

@Injectable({ providedIn: 'root' })
export class ProfesseurService {
    public resourceUrl =  BASE_URL+'/api/professeurs';

    constructor(protected http: HttpClient) {}

  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }

  import(list: IListProfesseurs): Observable<any> {
    return this.http.post(`${this.resourceUrl}/import`, list);
  }

    create(professeur: IProfesseur): Observable<EntityResponseType> {
        return this.http.post<IProfesseur>(this.resourceUrl, professeur, { observe: 'response' });
    }

    update(professeur: IProfesseur): Observable<EntityResponseType> {
        return this.http.put<IProfesseur>(this.resourceUrl, professeur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProfesseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProfesseur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

  checkSomme(value:string):Observable<boolean>{
    return this.http.get<boolean>(BASE_URL+"/api/checkSomme?value="+value)
  }
}
