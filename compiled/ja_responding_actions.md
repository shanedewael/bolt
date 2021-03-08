アクションへの応答には、主に 2 つのやり方があります。1 つ目の (最も一般的な) やり方は `say` 関数の利用です。 `say` 関数は、Slack 内のイベントが発生した会話（チャンネルや DM）へメッセージを返します。

アクションに応答する 2 つ目の方法は `respond()` です。これはアクションに紐付けられている `response_url` を用いたメッセージの送信をシンプルに行うためのユーティリティです。

```javascript
// action_id が "approve_button" のインタラクティブコンポーネントがトリガーされる毎にミドルウェアが呼び出される
app.action('approve_button', async ({ ack, say }) => {
  // アクションリクエストの確認
  await ack();
  await say('Request approved 👍');
});
```
