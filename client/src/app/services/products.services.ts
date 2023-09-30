import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../services/models';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{
    public url: string;

    constructor( public _http: HttpClient ) {
        this.url = environment.apiUrl
    }

    getProducts( limit = 5 ) : Observable<any> {
        const params = new HttpParams().set('limit', limit);
        return this._http.get(this.url+'bp/products', { params })
    }

    getProductById(id:any) : Observable<any> {
        return this._http.get(this.url+'bp/products/'+id)
    }

    postProduct(data:Product) : Observable<any> {
        return this._http.post(this.url+'bp/products', data)
    }

    putProduct(data:Product) : Observable<any> {
        return this._http.put(this.url+'bp/products/'+data.id, data)
    }

    deleteProduct(id:any) : Observable<any> {
        return this._http.delete(this.url+'bp/products/'+id)
    }
}