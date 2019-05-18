import {Component, OnInit} from '@angular/core';
import {LibServiceService} from '../../services/lib-service.service';
import {Resource} from '../../models/resource';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit {
  resources: [Resource];

  constructor(private lib: LibServiceService) {
  }

  ngOnInit() {
    this.lib.getAllResources().subscribe(
      data => {
        console.log(data);
        this.resources = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
