import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {ImpactService} from "../../../services/impact.service";
import {EventService} from "../../../services/event.service";
import {SmsService} from "../../../services/sms.service";
import {IspService} from "../../../services/isp.service";

@Component({
  selector: 'app-sms-create-innotek',
  templateUrl: './sms-create-innotek.component.html',
  styleUrls: ['./sms-create-innotek.component.css']
})
export class SmsCreateInnotekComponent implements OnInit {
  smsForm: FormGroup | any;
  siteList: any;
  idSite: any;
  lineList: any;
  impactList: any;
  eventList: any;
  private smsList: any;
  smsString: any;
  smsStringCustomer: string[] = [""];
  isTextPresent: boolean = false;
  isTextPresentCustomer: boolean = false;

  // Variable for email template
  isTextPresentPingLog: boolean = false;
  isTextPresentEmail: boolean = false;
  topoPath = "";
  recipients = "";
  isp: any;
  ispName = "";
  customer = "";
  ci = "";
  line = "";
  event = "";
  time = "";
  ipAddress = "";
  pingCommand = "";

  isTextPresentSubjectEmail: boolean = false;
  isTextPresentCcEmail: boolean = false;
  isTextPresentToEmail: boolean = false;

  contactList: any;
  site: any;
  siteName: any;
  isTextPresentContact: boolean = false;

  addZero(i: number): string {
    if (i < 10) {
      return "0" + i;
    }
    return i.toString();
  }

  constructor(
    private siteService: SiteService,
    private lineService: LineService,
    private impactService: ImpactService,
    private eventService: EventService,
    private smsService: SmsService,
    private ispService: IspService,
  ) {
  }

  ngOnInit(): void {
    this.smsForm = new FormGroup({
      site: new FormControl('', [Validators.required]),
      line: new FormControl('', [Validators.required]),
      network: new FormControl(''),
      impact: new FormControl('', [Validators.required]),
      event: new FormControl('', [Validators.required]),
      extra: new FormControl(''),
      issueTime: new FormControl('', [Validators.required]),
      restoreTime: new FormControl(''),
    })

    this.smsForm.get('extra')?.disable();

    this.siteService.findSitesByCompany_Id(5).subscribe(
      (data) => {
        this.siteList = data;
        this.impactService.getImpact().subscribe(
          (data) => {
            this.impactList = data;
            this.eventService.getEvent().subscribe(
              (data) => {
                this.eventList = data;
              }
            )
          }
        )
      }
    )
  }

  loadSite() {

    this.idSite = this.smsForm.get('site').value.id
    this.lineService.findLinesBySite_Id(this.idSite).subscribe(
      (data) => {
        this.lineList = data;
        this.siteService.findById(this.idSite).subscribe(
          (data) => {
            this.site = data
            this.topoPath = this.site.topoPath;
            this.contactList = this.site.contactList
            this.siteName = this.site.name
            if (this.site.contactList.length > 0) {
              this.isTextPresentContact = true
            } else {
              this.isTextPresentContact = false
            }
          }
        )
      }
    )
  }

  generatorInnotekSms() {
    if ((this.smsForm.get('event').value.name == "Up" ||
      this.smsForm.get('event').value.name == "Down and recovery" ||
      this.smsForm.get('event').value.name == "Redown and recovey" ||
      this.smsForm.get('event').value.name == "Recovery flapping" ||
      this.smsForm.get('event').value.name == "Flapping and recovery" ||
      this.smsForm.get('event').value.name == "Recovery pingloss") &&
      this.smsForm.get('restoreTime').value == "") {
      alert("Fill restore time")
      this.smsString = "";
      this.smsStringCustomer = [""];
    } else {
      this.smsService.generatorInnotekSms(this.smsForm.value).subscribe(
        (data) => {
          this.smsList = data
          this.smsString = this.smsList[0];
          this.isTextPresent = this.smsString.trim().length > 0;

          this.smsStringCustomer = this.smsList[1].split(";");
          this.isTextPresentCustomer = this.smsStringCustomer.length > 0
        }
      )
    }

    this.isTextPresentSubjectEmail = true
    this.isTextPresentCcEmail = true
    this.isTextPresentToEmail = true

    // Get info for email template
    this.ispName = this.smsForm.get('line').value.isp

    if (this.smsForm.get('network').value == "") {
      this.isTextPresentEmail = true
    } else {
      this.isTextPresentEmail = false
    }

    this.ispService.findByName(this.ispName).subscribe(
      (data) => {
        this.isp = data;
        // console.log(this.isp)
        this.recipients = this.isp.recipients
      }
    )

    this.customer = "LG Innotek";
    this.ci = this.smsForm.get('line').value.ci;
    this.line = this.smsForm.get('line').value.name;

    if (this.smsForm.get('event').value.name == "Down/up") {
      this.event = this.smsForm.get('event').value.name.toLowerCase() + " about " + this.smsForm.get('extra').value + " seconds"
    } else if (this.smsForm.get('event').value.name == "Pingloss") {
      this.event = this.smsForm.get('event').value.name.toLowerCase() + " " + this.smsForm.get('extra').value + "%"
    } else if (this.smsForm.get('event').value.name == "Down/up x times") {
      this.event =  "down/up " +this.smsForm.get('extra').value + " times"
    } else if (this.smsForm.get('event').value.name == "RTT") {
      this.event =  "RTT increase " +this.smsForm.get('extra').value + "ms"
    }
    else {
      this.event = this.smsForm.get('event').value.name.toLowerCase()
    }

    const date = new Date(this.smsForm.get('issueTime').value);
    this.time = this.addZero(date.getMonth() + 1) + "/" + this.addZero(date.getDate()) + " " + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + " ~ " + "(KST)";
  }

  copyToClipboard(): void {
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = this.smsString;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  copyToClipboardCustomer(): void {
    // Create a temporary textarea element to hold the text
    const content = document.getElementById('customer');

    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content.innerText;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  copyToEmail() {
    // Create a temporary textarea element to hold the text
    const content = document.getElementById('toEmail');
    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content.innerText;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  copyContact() {
    const content = document.getElementById('contact');
    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content.innerText;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  copyCcEmail() {
    // Create a temporary textarea element to hold the text
    const content = document.getElementById('ccEmail');

    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content.innerText;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  copySubjectEmail(): void {
    // Create a temporary textarea element to hold the text
    const content = document.getElementById('subjectEmail');

    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content.innerText;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  copyToClipboardEmail() {
    // Create a temporary textarea element to hold the text
    const content = document.getElementById('email');

    if (content) {
      const textarea = document.createElement('textarea');
      if (content.textContent != null) {
        textarea.value = content.innerText;
      }
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);
    }
  }

  loadEvent() {
    if (this.smsForm.get('event').value.name == 'Down') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()

    } else if (this.smsForm.get('event').value.name == 'Up') {

      // Impact
      this.smsForm.controls['impact'].setValue("")
      this.smsForm.get('impact')?.disable();

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()

    } else if (this.smsForm.get('event').value.name == 'Down/up') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.get('extra')?.enable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()
    } else if (this.smsForm.get('event').value.name == 'Down/up x times') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue(2)
      this.smsForm.get('extra')?.enable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()

    } else if (this.smsForm.get('event').value.name == 'Down and recovery') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    } else if (this.smsForm.get('event').value.name == 'Redown') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()
    } else if (this.smsForm.get('event').value.name == 'Redown and recovey') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    } else if (this.smsForm.get('event').value.name == "Flapping") {
      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 1, "name": "Backup service", "nameKr": "백업 서비스"})

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()
    } else if (this.smsForm.get('event').value.name == "Recovery flapping") {

      // Impact
      this.smsForm.controls['impact'].setValue("")
      this.smsForm.get('impact')?.disable();

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    } else if (this.smsForm.get('event').value.name == 'Flapping and recovery') {

      // Impact
      this.smsForm.controls['impact'].setValue("")
      this.smsForm.get('impact')?.disable();

      // Value Pingloss
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    } else if (this.smsForm.get('event').value.name == 'Pingloss') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 5, "name": "Delay of service", "nameKr": "서비스 지연"})

      // Value Pingloss
      this.smsForm.get('extra')?.enable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()

    } else if (this.smsForm.get('event').value.name == 'Recovery pingloss') {

      // Impact
      this.smsForm.controls['impact'].setValue("")
      this.smsForm.get('impact')?.disable();

      // Value
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    } else if (this.smsForm.get('event').value.name == 'RTT') {

      // Impact
      this.smsForm.get('impact')?.enable();
      this.smsForm.controls['impact'].setValue({"id": 5, "name": "Delay of service", "nameKr": "서비스 지연"})

      // Value
      this.smsForm.get('extra')?.enable();

      // Restore Time
      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable()

    } else if (this.smsForm.get('event').value.name == 'Recovery RTT') {

      // Impact
      this.smsForm.controls['impact'].setValue("")
      this.smsForm.get('impact')?.disable();

      // Value
      this.smsForm.controls['extra'].setValue("")
      this.smsForm.get('extra')?.disable();

      // Restore Time
      this.smsForm.get('restoreTime')?.enable()
    }
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  loadNetwork() {
    if (this.smsForm.get('network').value == "") {
      this.smsForm.get('line').setValue("")
      this.smsForm.get('line')?.enable();

      this.smsForm.get('event').setValue("")
      this.smsForm.get('event')?.enable();

      this.smsForm.get('extra').setValue("")
      this.smsForm.get('extra')?.enable();

      this.smsForm.get('impact').setValue("")
      this.smsForm.get('impact')?.enable();

      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.enable();

    } else if (this.smsForm.get('network').value == "Down") {
      this.smsForm.get('line').setValue("")
      this.smsForm.get('line')?.disable();

      this.smsForm.get('event').setValue("")
      this.smsForm.get('event')?.disable();

      this.smsForm.get('extra').setValue("")
      this.smsForm.get('extra')?.disable();

      this.smsForm.get('impact')?.enable();
      this.smsForm.get('impact').setValue({"id": 2, "name": "Service unavailable", "nameKr": "서비스 불가"})

      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.disable();

    } else if (this.smsForm.get('network').value == "Recovered") {
      this.smsForm.get('line').setValue("")
      this.smsForm.get('line')?.disable();

      this.smsForm.get('event').setValue("")
      this.smsForm.get('event')?.disable();

      this.smsForm.get('extra').setValue("")
      this.smsForm.get('extra')?.disable();

      this.smsForm.get('impact').setValue("")
      this.smsForm.get('impact')?.disable();

      this.smsForm.get('restoreTime').setValue("")
      this.smsForm.get('restoreTime')?.enable();
    }
  }

  loadLine() {
    this.isTextPresentPingLog = true;
    this.ipAddress = this.smsForm.get('line').value.ipAddress;
    this.pingCommand = this.smsForm.get('line').value.pingtest;
  }
}
