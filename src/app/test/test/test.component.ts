import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LineService} from "../../../services/line.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  line:any
  myVariable:any
  constructor(
    private activatedRoute: ActivatedRoute,
    private lineService:LineService,
    private title: Title
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.lineService.findById(id).subscribe(
      (data)=>{
        this.line = data;
        this.title.setTitle(this.line.name)
        console.log(this.line)
        this.myVariable =this.line.company.id;
      }
    )
  }

}
