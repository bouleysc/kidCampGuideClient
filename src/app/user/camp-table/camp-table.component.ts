import { Component, OnInit } from '@angular/core';
import { CampsService } from 'app/camps.service';
import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-camp-table',
  templateUrl: './camp-table.component.html',
  styleUrls: ['./camp-table.component.css']
})
export class CampTableComponent implements OnInit {
    camps = [];
    campCount = 0;
    campResource = new DataTableResource(this.camps);
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

  rowDoubleClick(rowEvent) {
      alert('Double clicked: ' + rowEvent.row.item.organization_name);
      alert('Double clicked: ' + rowEvent.row.item.program_name);
      alert('Double clicked: ' + rowEvent.row.item.program_type);
      alert('Double clicked: ' + rowEvent.row.item.program_city);
      alert('Double clicked: ' + rowEvent.row.item.program_state);
      alert('Double clicked: ' + rowEvent.row.item.program_start_date);
      alert('Double clicked: ' + rowEvent.row.item.program_end_date);
      alert('Double clicked: ' + rowEvent.row.item.program_phone);
      alert('Double clicked: ' + rowEvent.row.item.program_website);
      alert('Double clicked: ' + rowEvent.row.item.participant_gender);
      alert('Double clicked: ' + rowEvent.row.item.participant_age_min);
      alert('Double clicked: ' + rowEvent.row.item.participant_age_max);
      alert('Double clicked: ' + rowEvent.row.item.cost);
  }
  rowTooltip(item) { return item.program_name; }
}
