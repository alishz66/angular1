import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnChanges {
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Input() numberOfPages: number;
  pageOptions: string[];

  currentPage = 1;

  constructor() {}

  ngOnChanges() {
    this.preparePageOptions();
    this.onPageChange.emit(1);
  }

  private preparePageOptions() {
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
    this.onPageChange.emit(this.currentPage);
  }
  ngOnInit(): void {
  }
}
