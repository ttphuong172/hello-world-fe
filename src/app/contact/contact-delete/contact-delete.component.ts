import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit{
  contact:any;
  constructor(
    public dialogRefDelete: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private contactService:ContactService,
  ) {

  }
  ngOnInit(): void {
    this.contact = this.data
  }

  delete(contact: any) {
    this.contactService.delete(contact).subscribe(
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }
}
