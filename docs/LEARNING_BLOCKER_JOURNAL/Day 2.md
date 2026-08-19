### What I Tried
I created a folder called meridian-webhook-verification under my plp project main folder
created a docs folder for my journal each day of the week two

### Resources Consulted
https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks

### Blockers / Errors

### Blocker 1 - npm blocked by PowerShell

When I tried to initialize the Node.js project with `npm init -y`, PowerShell returned a security error stating that `npm.ps1` could not be loaded because running scripts is disabled on the system.

At first I thought  npm would run normally because Node.js was already installed. I investigated the error and identified that the problem was related to PowerShell's execution policy and not thhe project

### Resolution

I used the Windows command version of npm with `npm.cmd` instead of the PowerShell `npm` command to initialize the project and install the Express dependency without changing the system's execution-policy settings.

### What I learned

I learned that on Windows, npm can be invoked through `npm.cmd` when PowerShell blocks the `npm.ps1` script. I also learned to distinguish between a problem with the development environment and a problem with the project code.

### 2. HMAC Webhook Verification

I learned that webhook requests should not simply be trusted because they come from an expected endpoint.

The sender can include a cryptographic signature with the request. The receiving server can independently calculate the expected signature using a shared secret and compare the two values.

My prototype uses:

- HMAC
- SHA-256
- A shared webhook secret
- The raw request body
- A request signature

The basic flow I implemented is:

```text
Incoming webhook
       ↓
Read signature
       ↓
Create expected HMAC signature
       ↓
Compare signatures
       ↓
Valid? ────── Yes ──────> Accept webhook
   │
   No
   ↓
Reject webhook

#### 3. Raw Request Body
I learned that webhook verification uses the original request data to create and check the signature. I also learned how Express can keep the raw request body available before processing the JSON.

#### 4. Environment Variables and Secrets
I learned that sensitive information such as a webhook secret should be stored in a `.env` file instead of being written directly into the code.

#### 5. `.gitignore`
I learned that `.gitignore` prevents files such as `.env` and `node_modules` from being uploaded to GitHub. I added both to my `.gitignore` and confirmed they were not included when I prepared my project for Git.

#### 6. Express and the Frontend
I learned how Express can serve HTML, CSS and JavaScript files from a `public` folder. This allowed me to access my prototype through `http://localhost:3000`.

#### 7. Connecting the Frontend and Backend
I learned how a frontend can communicate with a backend using JavaScript. I connected my "Send Test Webhook" button to the Express server so that it could send a test event through the webhook verification process.

#### 8. Keeping Secrets Secure
I learned that the webhook secret should never be placed in frontend JavaScript because frontend files can be viewed by users. The secret stays on the server where the verification takes place.

#### 9. Testing
I learned the importance of testing different situations instead of only testing when everything works. I tested valid signatures, invalid signatures and requests with missing signatures.

#### 10. Git and GitHub
I learned how to initialize Git, stage files, create commits and connect a local project to a GitHub repository. I also learned how meaningful commit messages can describe what was changed.

#### 11. Troubleshooting
I learned how to investigate errors instead of assuming the code is broken. During the prototype I worked through PowerShell, server, webhook signature and Git errors and identified the cause before applying a solution.

#### 12. Overall Learning
The biggest lesson from this phase was that I can learn an unfamiliar technology independently, troubleshoot problems and turn what I learn into a working prototype. I also gained a better understanding of how webhook verification can support a future inventory synchronization service.