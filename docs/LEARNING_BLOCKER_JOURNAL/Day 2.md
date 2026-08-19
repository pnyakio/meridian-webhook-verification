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