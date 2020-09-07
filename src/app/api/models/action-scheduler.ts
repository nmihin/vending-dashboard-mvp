/* tslint:disable */
import { DailyActions } from './daily-actions';
import { DateActions } from './date-actions';
export interface ActionScheduler {
  dailyActions?: Array<DailyActions>;
  exceptions?: Array<DateActions>;
}
