Your app can listen to user actions like button clicks, and menu selects, using the `action` method.

Actions can be filtered on an `action_id` of type string or RegExp object. `action_id`s act as unique identifiers for interactive components on the Slack platform. 

You’ll notice in all `action()` examples, `ack()` is used. It is required to call the `ack()` function within an action listener to acknowledge that the event was received from Slack. This is discussed in the [acknowledging events section](#acknowledge).

*Note: Since v2, message shortcuts (previously message actions) now use the `shortcut()` method instead of the `action()` method. View the [migration guide for V2](https://slack.dev/bolt/tutorial/migration-v2) to learn about the changes.*

```javascript
// Your middleware will be called every time an interactive component with the action_id "approve_button" is triggered
app.action('approve_button', async ({ ack, say }) => {
  await ack();
  // Update the message to reflect the action
});
```
