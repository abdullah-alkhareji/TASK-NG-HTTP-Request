import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private readonly _http = inject(HttpClient);

  /**
   * Generic function to get a resource from the server
   * @param url - The URL to get the resource from
   * @param params - The parameters to pass to the server
   * @param headers - The headers to pass to the server
   * @returns The resource from the server
   */
  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders) {
    return this._http.get<T>(url, { params, headers });
  }

  /**
   * Generic function to post a resource to the server
   * @param url - The URL to post the resource to
   * @param body - The resource to post to the server
   * @param headers - The headers to pass to the server
   * @returns The resource from the server
   */
  post<T>(url: string, body: T, headers?: HttpHeaders) {
    return this._http.post<T>(url, body, { headers });
  }

  /**
   * Generic function to put a resource to the server
   * @param url - The URL to put the resource to
   * @param body - The resource to put to the server
   * @param headers - The headers to pass to the server
   * @returns The resource from the server
   */
  put<T>(url: string, body: T, headers?: HttpHeaders) {
    return this._http.put<T>(url, body, { headers });
  }

  /**
   * Generic function to delete a resource from the server
   * @param url - The URL to delete the resource from
   * @param params - The parameters to pass to the server
   * @param headers - The headers to pass to the server
   * @returns The resource from the server
   */
  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders) {
    return this._http.delete<T>(url, { params, headers });
  }
}
