import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomResponse } from './interfaces/CustomResponse';
import { AppState } from './interfaces/AppState';
import { ServerService } from './services/server.service';
import { DataState } from './enums/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = '@myservers/client';

  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  constructor(private readonly serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.getServers$.pipe(
      map((response) => {
        return {
          dataState: DataState.LOADED_STATE,
          appData: {
            ...response,
            data: {
              serversCount: response.data.servers?.length ?? 0,
              servers: response.data.servers?.reverse(),
            },
          },
        };
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }
}
