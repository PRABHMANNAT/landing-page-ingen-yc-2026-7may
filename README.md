# Run and deploy iNGEN

Use Node.js 22 or 24.

    npm ci
    npm run dev

For a production check:

    npm run typecheck
    npm run build
    npm start

## Vercel

Import this GitHub repository as a Next.js project. The root directory is the repository root. Vercel uses npm ci and npm run build from vercel.json.

Set RESEND_API_KEY in Vercel's environment settings to enable waitlist email delivery. Set WAITLIST_TO_EMAIL to the recipient, and RESEND_FROM_EMAIL to an address verified in Resend. Without the API key, the endpoint returns an explicit unavailable response and does not claim a signup was saved.

For Google signup, set NEXT_PUBLIC_GOOGLE_CLIENT_ID and configure the deployed origin in Google Cloud. Configure preview origins separately when testing OAuth on preview deployments.

Test an email signup and a Google signup on the deployed URL after configuration. The public site has no checkout. Prices describe the published plans and the calls to action lead to the waitlist or sales team.

The cookie preference control stores a local choice. No optional analytics are installed.

## Release checks

Check the recruiter and student views on desktop and mobile. Confirm the product tabs, billing switch, FAQ disclosure controls, policy links, and cookie settings. Review resource and policy copy for your current business practices before publishing updates.
