import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from "@angular/core";

import { Grid } from "../../../lib/grid";
import { Row } from "../../../lib/data-set/row";
import { Cell } from "../../../lib/data-set/cell";

@Component({
  selector: "[ng2-st-thead-form-row]",
  template: `
    <td *ngIf=""></td>
    <td *ngIf="showActionColumnLeft" class="ng2-smart-actions">
      <ng2-st-actions
        [isPasting]="isPasting"
        [grid]="grid"
        (create)="onCreate($event)"
        (paste)="onPaste($event)"
      ></ng2-st-actions>
    </td>

    <td *ngFor="let cell of getVisibleCells(this.cells)">
      <ng2-smart-table-cell
        [cell]="cell"
        [grid]="grid"
        [isNew]="!isPasting"
        [createConfirm]="createConfirm"
        [inputClass]="addInputClass"
        [isInEditing]="isPasting ? true : grid.getNewRow().isInEditing"
        (edited)="onCreate($event)"
      >
      </ng2-smart-table-cell>
    </td>
    <!--

      <ng-template #noPaste>
      <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
          pipo
        <ng2-smart-table-cell [cell]="cell"
                              [grid]="grid"
                              [isNew]="true"
                              [createConfirm]="createConfirm"
                              [inputClass]="addInputClass"
                              [isInEditing]="grid.getNewRow().isInEditing"
                              (edited)="onCreate($event)">
        </ng2-smart-table-cell>
      </td>
      </ng-template>
-->

    <td *ngIf="showActionColumnRight" class="ng2-smart-actions">
      <ng2-st-actions
        [isPasting]="isPasting"
        [grid]="grid"
        (create)="onCreate($event)"
        (paste)="onPaste($event)"
      ></ng2-st-actions>
    </td>
  `,
})
export class TheadFormRowComponent implements OnChanges, OnInit {
  cells: Cell[];
  isPasting: boolean;

  @Input() grid: Grid;
  @Input() row: Row;
  @Input() createConfirm: EventEmitter<any>;

  @Output() create = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  addInputClass: string;

  onCreate(event: any) {
    event.stopPropagation();
    this.grid.create(this.grid.getNewRow(), this.createConfirm);
  }

  onPaste(event: any) {
    event.stopPropagation();
    this.grid.create(this.grid.dataSet.rowToPaste, this.createConfirm);
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn("left");
    this.showActionColumnRight = this.grid.showActionColumn("right");
    this.addInputClass = this.grid.getSetting("add.inputClass");
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }

  ngOnInit(): void {
    if (this.grid.dataSet.rowToPaste) {
      this.cells = this.grid.dataSet.rowToPaste.getCells();
      this.isPasting = true;
    } else {
      this.cells = this.grid.getNewRow().getCells();
    }
  }
}
