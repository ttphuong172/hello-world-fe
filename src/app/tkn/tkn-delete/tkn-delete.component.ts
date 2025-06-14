import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TknService} from "../../../services/tkn.service";

@Component({
  selector: 'app-tkn-delete',
  templateUrl: './tkn-delete.component.html',
  styleUrls: ['./tkn-delete.component.css']
})
export class TknDeleteComponent implements OnInit{
  tkn:any
  constructor(
    public dialogRefDelete: MatDialogRef<TknDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private router:Router,
    private tknService:TknService
  ) {
  }
  ngOnInit(): void {
    this.tkn = this.data
  }

  delete(tkn: any) {
    this.tknService.isVisible(this.tkn.id).subscribe(
      () => {
        this.dialogRefDelete.close();
        this.router.navigateByUrl("/tkn")
      }
    )
  }
  closeDialogDelete() {
    this.dialogRefDelete.close();
  }
}
