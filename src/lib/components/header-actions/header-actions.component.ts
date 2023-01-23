import { Direction } from '@angular/cdk/bidi';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAction } from '../../models/IAction.model';
import { HeaderAction, Title } from '../../models/table-header.model';

@Component({
  selector: 'header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
})
export class HeaderActionsComponent implements OnInit {
  @Input() actions!: HeaderAction;
  @Output() onClickAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() title!: string;
  constructor() {}

  @Input() dir: Direction = 'ltr';

  public clickOnAction(event: any) {
    this.onClickAction.emit(event);
  }

  getActionsArray(actionName: string) {
    return this.actions[actionName] as IAction[];
  }

  getSingleAction(actionName: string) {
    return this.actions[actionName] as IAction;
  }
  ngOnInit(): void {
  }

}
