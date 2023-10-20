export default class Utils {
    static getEnumKey(myEnum: any, enumValue: number | string): string {
        const keys = Object.keys(myEnum).filter(key => myEnum[key] === enumValue);
        return keys.length > 0 ? keys[0] : undefined;
    }
}
