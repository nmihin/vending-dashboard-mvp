/* tslint:disable */
import { ParkingArea } from './parking-area';
import { ParkingSensor } from './parking-sensor';
export interface ParkingSpace {
  dateUpdated?: string;
  externalCustomId?: string;
  externalSectorId?: string;
  id?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  occupancy?: string;
  parkingAreas?: Array<ParkingArea>;
  sensors?: Array<ParkingSensor>;
}
