// Define a mapping between event names and the expected data payload for each event.
export interface EventMap {
  'user:login': { userId: string };
  'chat:message': { text: string; sender: string };
  'app:error': { code: number; message: string };
}

// Generic callback type that takes data of type T.
type Callback<T = any> = (data: T) => void;

// Event bus class to handle publish/subscribe functionality for strongly-typed events.
export class PusSubEvent {
  // Internal storage for events and their associated subscriber callbacks.
  private events: { [K in keyof EventMap]?: Callback<EventMap[K]>[] } = {};

  // Register a callback for a specific event.
  subscribe<K extends keyof EventMap>(event: K, callback: Callback<EventMap[K]>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(callback);
  }

  // Remove a previously registered callback for a specific event.
  unsubscribe<K extends keyof EventMap>(event: K, callback: Callback<EventMap[K]>): void {
    if (!this.events[event]) return;

    // Filter out the callback from the list
    this.events[event] = this.events[event]!.filter(cb => cb !== callback) as Callback<EventMap[K]>[];

    // Clean up if no more callbacks are registered for the event
    if (this.events[event]!.length === 0) {
      delete this.events[event];
    }
  }

  // Register a callback for a specific event that will be invoked only once.
  subscribeOnce<K extends keyof EventMap>(event: K, callback: Callback<EventMap[K]>): void {
    // Wrapper ensures the callback is unsubscribed after the first call
    const wrapper = (data: EventMap[K]) => {
      callback(data);
      this.unsubscribe(event, wrapper);
    };
    this.subscribe(event, wrapper);
  }

  // Trigger all callbacks associated with a specific event.
  publish<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    // Make a shallow copy to avoid issues if callbacks unsubscribe during execution
    const callbacks = this.events[event]?.slice(); 
    if (!callbacks) return;

    // Invoke each callback with the provided data
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`EventBus error in ${String(event)}:`, err);
      }
    });
  }

  // Clear all event subscriptions.
  clearAll(): void {
    this.events = {};
  }
}

// Export a singleton instance of the event bus
export const eventBus = new PusSubEvent();
