import moment from 'moment';
import {environment} from '../../../environments/environment';

export default class DateUtils {
    private static timestampPattern = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}).\d{6}Z/g;

    static formatTimestampsInText = (inputText: string) => {
        return inputText.replace(this.timestampPattern, (_, timestamp) => {
            const date = moment.utc(timestamp);
            return date.format(environment.dateFormatMoment);
        });
    }
}
