# Jenkins Setup

## Agent requirements

- Make sure at least one online Jenkins node with an executor has Node.js 20 or later and npm available on its `PATH`.
- On Linux nodes, install the system libraries required by Playwright Chromium. See the [Playwright CI documentation](https://playwright.dev/docs/ci) or provision the node from the matching Playwright Docker image.
- Ensure the agent can access the Sauce Demo test site and the source repository.

## Create the job

1. Install the Jenkins Pipeline plugin and create a Pipeline job.
2. Configure the job's SCM repository and credentials, if needed.
3. Set the script path to `Jenkinsfile` at the repository root and save the job.
4. Run the job. The pipeline uses any available executor, selects the appropriate Windows or Unix shell, installs locked npm dependencies and Chromium, and runs `npm test` with `CI=true`, which enables headless mode and single-worker CI settings.

The job archives `playwright-report`, `allure-results`, `test-results.json`, and `test-results` after each run, including failed runs. Jenkins' artifact browser makes these available from the build page.