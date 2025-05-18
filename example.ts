import { eventBus } from "./eventBus";



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