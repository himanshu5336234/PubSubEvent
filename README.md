# TypeScript EventBus

A lightweight, type-safe event system for React and Node.js applications.

> ✨ Designed for clean, decoupled communication without the Redux or Context API overhead.

---

## 🚀 Features

- ✅ **Zero dependencies**
- ✅ **Fully type-safe events**
- ✅ **Auto memory cleanup**
- ✅ **Simple API**: `subscribe`, `publish`, `unsubscribe`, `subscribeOnce`
- ✅ **Decoupled architecture** – no tight coupling between components/services
- ✅ **No Redux/Context overkill**
- ✅ **Ideal for event-driven UIs & background services**

---

## 💡 Why Use This?

- Perfect for **component-to-component** or **service-to-component** communication
- Great for **micro-frontends**, **isolated UIs**, and **service-driven components**
- Handles **WebSocket-triggered UI updates** effortlessly
- No global store, no prop drilling, no boilerplate

---

```ts
// 1. Initialize
import { eventBus } from './eventBus';

eventBus.subscribe('chat:message', (data) => {
    console.log(`[${data.sender}]: ${data.text}`);
  });
  
  // Subscribe to errors (once)
  eventBus.subscribeOnce('app:error', (data) => {
    console.log(`CRITICAL ERROR ${data.code}: ${data.message}`);
  });
  
  // Test cases
  eventBus.publish('chat:message', { text: 'Hello world!', sender: 'user456' });
  // Console: "[user456]: Hello world!"
  
  eventBus.publish('app:error', { code: 500, message: 'DB Connection failed' });
  // Console: "CRITICAL ERROR 500: DB Connection failed"
  // Also calls showFatalError()
  
  eventBus.publish('app:error', { code: 404, message: 'Not found' }); 
  // (No output from showFatalError, as expected)

```
## 🔍 FAQ

### ❓ Why not use `window.addEventListener`?
✅ **Our Solution**  
- Type-safe events (no `any` types)  
- Framework-independent (works with React/Vue/Svelte)  
- Built-in memory management helpers  

❌ **When to use native events**  
- Cross-tab communication needs (`postMessage`)  
- Third-party library integration  

### ❓ Will this cause memory leaks?
Only if you forget to unsubscribe. Always clean up:

```tsx
// React example
useEffect(() => {
  const handler = (data) => console.log(data);
  eventBus.subscribe('event', handler);
  return () => eventBus.unsubscribe('event', handler); // Cleanup
}, []);
```
### **How is this different from Redux/RxJS/Context API?**

| Tool          | Best For                          | Overkill For                     |
|---------------|-----------------------------------|----------------------------------|
| **Redux**     | Global state management, time-travel debugging | Parent-child communication       |
| **RxJS**      | Complex async streams, reactive programming | Simple UI events                 |
| **Context API** | Avoiding prop drilling in React   | Frequent updates (causes re-renders) |
| **EventBus**  | Decoupled component communication | State management                |

		
,
### **EventBus vs Redux Listener Middleware**

| Feature          | EventBus       | Redux Listener (with RTK) |
|------------------|---------------|--------------------------|
| **Bundle Size**  | 1KB           | 15KB+                   |
| **Type Safety**  | ✅            | ✅                      |
| **State Management** | ❌        | ✅                      |
	
		

