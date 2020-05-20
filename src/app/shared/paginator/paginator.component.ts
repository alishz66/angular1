import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

export interface PaginatorCommand {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnChanges {
  @Output() onPageChange: EventEmitter<PaginatorCommand> = new EventEmitter();
  @Input() totalRecordNumber: number;
  @Input() pageSize: number = 5;

  numberOfPages: number;

  pageOptions: string[];

  currentPage = 1;

  constructor() {}

  ngOnChanges() {
    this.preparePageOptions();
    this.onPageChange.emit({
      page: 1,
      pageSize: this.pageSize,
    });
  }

  private preparePageOptions() {
    this.numberOfPages = Math.ceil(this.totalRecordNumber / this.pageSize);
    this.pageOptions = [
      String(this.currentPage - 2),
      String(this.currentPage - 1),
      String(this.currentPage),
      String(this.currentPage + 1),
      String(this.currentPage + 2),
    ].filter(
      (pageNumber) =>
        parseInt(pageNumber) >= 1 && parseInt(pageNumber) <= this.numberOfPages
    );
  }
  gotoPage(pageNumber: number) {
    if (pageNumber < 1) return;
    if (pageNumber > this.numberOfPages) return;
    this.currentPage = pageNumber;
    this.preparePageOptions();
    this.onPageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
    });
  }
  ngOnInit(): void {}
}
