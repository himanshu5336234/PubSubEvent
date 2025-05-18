# TypeScript EventBus  
A lightweight, type-safe event system for React/Node apps. 

Type-Safety
Try changing { text: string } to { content: string } - TypeScript will catch it!

Decoupled Architecture

Memory Management
unsubscribe in destroy() prevents memory leaks.

One-Time Events
subscribeOnce automatically cleans itself up.
## Features  
- Zero dependencies  
- Type-safe events  
- No Redux/Context overkill  

## Usage  

```ts
// 1. Initialize
import { eventBus } from './eventBus';

// 2. Subscribe
eventBus.subscribe('user:login', (user) => {
  console.log(`User logged in: ${user.userId}`);
});

// 3. Publish
eventBus.publish('user:login', { userId: 'test123' });