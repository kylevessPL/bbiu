import {Page} from '../models/page';

export default class Utils {
    static wrapToObject = <T extends Page<T>>(result: T[]) => {
        return {
            content: result
        } as T;
    };
}
