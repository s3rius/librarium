import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../models/resource';
import {Globals} from '../../globals';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input()
  resource: Resource;
  link: string;

  constructor(private globals: Globals) {
  }

  ngOnInit() {
    this.link = `${this.globals.baseAddress}/content/${this.resource.id}/preview`;
  }

}
