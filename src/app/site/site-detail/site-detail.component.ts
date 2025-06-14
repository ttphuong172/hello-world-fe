import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";

@Component({
    selector: 'app-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.css'],
    standalone: false
})


export class SiteDetailComponent implements OnInit{
  site:any


  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private lineService:LineService,
    private router:Router,
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(id).subscribe(
      (data)=>{
        this.site = data
        // console.log(this.site)
      }
    )
  }

  return() {
    this.router.navigateByUrl("/site/company/" + this.site.company.id)
  }
}
