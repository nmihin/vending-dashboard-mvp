/* tslint:disable */
import { Barrier } from './barrier';
import { ParkingAreaData } from './parking-area-data';
import { RioModule } from './rio-module';
import { SensorCloudInfo } from './sensor-cloud-info';
export interface ParkingSummaryResponse {
  barriers?: Array<Barrier>;
  defectiveSpacesCount?: number;
  freeSpacesCount?: number;
  occupiedSpacesCount?: number;
  parkingAreas?: Array<ParkingAreaData>;
  rioModule?: RioModule;
  sensorCloudInfo?: SensorCloudInfo;
  totalSpacesCount?: number;
}
