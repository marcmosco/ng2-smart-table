import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { ServerDataSource } from "ng2-smart-table";

@Component({
  selector: "app-test-marco",
  templateUrl: "./test-marco.component.html",
  styleUrls: ["./test-marco.component.css"],
})
export class TestMarcoComponent implements OnInit {
  settings = {
    actions: {
      columnTitle: "",
      add: true,

      delete: true,
      paste: true,

      position: "right",
    },
    add: {
      addButtonContent: " Inserisci",
      createButtonContent: "OK",
      cancelButtonContent: "KO",
      confirmCreate: false,
    },
    paste: {
      pasteButtonContent: " Paste",
      createButtonContent: "OK_PASTE",
      cancelButtonContent: "KO_PASTE",
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: "Delete",
      confirmDelete: true,
    },
    edit: {
      editButtonContent: "Edit",
      saveButtonContent: "OK_EDIT",
      cancelButtonContent: "KO_EDIT",
    },
    columns: {
      CEVENTO: {
        title: "Evento",
        editable: true,
        editor: {
          type: "completer",
          config: {
            completer: {
              titleField: "codice",
              descriptionField: "descrizioneCompleta",
              remote: true,
              url: "http://localhost:8090/dizionario/listaVociCoge?size=32&filter=",
            },
          },
        },
        filter: {
          config: {
            delay: 500,
          },
        },
        width: "90px",
      },
      SDESCR: {
        title: "Descrizione",
        editable: false,
      },
      CCHIUSU: {
        title: "Codice",
        editor: {
          type: "completer",
          config: {
            completer: {
              titleField: "codice",
              descriptionField: "descrizioneCompleta",
              remote: true,
              url: "http://localhost:8090/dizionario/listaVociCoge?size=32&filter=",
            },
          },
        },
      },

      DINIVAL: {
        title: "Chiusura",

        valuePrepareFunction: (created: any) => {
          if (created) {
            return this.datePipe.transform(new Date(created), "dd/MM/yyyy");
          } else {
            return null;
          }
        },
      },
    },
    attr: {
      class: "table table-bordered",
    },
  };

  isLoadingData = false;

  source: ServerDataSource;

  mockData = [
    {
      CEVENTO: "PAM6035N",
      SDESCR: "APERTURA NUOVO DCF PER MODIF. PDA - PREST. SALVAGUARDIA",
      LDESCR: "APERTURA NUOVO DCF PER MODIF. PDA - PREST. SALVAGUARDIA",
      DINIVAL: "2022-01-19T09:28:07.172Z",
      CCHIUSU: "SIF1",
      FLAGIAS: "N",
    },
  ];

  constructor(http: HttpClient, public datePipe: DatePipe) {
    this.source = new ServerDataSource(http, {
      endPoint: "http://localhost:3020/listaEventi",
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
    console.log(
      `Custom event '${event.action}' fired on row №: ${event.data.id}`
    );

    event.source.append(event.data);
  }

  onCreateConfirm(event) {
    if (window.confirm("Are you sure you want to create?")) {
      //console.log(event.newData);

      //call this line inside a post result
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
