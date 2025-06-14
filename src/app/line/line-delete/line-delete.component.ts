import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LineService} from "../../../services/line.service";

@Component({
  selector: 'app-line-delete',
  templateUrl: './line-delete.component.html',
  styleUrls: ['./line-delete.component.css']
})
export class LineDeleteComponent implements OnInit{
  line:any;
  constructor(
    public dialogRefDelete: MatDialogRef<LineDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private lineService:LineService
  ) {
  }

  ngOnInit(): void {
    this.line = this.data

    // console.log(this.line)
  }

  delete(line: any) {
    this.lineService.delete(line).subscribe(
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

}
