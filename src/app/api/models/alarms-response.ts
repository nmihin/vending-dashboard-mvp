/* tslint:disable */
import { Alarm } from './alarm';
import { Pagination } from './pagination';
export interface AlarmsResponse {
  alarms?: Array<Alarm>;
  pagination?: Pagination;
}
