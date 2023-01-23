export interface IAction {
  text: string;
  class: string;
  icon: string;
  method: string;
  isVisible: boolean;
  checkRole: Array<string>;
  validations?: {};
  options?: Option;
  rowValidations?: {};
  isIcon?: boolean;
  isDisabled?: boolean;
  disabledReason?: string;
  order?: number;
}
export interface Option {
  title: string;
  api: string;
  method: string;
  status: string;
  key: string;
}
