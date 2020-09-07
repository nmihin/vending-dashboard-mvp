/* tslint:disable */
import { ScheduledAction } from './scheduled-action';
export interface DateActions {
  actions?: Array<ScheduledAction>;
  date?: string;
  overrideDailyActions?: boolean;
}
