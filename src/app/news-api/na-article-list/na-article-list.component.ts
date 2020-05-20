import { Component, OnInit } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';
import { PaginatorCommand } from 'src/app/shared/paginator/paginator.component';
import { UkNewsApiService } from '../uk-news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css'],
})
export class NaArticleListComponent implements OnInit {
  UsArticles: Article[];
  UsTotalRecordNumber: number;
  UkArticles: Article[];
  UkTotalRecordNumber: number;
  pageSize = 5;
  constructor(
    private newsApiService: NewsApiService,
    private ukNewsApiService: UkNewsApiService
  ) {
    newsApiService.pagesOutput.subscribe((articles) => {
      this.UsArticles = articles;
    });
    newsApiService.totalRecordNumber.subscribe((totalPages) => {
      this.UsTotalRecordNumber = totalPages;
    });


    ukNewsApiService.pagesOutput.subscribe((articles) => {
      this.UkArticles = articles;
    });
    ukNewsApiService.totalRecordNumber.subscribe((totalPages) => {
      this.UkTotalRecordNumber = totalPages;
    });
    this.ukNewsApiService.getPage(1, this.pageSize);
  }

  gotoPageUsNews(command: PaginatorCommand) {
    this.newsApiService.getPage(command.page, command.pageSize);
  }
  gotoPageUkNews(command: PaginatorCommand) {
    this.ukNewsApiService.getPage(command.page, command.pageSize);
  }
  //یا دوتا متود بالا رو یکی میکنیم و با یه متعیر ورودی و یه شرط اینکارو میکنیم



  ngOnInit(): void {}
}
