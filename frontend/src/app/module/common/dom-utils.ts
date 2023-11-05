export default class DomUtils {
    static getBoundingRelativeRect = (host: HTMLElement, target: HTMLElement) => {
        const hostRect = host.getBoundingClientRect();
        const elementRect = target.getBoundingClientRect();
        const relativeX = elementRect.left - hostRect.left;
        const relativeY = elementRect.top - hostRect.top;
        return new DOMRect(relativeX, relativeY, elementRect.width, elementRect.height);
    }
}
