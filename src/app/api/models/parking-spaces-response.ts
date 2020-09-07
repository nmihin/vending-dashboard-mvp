/* tslint:disable */
import { Pagination } from './pagination';
import { ParkingSpace } from './parking-space';
export interface ParkingSpacesResponse {
  pagination?: Pagination;
  parkingSpaces?: Array<ParkingSpace>;
}
