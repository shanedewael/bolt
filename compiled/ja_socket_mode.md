
[ソケットモード](https://api.slack.com/socket-mode) は、アプリに WebSocket での接続と、そのコネクション経由でのデータ受信を可能とします。コネクションをハンドリングするために `@slack/bolt@3.0.0` 以上では `SokcetModeReceiver` というレシーバーが提供されています。ソケットモードを使う前に、アプリの管理画面でソケットモードの機能が有効になっているコオを確認しておいてください。

`SocketModeReceiver` を使う方法は `App` インスタンスの初期化時にコンストラクターに `socketMode: true` と `appToken: YOUR_APP_TOKEN` を渡すだけです。App Level Token は、アプリ管理画面の **Basic Information** セクションから取得できます。

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
