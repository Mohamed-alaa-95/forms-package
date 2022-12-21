import { IAction } from './IAction.model';

export interface HeaderAction {
  [key: string]: Array<IAction> | IAction;
}

export interface Title {
  text: string;
  icon: string;
}
