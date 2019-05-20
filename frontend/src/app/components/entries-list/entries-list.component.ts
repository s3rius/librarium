import {Component, OnInit} from '@angular/core';
import {LibServiceService} from '../../services/lib-service.service';
import {Resource} from '../../models/resource';
import {Globals} from '../../globals';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit {
  resources: [Resource];

  constructor(private lib: LibServiceService, private globals: Globals) {

  }

  ngOnInit() {
    this.lib.getAllResources(0, 32).subscribe(
      data => {
        // console.log(data);
        for (let entry in data.values()) {
          console.log(entry);
        }
        this.resources = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
