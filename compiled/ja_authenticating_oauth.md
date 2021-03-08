複数のワークスペースにインストールされる Slack アプリは OAuth フローを実装し、アクセストークンなどのインストール時に取得した情報をセキュアな方法で保存しておく必要があります。Bolt for JavaScript では、`clientId`、`clientSecret`、`stateSecret`、`scopes` を `App` 初期化時に指定すると OAuth フローのためのルートのセットアップや state パラメーターを検証する機能が有効になります。組み込みの OAuth サポートモジュールは `ExpressReceiver` を使用している場合のみ利用可能です。もしカスタムのレシーバーを実装して利用している場合は、私たちが提供している [OAuth ライブラリ](https://slack.dev/node-slack-sdk/oauth#slack-oauth)を利用していください。 Bolt for JavaScript の組み込みのモジュールもこれを内部的に利用しています。


Bolt for JavaScript は、アプリのインストールフローを完了した後の遷移先の URL である **Redirect URL** のためのパスとして `slack/oauth_redirect` を有効にします。この URL を Slack アプリの設定画面の **OAuth and Permissions** セクション内で **Redirect URL** として指定してください。この設定のカスタマイズは以下で説明する `installerOptions` を指定することで可能です。

Bolt for JavaScript は `slack/install` というパスも生成します。これは、Slack アプリのダイレクトインストールのために `Add to Slack` ボタンを置く場合に指定できる URL です。アプリはすでにインストールされていて、さらにユーザーから追加の認可情報（例：ユーザートークンの発行）な場合や、何らかの理由で動的にインストール用の URL を生成したい場合は、`ExpressReceiver` を自前でインスタンス化し、それを `receiver` という変数に代入した上で `receiver.installer.generateInstallUrl()` を呼び出してください。詳細は [OAuth ライブラリのドキュメント](https://slack.dev/node-slack-sdk/oauth#generating-an-installation-url)の `generateInstallUrl()` を参照してください。

Slack の OAuth インストールフローについてもっと知りたい場合は [API ドキュメント](https://api.slack.com/authentication/oauth-v2)を参照してください。

[Enterprise Grid の OrG 全体へのインストール](https://api.slack.com/enterprise/apps)への対応を追加する場合、Bolt for JavaScript のバージョン 3.0.0 以上を利用してください。また Slack アプリの設定画面で **Org Level Apps** の設定が有効になっていることを確認してください。

```javascript
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
  installationStore: {
    storeInstallation: async (installation) => {
      // 実際のデータベースに保存するために、ここのコードを変更
      if (installation.isEnterpriseInstall) {
        // OrG 全体へのインストールに対応する場合
        return await database.set(installation.enterprise.id, installation);
      } else {
        // 単独のワークスペースへのインストールの場合
        return await database.set(installation.team.id, installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // 実際のデータベースから取得するために、ここのコードを変更
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // OrG 全体へのインストール情報の参照
        return await database.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // 単独のワークスペースへのインストール情報の参照
        return await database.get(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
  },
});
```
