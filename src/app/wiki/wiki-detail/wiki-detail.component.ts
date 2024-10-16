import {Component, OnInit} from '@angular/core';
import {WikiService} from "../../../services/wiki.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-wiki-detail',
  templateUrl: './wiki-detail.component.html',
  styleUrls: ['./wiki-detail.component.css']
})
export class WikiDetailComponent implements OnInit{
  wiki: any;
  constructor(
    private wikiService:WikiService,
    private activatedRoute:ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.wikiService.findById(id).subscribe(
      (data)=>{
        this.wiki = data
      }
    )
  }

}
