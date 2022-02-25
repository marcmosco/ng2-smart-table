import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';


import {TestMarcoComponent} from './test-marco.component';
import {routes} from './testMarco.routes';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    Ng2SmartTableModule
  ],
  declarations: [
    TestMarcoComponent,
  ],
  providers:[DatePipe]
})
export class TestMarcoModule { }
