/* tslint:disable */
import { ParkingDeviceInstance } from './parking-device-instance';
export interface Alarm {
  details?: string;
  deviceInstance?: ParkingDeviceInstance;
  eventTime?: string;
  eventType?: string;
  id?: number;
  level?: number;
  message?: string;
  title?: string;
  type?: string;
  value?: number;
}
