import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/index';
import { IProfile } from 'app/shared/model/profile.model';
import {BASE_URL} from "../../shared/constants/server.constants";

type EntityResponseType = HttpResponse<IProfile>;
type EntityArrayResponseType = HttpResponse<IProfile[]>;

@Injectable({ providedIn: 'root' })
export class ProfileService {
    public resourceUrl = BASE_URL+'api/profiles';

    constructor(protected http: HttpClient) {}

    create(profile: IProfile): Observable<EntityResponseType> {
        return this.http.post<IProfile>(this.resourceUrl, profile, { observe: 'response' });
    }

    update(profile: IProfile): Observable<EntityResponseType> {
        return this.http.put<IProfile>(this.resourceUrl, profile, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getProfile(): Observable<IProfile> {
      return this.http.get<IProfile>(BASE_URL+"/api/profileImage");
    }
}
