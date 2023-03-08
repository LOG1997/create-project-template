export interface ITableConstant {
  title: string;
  dataIndex: string;
  key: string;
  isLink?: boolean;
  isTag?: boolean;
  isAction?: boolean;
  fixed?: string | undefined;
  width?: number;
  actions?: ITableAction[];
  ellipsis?: boolean;
}
export interface ITableAction {
  title: string;
  type: string;
  isLink?: boolean;
  func: IFunction;
}
export type IFunction = (id: string) => void;
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  character?: string[];
}
