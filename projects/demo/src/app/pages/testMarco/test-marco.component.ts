import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ServerDataSource} from 'ng2-smart-table';
import {DataSource} from '../../../../../ng2-smart-table/src/lib/lib/data-source/data-source';
import {Deferred} from '../../../../../ng2-smart-table/src/lib/lib/helpers';

@Component({
  selector: 'app-test-marco',
  templateUrl: './test-marco.component.html',
  styleUrls: ['./test-marco.component.css']
})
export class TestMarcoComponent implements OnInit {
  settings = {
    actions: {
      columnTitle: '',
      add: true,

      delete: true,
      
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="fas fa-plus"></i> Inserisci',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-undo"></i>',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash" ></i>',
      confirmDelete: true,
    },
    edit: {
      editButtonContent: '<i class="fas fa-pencil-alt"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-undo"></i>',
    },
    columns: {
      CEVENTO: {
        title: 'Evento',
        editable: true,
      },
      SDESCR: {
        title: 'Descrizione',
        editable: false,
      },
      CCHIUSU: {
        title: 'Codice',
      },

      DINIVAL: {
        title: 'Chiusura',

        valuePrepareFunction: (created: any) => {
          if (created) {
            return this.datePipe.transform(new Date(created), 'dd/MM/yyyy');
          } else {
            return null;
          }
        },
      },
    },
    attr: {
      class: 'table table-bordered',
    },
  };

  isLoadingData = false;

  source: ServerDataSource;

  mockData = [
    {
      CEVENTO: 'PAM6035N',
      SDESCR: 'APERTURA NUOVO DCF PER MODIF. PDA - PREST. SALVAGUARDIA',
      LDESCR: 'APERTURA NUOVO DCF PER MODIF. PDA - PREST. SALVAGUARDIA',
      DINIVAL: '2022-01-19T09:28:07.172Z',
      CCHIUSU: 'SIF1',
      FLAGIAS: 'N',
    },
  ];

  constructor(http: HttpClient, public datePipe: DatePipe) {
    this.source = new ServerDataSource(http, {
      endPoint: 'http://localhost:3020/listaEventi',
      //'https://jsonplaceholder.typicode.com/photos',
    });
  }

  ngOnInit(): void {
   /* this.source.onUpdateStarted().subscribe(() => {
      this.isLoadingData = true;
    });*/

    this.source.onChanged().subscribe({
      next: (res) => {
        console.log(res);
        this.isLoadingData = false;
      },
      error: (err) => {
        this.isLoadingData = false;
      },
    });
  }

  onCustom(event) {
    console.log(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    console.log(event);
    event.source.append(event.data);
  }

  create(event: { newData: Object; source: DataSource; confirm: Deferred }) {
    event.source.prepend(event.newData).then(() => {
      console.log('here');
    });
    event.confirm.resolve.skipAdd = true;
    event.confirm.resolve();
  }

}
