/* tslint:disable */
export interface ParkingSensor {
  active?: boolean;
  batteryPercentage?: number;
  calibrated?: boolean;
  configured?: boolean;
  dateUpdated?: string;
  deviceInstanceId?: number;
  id?: string;
  lastMessageDate?: number;
  lastStateChangeDate?: number;
  latitude?: number;
  longitude?: number;
  name?: string;
  occupied?: boolean;
  rssi?: number;
  spotId?: string;
  statusMessage?: string;
  temperature?: number;
}
