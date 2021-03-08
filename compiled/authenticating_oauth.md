Slack apps that are installed on multiple workspaces will need to implement OAuth and store installation information (i.e. access tokens) securely. Bolt supports OAuth and will handle most of the work for you by setting up OAuth routes and verifying state. All you need to do is provide your `clientId`, `clientSecret`, `stateSecret` and `scopes` when initializing `App`.

Bolt for JavaScript will create a **Redirect URL** `slack/oauth_redirect`, which Slack uses to redirect users after they complete your app's installation flow. You will need to add this **Redirect URL** in your app configuration settings under **OAuth and Permissions**. This path can be configured in the `installerOptions` argument described below.

Bolt for JavaScript will also create a `slack/install` route, where you can find an `Add to Slack` button for your app to perform direct installs of your app. If you need any additional authorizations (user tokens) from users inside a team when your app is already installed or a reason to dynamically generate an install URL, manually instantiate an `ExpressReceiver`, assign the instance to a variable named `receiver`, and then call `receiver.installer.generateInstallUrl()`. Read more about `generateInstallUrl()` in the [OAuth docs](https://slack.dev/node-slack-sdk/oauth#generating-an-installation-url).

Bolt for JavaScript does not support OAuth for [custom receivers](#receiver). If you're implementing a custom receiver, you can use our [Slack OAuth library](https://slack.dev/node-slack-sdk/oauth#slack-oauth), which is what Bolt for JavaScript uses under the hood.

To learn more about the OAuth installation flow with Slack, [read the API documentation](https://api.slack.com/authentication/oauth-v2).

To add support for [org wide installations](https://api.slack.com/enterprise/apps), you will need Bolt for JavaScript version `3.0.0` or newer. Make sure you have enabled org wide installations in your app configuration settings under **Org Level Apps**.

```javascript
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
  installationStore: {
    storeInstallation: async (installation) => {
      // change the line below so it saves to your database
      if (installation.isEnterpriseInstall) {
        // support for org wide app installation
        return await database.set(installation.enterprise.id, installation);
      } else {
        // single team app installation
        return await database.set(installation.team.id, installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // change the line below so it fetches from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation lookup
        return await database.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await database.get(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
  },
});
```
