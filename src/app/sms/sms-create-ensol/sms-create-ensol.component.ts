import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {ImpactService} from "../../../services/impact.service";
import {EventService} from "../../../services/event.service";
import {SmsService} from "../../../services/sms.service";
import {IspService} from "../../../services/isp.service";
import {TimeService} from "../../../services/time.service";

@Component({
    selector: 'app-sms-create-ensol',
    templateUrl: './sms-create-ensol.component.html',
    styleUrls: ['./sms-create-ensol.component.css'],
    standalone: false
})
export class SmsCreateEnsolComponent implements OnInit {
  zoneIdToChild: string = '';

  smsForm: FormGroup | any;
  siteList: any;
  idSite: any;
  lineList: any;
  impactList: any;
  eventList: any;
  private smsList: any;

  //Variable for SMS
  smsString: any;
  smsStringCustomer: any;
  isTextPresent: boolean = false;
  isTextPresentCustomer: boolean = false;

  // Variable for email template
  email:any;
  isTextPresentSubjectEmail: boolean = false;
  isTextPresentCcEmail: boolean = false;
  isTextPresentToEmail: boolean = false;
  isTextPresentEmail: boolean = false;

  isTextPresentPingLog: boolean = false;
  topoPath = "";
  ipAddress = "";
  pingCommand = "";

  contactList: any;
  site: any;
  siteName: any;
  isTextPresentContact: boolean = false;
  content: any;
  currentTime: any;
  isInfoSitePresent: any;
  gmtValue: any;
  isClockPresent: any;

  constructor(
    private siteService: SiteService,
    private lineService: LineService,
    private impactService: ImpactService,
    private eventService: EventService,
    private smsService: SmsService,
    private ispService: IspService,
    private timeService: TimeService,
  ) {
  }

  ngOnInit(): void {
    this.zoneIdToChild = 'Asia/Seoul';

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

    this.siteService.findSitesByCompany_Id(2).subscribe(
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

            // Display clock
            this.zoneIdToChild = this.site.zoneId;
            this.isClockPresent = true;
            this.isInfoSitePresent = true;
            this.gmtValue = this.timeService.getGmt(this.site.zoneId).subscribe(
              (data)=>{
                this.gmtValue = data;
              }
            )

            if (this.site.contactList.length > 0) {
              this.isTextPresentContact = true
            } else {
              this.isTextPresentContact = false
            }
            this.timeService.getTime(this.site.zoneId).subscribe(
              (data)=>{
                this.currentTime = data;
              }
            )
          }
        )
      }
    )
  }

  generatorEnsolSms() {
    if ((this.smsForm.get('event').value.name == "Up" ||
      this.smsForm.get('event').value.name == "Down and recovery" ||
      this.smsForm.get('event').value.name == "Down/up x times" ||
      this.smsForm.get('event').value.name == "Redown and recovery" ||
      this.smsForm.get('event').value.name == "Recovery flapping" ||
      this.smsForm.get('event').value.name == "Flapping and recovery" ||
      this.smsForm.get('event').value.name == "Recovery pingloss") &&
      this.smsForm.get('restoreTime').value == "") {
      alert("Fill restore time")
      this.isTextPresent = false
      this.isTextPresentCustomer = false
      this.isTextPresentSubjectEmail = false
      this.isTextPresentCcEmail = false
      this.isTextPresentToEmail = false
      this.isTextPresentEmail = false
      this.smsString = "";
      this.smsStringCustomer = "";
    } else if ((this.smsForm.get('event').value.name == "Down/up x times" ||
      this.smsForm.get('event').value.name == "Down/up" ||
      this.smsForm.get('event').value.name == "Pingloss" ||
      this.smsForm.get('event').value.name == "RTT") && this.smsForm.get('extra').value == ""){
      alert("Fill extra value")
      this.isTextPresent = false
      this.isTextPresentCustomer = false
      this.isTextPresentSubjectEmail = false
      this.isTextPresentCcEmail = false
      this.isTextPresentToEmail = false
      this.isTextPresentEmail = false
    } else {
      this.smsService.generatorEnsolSms(this.smsForm.value).subscribe(
        (data) => {
          this.smsList = data

          this.smsString = this.smsList[0];
          this.isTextPresent = this.smsString.trim().length > 0;

          this.smsStringCustomer = this.smsList[1];
          this.isTextPresentCustomer = this.smsStringCustomer.length > 0

          this.email = this.smsList[2];

          this.isTextPresentToEmail = Object.keys(this.email).length > 0
          this.isTextPresentCcEmail = Object.keys(this.email).length > 0
          this.isTextPresentSubjectEmail = Object.keys(this.email).length > 0
          this.isTextPresentEmail = Object.keys(this.email).length > 0

          this.content = this.smsList[3];

        }
      )
    }
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

    } else if (this.smsForm.get('network').value == "Flapping") {
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

    }else if (this.smsForm.get('network').value == "Recovery flapping") {
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
    } else if (this.smsForm.get('event').value.name == 'Redown and recovery') {

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






}
