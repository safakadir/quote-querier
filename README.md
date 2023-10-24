# Quote Querier

This is a simple app to inquery quotes from a provider.
It's scheduled daily with a cron and it will send emails if finds any open position.

## Deploy in under 10 seconds

[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)
- Sets up instant continuous deployment on `git push`
- Realtime backend logs and API request monitoring

## Refresh token

- https://developers.google.com/oauthplayground
- At top left gear icon, set CLIENT_ID and CLIENT_SECRET (tick "Use your own credentials")
- Select Gmail API v1 https://mail.google.com/
- Authorize
- Exchange authorization code for tokens
- Use refresh token
