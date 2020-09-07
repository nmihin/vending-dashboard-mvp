/* tslint:disable */
import { ParkingDeviceInstance } from './parking-device-instance';
export interface GroupedEvent {
  count?: number;
  deviceInstance?: ParkingDeviceInstance;
  eventType?: string;
  from?: string;
  to?: string;
  value?: number;
}
