/* tslint:disable */
import { ScheduledAction } from './scheduled-action';
export interface DailyActions {
  actions?: Array<ScheduledAction>;
  dayOfWeek?: number;
}
