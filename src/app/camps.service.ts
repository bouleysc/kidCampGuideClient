import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataTableParams } from 'angular-4-data-table';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


const BASE_URL = 'http://localhost:8080';

function paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }

    return result.map(param => param.join('=')).join('&');
}


@Injectable()
export class CampsService {

    constructor (private http: Http) {}

    query(params: DataTableParams) {
        return this.http.get(BASE_URL + '/camps?' + paramsToQueryString(params)).toPromise()
            .then((response: Response) => ({
                camps: response.json(),
                count: Number(response.headers.get('X-Total-Count'))
            }));
    }
}
