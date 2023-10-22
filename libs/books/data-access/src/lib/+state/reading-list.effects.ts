import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

import { SnakBarComponent } from '../../../../../../libs/books/feature/src/lib/snakbar/snakbar.component'

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => {
            this.snakb("added", book, 'delete');
            return ReadingListActions.confirmedAddToReadingList({ book }); }),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            {
              this.snakb("removed", item, 'add');
              return ReadingListActions.confirmedRemoveFromReadingList({ item })}
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }
  
  snakb(text, book, type) {
    if(book && book.id) {
      //book.bookId = book.id;
      book = Object.assign({bookId: book.id}, book);
    }
    //book.bookId = book && book.id ? book.id: null;
    //this.snakbar.openFromComponent(text, 'Undo')
    let configSuccess: MatSnackBarConfig = {
      panelClass: 'style-success',
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    };
    this.snakbar.openFromComponent(SnakBarComponent, {
      data: {text: text, book: book, type: type},
      ...configSuccess
    });
  }

  constructor(private actions$: Actions, private http: HttpClient, private snakbar: MatSnackBar) {}
}
