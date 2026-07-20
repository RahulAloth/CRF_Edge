/**
 * Returns the target element of an event, accounting for shadow DOM.
 * @param event The event object.
 * @returns The target element of the event.
 */
export declare function getTarget(event: Event): EventTarget | null;