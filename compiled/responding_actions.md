There are two main ways to respond to actions. The first (and most common) way is to use the `say` function. The `say` function sends a message back to the conversation where the incoming event took place.

The second way to respond to actions is using `respond()`, which is a simple utility to use the `response_url` associated with an action.

```javascript
// Your middleware will be called every time an interactive component with the action_id “approve_button” is triggered
app.action('approve_button', async ({ ack, say }) => {
  // Acknowledge action request
  await ack();
  await say('Request approved 👍');
});
```
