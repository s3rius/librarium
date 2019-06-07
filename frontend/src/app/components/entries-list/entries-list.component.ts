import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {LibServiceService} from '../../services/lib-service.service';
import {Resource} from '../../models/resource';
import {Globals} from '../../globals';
import {MatGridList} from '@angular/material';

// import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit, AfterContentInit {
  @ViewChild('grid')
  grid: MatGridList;

  resources: [Resource];

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };

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

  ngAfterContentInit() {
    // this.observableMedia.asObservable().subscribe(
    //   change => {
    //     console.log(change)
    //   }
    // );
    // this.observableMedia.asObservable().subscribe((change: MediaChange) => {
    //   this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    // });
  }

}
