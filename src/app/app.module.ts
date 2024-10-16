import {NgModule} from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


    RouterModule.forRoot([
      {path: "", component: TasksListComponent},
      {path: "add", component: TasksComponent},
      {path: "edit/:id", component: TasksEditComponent},
      {path: "site/company/:id", component: SiteListComponent},
      {path: "site/add/:id", component: SiteAddComponent},
      {path: "site/edit/:id", component: SiteEditComponent},
      {path: "site/detail/:id", component: SiteDetailComponent},
      {path: "line/add/:id", component: LineAddComponent},
      {path: "line/edit/:id", component: LineEditComponent},
      {path: "contact/add/:id", component: ContactAddComponent},
      {path: "contact/edit/:id", component: ContactEditComponent},
      {path: "sms", component: SmsCreateComponent},
      {path: "smsinnotek", component: SmsCreateInnotekComponent},
      {path: "smsensol", component: SmsCreateEnsolComponent},
      {path: "smschem", component: SmsCreateChemComponent},
      {path: "task", component: TaskReportComponent},
      {path: "wiki", component: WikiListComponent},
      {path: "wiki/detail/:id", component: WikiDetailComponent},

    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

