import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";

import { Grid } from "../../../lib/grid";

@Component({
  selector: "ng2-st-actions",
  template: `
    <a
      href="#"
      class="ng2-smart-action ng2-smart-action-add-create"
      [innerHTML]="isPasting ? createPasteButtonContent : createButtonContent"
      (click)="onOk($event)"
    ></a>
    <a
      href="#"
      class="ng2-smart-action ng2-smart-action-add-cancel"
      [innerHTML]="isPasting ? cancelPasteButtonContent : cancelButtonContent"
      (click)="cancel($event)"
    ></a>
  `,
})
export class ActionsComponent implements OnChanges {
  @Input() grid: Grid;
  @Output() create = new EventEmitter<any>();
  @Output() paste = new EventEmitter<any>();
  @Input() isPasting: boolean;
  createButtonContent: string;
  cancelButtonContent: string;

  cancelPasteButtonContent: string;
  createPasteButtonContent: string;

  ngOnChanges() {
    this.createButtonContent = this.grid.getSetting("add.createButtonContent");
    this.cancelButtonContent = this.grid.getSetting("add.cancelButtonContent");

    this.createPasteButtonContent = this.grid.getSetting(
      "paste.createButtonContent"
    );
    this.cancelPasteButtonContent = this.grid.getSetting(
      "paste.cancelButtonContent"
    );
  }

  cancel(event) {
    event.preventDefault();
    this.grid.createFormShown = false;
    if (this.isPasting) {
      this.grid.dataSet.rowToPaste = null;
    }
  }
  onOk(event) {
    event.preventDefault();

    this.isPasting ? this.paste.emit(event) : this.create.emit(event);
  }
}
