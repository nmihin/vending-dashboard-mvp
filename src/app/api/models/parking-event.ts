/* tslint:disable */
import { ParkingDeviceInstance } from './parking-device-instance';
export interface ParkingEvent {
  details?: string;
  deviceInstance?: ParkingDeviceInstance;
  eventTime?: string;
  eventType?: string;
  id?: number;
  title?: string;
  value?: number;
}
