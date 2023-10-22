import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, updateFromReadingList, updateFinishedReadingList } from '@tmo/books/data-access';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  updateFromReadingList(item, id) {
    document.getElementById(id).innerText = "Finished At: " + new Date().toISOString();
    item = Object.assign({bookId: item.id, finishedDate: new Date().toISOString()}, item);
    this.store.dispatch(updateFinishedReadingList({ item }));
  }
}
