import { Component, OnInit } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css'],
})
export class NaArticleListComponent implements OnInit {
  articles: Article[];
  totalPages: number;
  constructor(private newsApiService: NewsApiService) {
    newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles;
    });
    newsApiService.numberOfPages.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });
    this.newsApiService.getPage(1);
  }

  gotoPage(pageNumber: number) {
    this.newsApiService.getPage(pageNumber);
  }

  ngOnInit(): void {}
}
