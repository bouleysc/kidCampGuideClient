import { Component, OnInit, ViewChild } from '@angular/core';
import { CampsService } from 'app/camps.service';
import { UserService } from 'app/user.service';
import { Response } from '@angular/http';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-camp-table',
  templateUrl: './camp-table.component.html',
  styleUrls: ['./camp-table.component.css']
})
export class CampTableComponent implements OnInit {

    items = [];
    itemCount = 0;
    itemResource = new DataTableResource(this.items);
    selectedItems=[]
    token

    @ViewChild(DataTable) campsTable;

    constructor(private campsService: CampsService, private userService: UserService) {}

    ngOnInit() {
      this.token = localStorage.getItem('token');
      this.itemResource.count().then(count => this.itemCount = count)
    }

    reloadItems(params) {
      this.itemResource.query(params).then(items => this.items = items);
      this.campsService.query(params).then(result => {
          this.items = result.items;
          this.itemCount = result.count;
      });
    }
    // special properties:
  rowClick(rowEvent) {
    this.selectedItems.push(rowEvent.row.item)
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

  onBooked(){
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    for(let i = 0; i < this.selectedItems.length; i++) {
      this.onAddBookedCampByUser(id,this.selectedItems[i])
    }
  }

  onAddBookedCampByUser(id,camp){
    this.userService.addBookedCampByUser(id,camp)
    .subscribe(
      (response: Response) => {
        response.json()
      }
    )
  }

  onFavorited(){
    const parsedToken = this.userService.parsedJWT(this.token);
    const id = parsedToken;
    for(let i = 0; i < this.selectedItems.length; i++) {
      this.onAddFavoriteCampByUser(id,this.selectedItems[i])
    }
  }

  onAddFavoriteCampByUser(id,camp){
    this.userService.addFavoriteCampByUser(id,camp)
    .subscribe(
      (response: Response) => {
        response.json()
      }
    )
  }
}
