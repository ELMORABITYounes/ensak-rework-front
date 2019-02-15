import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IModule } from 'app/shared/model/module.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IModule>;
type EntityArrayResponseType = HttpResponse<IModule[]>;

@Injectable({ providedIn: 'root' })
export class ModuleService {
    public resourceUrl = BASE_URL+'/api/modules';

    constructor(protected http: HttpClient) {}

  count(): Observable<number> {
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }

    create(module: IModule): Observable<EntityResponseType> {
        return this.http.post<IModule>(this.resourceUrl, module, { observe: 'response' });
    }

    update(module: IModule): Observable<EntityResponseType> {
        return this.http.put<IModule>(this.resourceUrl, module, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IModule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModule[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

  queryByUser() {
    return this.http.get<IModule[]>(this.resourceUrl+"/byUser");
  }
}
