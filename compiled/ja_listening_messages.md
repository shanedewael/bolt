[アプリが受信可能な](https://api.slack.com/messaging/retrieving#permissions)メッセージをリッスンするには、`message` 型でないイベントを除外する `message()` メソッドを使用します。

`message()` は、`string` 型か `RegExp` 型の、指定パターンに一致しないメッセージを除外する `pattern` パラメーター（指定は必須ではありません）を受け付けます。

```javascript
// 特定の文字列、この場合 👋絵文字を含むメッセージと一致
app.message(':wave:', async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});
```
