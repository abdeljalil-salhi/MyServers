import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, catchError, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomResponse } from '../interfaces/CustomResponse';
import { Server } from '../interfaces/Server';
import { Status } from '../enums/status.enum';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl: string = environment.API_URL;

  getServers$ = <Observable<CustomResponse>>(
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`).pipe(
      map((response: CustomResponse) => ({
        ...response,
        data: {
          serversCount: response.data.servers?.length,
          servers: response.data.servers?.reverse(),
        },
      })),
      tap(console.log),
      catchError(this.handleError)
    )
  );

  saveServer$ = (server: Server) =>
    <Observable<CustomResponse>>(
      this.http
        .post<CustomResponse>(`${this.apiUrl}/server/save`, server)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  pingServer$ = (ipAddress: string) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  deleteServer$ = (serverId: number) =>
    <Observable<CustomResponse>>(
      this.http
        .delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  filterServers$ = (status: Status, response: CustomResponse) =>
    new Observable<CustomResponse>((subscriber: Subscriber<CustomResponse>) => {
      console.log(response);
      const filteredServers: Server[] =
        response.data.servers?.filter(
          (server: Server) => server.status === status
        ) || [];

      subscriber.next(
        status === Status.ALL
          ? {
              ...response,
              message: `Servers filtered by ${status} status`,
            }
          : {
              ...response,
              message:
                filteredServers.length > 0
                  ? `Servers filtered by ${
                      status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'
                    } status`
                  : `No servers of ${status} found`,
              data: {
                serversCount: filteredServers.length,
                servers: filteredServers,
              },
            }
      );
      subscriber.complete();
    }).pipe(tap(console.log), catchError(this.handleError));

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(() => `An error occurred - Error code: ${error.status}`);
  }
}
