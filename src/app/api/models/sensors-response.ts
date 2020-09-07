/* tslint:disable */
import { Pagination } from './pagination';
import { ParkingSensor } from './parking-sensor';
export interface SensorsResponse {
  pagination?: Pagination;
  sensors?: Array<ParkingSensor>;
}
