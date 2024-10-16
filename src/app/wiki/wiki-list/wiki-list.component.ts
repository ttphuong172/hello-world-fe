import {Component, OnInit} from '@angular/core';
import {WikiService} from "../../../services/wiki.service";

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.css']
})
export class WikiListComponent implements OnInit{
  wikiList: any;
  keyword: any;
  constructor(
    private wikiService:WikiService
  ) {
  }
  ngOnInit(): void {
    this.wikiService.findAll().subscribe(
      (data)=>{
        this.wikiList = data
      }
    )
  }

  search() {
    this.wikiService.searchNews(this.keyword).subscribe(
      (data)=>{
        this.wikiList = data
      }
    )
  }
}
