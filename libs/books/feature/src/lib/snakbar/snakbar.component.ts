import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
    addToReadingList,
    clearSearch,
    getAllBooks,
    ReadingListBook,
    searchBooks,
    removeFromReadingList
  } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';


@Component({
    selector: 'snack-bar-component',
    templateUrl: './snakbar.component.html',
  })
  export class SnakBarComponent {
    constructor( 
      public snackBarRef: MatSnackBarRef<SnakBarComponent>,
      @Inject(MAT_SNACK_BAR_DATA) public data: any, private store: Store) { }



    undoAction() {
        let book:ReadingListBook = this.data.book;

        if(this.data.type === 'add') {
            this.store.dispatch(addToReadingList({book}));
        }
        if(this.data.type === 'delete') {
            let item: any = book;
            this.store.dispatch(removeFromReadingList({item}));
        }
        this.snackBarRef.dismiss();
    }
  }
  