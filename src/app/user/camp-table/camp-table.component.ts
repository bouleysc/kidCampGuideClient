import { Component, OnInit, ViewChild } from '@angular/core';
import { CampsService } from 'app/camps.service';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-camp-table',
  templateUrl: './camp-table.component.html',
  styleUrls: ['./camp-table.component.css']
})
export class CampTableComponent implements OnInit {
    camps = [];
    campCount = 0;
    campResource = new DataTableResource(this.camps);
    @ViewChild(DataTable) campsTable: DataTable;
    constructor(private campsService: CampsService) {
      this.campResource.count().then(count => this.campCount = count)
    }

    ngOnInit() {
      this.campsService.query(this.camps)
      }

    reloadItems(params) {
      this.campResource.query(params).then(camps => this.camps = camps);
        this.campsService.query(params).then(result => {
            this.camps = result.camps;
            this.campCount = result.count;
        });
    }
    // special properties:
  rowClick(rowEvent) {
      console.log('Clicked: ' + rowEvent.row.item.organization_name);
      console.log('Clicked: ' + rowEvent.row.item.program_name);
      console.log('Clicked: ' + rowEvent.row.item.program_type);
      console.log('Clicked: ' + rowEvent.row.item.program_city);
      console.log('Clicked: ' + rowEvent.row.item.program_state);
      console.log('Clicked: ' + rowEvent.row.item.program_start_date);
      console.log('Clicked: ' + rowEvent.row.item.program_end_date);
      console.log('Clicked: ' + rowEvent.row.item.program_phone);
      console.log('Clicked: ' + rowEvent.row.item.program_website);
      console.log('Clicked: ' + rowEvent.row.item.participant_gender);
      console.log('Clicked: ' + rowEvent.row.item.participant_age_min);
      console.log('Clicked: ' + rowEvent.row.item.participant_age_max);
      console.log('Clicked: ' + rowEvent.row.item.cost);
  }

  rowTooltip(item) { return item.program_name; }
  // special params:
  translations = <DataTableTranslations>{
      indexColumn: 'Index column',
      expandColumn: 'Expand column',
      selectColumn: 'Select column',
      paginationLimit: 'Max results',
      paginationRange: 'Result range'
  };
}
