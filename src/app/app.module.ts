import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TasksEditComponent} from './tasks-edit/tasks-edit.component';
import {RouterModule} from "@angular/router";
import {SiteListComponent} from './site/site-list/site-list.component';
import {SiteAddComponent} from './site/site-add/site-add.component';
import {SiteEditComponent} from './site/site-edit/site-edit.component';
import { SmsCreateComponent } from './sms/sms-create/sms-create.component';
import { TaskReportComponent } from './task/task-report/task-report.component';
import { SiteDetailComponent } from './site/site-detail/site-detail.component';
import { LineAddComponent } from './line/line-add/line-add.component';
import { LineEditComponent } from './line/line-edit/line-edit.component';
import { SmsCreateInnotekComponent } from './sms/sms-create-innotek/sms-create-innotek.component';
import { SmsCreateEnsolComponent } from './sms/sms-create-ensol/sms-create-ensol.component';
import { SmsCreateChemComponent } from './sms/sms-create-chem/sms-create-chem.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { WikiListComponent } from './wiki/wiki-list/wiki-list.component';
import { WikiDetailComponent } from './wiki/wiki-detail/wiki-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { PingListComponent } from './ping/ping-list/ping-list.component';
import { PingAddComponent } from './ping/ping-add/ping-add.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { LineListComponent } from './line/line-list/line-list.component';
import { LineDetailComponent } from './line/line-detail/line-detail.component';
import { SmsCreateTrunkComponent } from './sms/sms-create-trunk/sms-create-trunk.component';
import { ClockComponent } from './common/clock/clock.component';
import { NewPingListComponent } from './ping/new-ping-list/new-ping-list.component';
import { TknCreateComponent } from './tkn/tkn-create/tkn-create.component';
import {QuillModule} from "ngx-quill";
import { TknListComponent } from './tkn/tkn-list/tkn-list.component';
import { LoginComponent } from './common/login/login.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { HomeComponent } from './common/home/home.component';
import { TknDetailComponent } from './tkn/tkn-detail/tkn-detail.component';
import { TknEditComponent } from './tkn/tkn-edit/tkn-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TknDeleteComponent } from './tkn/tkn-delete/tkn-delete.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NotificationComponent } from './common/notification/notification.component';
import { LineDeleteComponent } from './line/line-delete/line-delete.component';
import { ContactDeleteComponent } from './contact/contact-delete/contact-delete.component';
import { MonitoringListComponent } from './monitor/monitoring-list/monitoring-list.component';
import { MonitoringAddComponent } from './monitor/monitoring-add/monitoring-add.component';
import { MonitoringEditComponent } from './monitor/monitoring-edit/monitoring-edit.component';
import { MonitoringDeleteComponent } from './monitor/monitoring-delete/monitoring-delete.component';
import { TestComponent } from './test/test/test.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksListComponent,
    TasksEditComponent,
    SiteListComponent,
    SiteAddComponent,
    SiteEditComponent,
    SmsCreateComponent,
    TaskReportComponent,
    SiteDetailComponent,
    LineAddComponent,
    LineEditComponent,
    SmsCreateInnotekComponent,
    SmsCreateEnsolComponent,
    SmsCreateChemComponent,
    ContactAddComponent,
    ContactEditComponent,
    WikiListComponent,
    WikiDetailComponent,
    ContactListComponent,
    PingListComponent,
    PingAddComponent,
    ContactDetailComponent,
    LineListComponent,
    LineDetailComponent,
    SmsCreateTrunkComponent,
    ClockComponent,
    NewPingListComponent,
    TknCreateComponent,
    TknListComponent,
    LoginComponent,
    HomeComponent,
    TknDetailComponent,
    TknEditComponent,
    TknDeleteComponent,
    NotificationComponent,
    LineDeleteComponent,
    ContactDeleteComponent,
    MonitoringListComponent,
    MonitoringAddComponent,
    MonitoringEditComponent,
    MonitoringDeleteComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,


    QuillModule.forRoot(),
    RouterModule.forRoot([
      {path: "", component: LoginComponent},
      {
        path: "", component: HomeComponent, children: [
          {path: "tkn", component: TknListComponent},
          {path: "tkn/add", component: TknCreateComponent},
          {path: "tkn/detail/:id", component: TknDetailComponent},
          {path: "tkn/edit/:id", component: TknEditComponent},
          {path: "task", component: TasksListComponent},
          {path: "add", component: TasksComponent},
          {path: "edit/:id", component: TasksEditComponent},
          {path: "site/company/:id", component: SiteListComponent},
          {path: "site/company/contacts/:id", component: ContactListComponent},
          {path: "site/company/lines/:id", component: LineListComponent},
          {path: "site/add/:id", component: SiteAddComponent},
          {path: "site/edit/:id", component: SiteEditComponent},
          {path: "site/detail/:id", component: SiteDetailComponent},
          {path: "line/add/:id", component: LineAddComponent},
          {path: "line/edit/:id", component: LineEditComponent},
          {path: "line/detail/:id", component: LineDetailComponent},
          {path: "contact/add/:id", component: ContactAddComponent},
          {path: "contact/edit/:id", component: ContactEditComponent},
          {path: "contact/detail/:id", component: ContactDetailComponent},
          {path: "ping", component: PingListComponent},
          {path: "ping/add", component: PingAddComponent},
          {path: "sms", component: SmsCreateComponent},
          {path: "smsinnotek", component: SmsCreateInnotekComponent},
          {path: "smsensol", component: SmsCreateEnsolComponent},
          {path: "smschem", component: SmsCreateChemComponent},
          {path: "report", component: TaskReportComponent},
          {path: "wiki", component: WikiListComponent},
          {path: "wiki/detail/:id", component: WikiDetailComponent},
          {path: "smstrunk", component: SmsCreateTrunkComponent},
          {path: "notification", component: NotificationComponent},
          {path: "monitoring", component: MonitoringListComponent},
          {path: "monitoring/add", component: MonitoringAddComponent},
          {path: "monitoring/edit/:id", component: MonitoringEditComponent},
          {path: "test/line/:id", component: TestComponent},
        ]
      }
      // {path: "tkn", component: TknListComponent},
      // {path: "tkn/add", component: TknCreateComponent},
      // {path: "task", component: TasksListComponent},
      // {path: "add", component: TasksComponent},
      // {path: "edit/:id", component: TasksEditComponent},
      // {path: "site/company/:id", component: SiteListComponent},
      // {path: "site/company/contacts/:id", component: ContactListComponent},
      // {path: "site/company/lines/:id", component: LineListComponent},
      // {path: "site/add/:id", component: SiteAddComponent},
      // {path: "site/edit/:id", component: SiteEditComponent},
      // {path: "site/detail/:id", component: SiteDetailComponent},
      // {path: "line/add/:id", component: LineAddComponent},
      // {path: "line/edit/:id", component: LineEditComponent},
      // {path: "line/detail/:id", component: LineDetailComponent},
      // {path: "contact/add/:id", component: ContactAddComponent},
      // {path: "contact/edit/:id", component: ContactEditComponent},
      // {path: "contact/detail/:id", component: ContactDetailComponent},
      // {path: "ping", component: PingListComponent},
      // {path: "ping/add", component: PingAddComponent},
      // {path: "sms", component: SmsCreateComponent},
      // {path: "smsinnotek", component: SmsCreateInnotekComponent},
      // {path: "smsensol", component: SmsCreateEnsolComponent},
      // {path: "smschem", component: SmsCreateChemComponent},
      // {path: "report", component: TaskReportComponent},
      // {path: "wiki", component: WikiListComponent},
      // {path: "wiki/detail/:id", component: WikiDetailComponent},
      // {path: "smstrunk", component: SmsCreateTrunkComponent},

    ], {useHash: true}),
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
