export default class ArrayUtils {
    static countBy = <T>(array: T[], predicate: (value: T) => boolean) =>
        array.reduce((count, curr) => predicate(curr) ? count + 1 : count, 0)
}
