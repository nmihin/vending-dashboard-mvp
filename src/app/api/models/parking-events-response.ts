/* tslint:disable */
import { ParkingEvent } from './parking-event';
import { Pagination } from './pagination';

/**
 * Parking events
 */
export interface ParkingEventsResponse {

  /**
   * list of events
   */
  events?: Array<ParkingEvent>;

  /**
   * pagination of event objects
   */
  pagination?: Pagination;
}
