[Socket Mode](https://api.slack.com/socket-mode) allows your app to connect and receive data from Slack via a WebSocket connection. To handle the connection, Bolt for JavaScript includes a `SocketModeReceiver` (in `@slack/bolt@3.0.0` and higher). Before using Socket Mode, be sure to enable it within your app configuration.

To use the `SocketModeReceiver`, just pass in `socketMode:true` and `appToken:YOUR_APP_TOKEN` when initializing `App`. You can get your App Level Token in your app configuration under the **Basic Information** section.

```javascript
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.BOT_TOKEN,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();
```
