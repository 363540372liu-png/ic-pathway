# Publishing the source and website

## Repository contents

Publish the complete project root, including `LICENSE`, documentation, tests, `lab/`, `dist/`, and `.github/workflows/`. The export intentionally excludes private hosting metadata, credentials, proprietary libraries, and previous private Git history.

Use a new public repository named `ic-pathway`, or another name you choose. Do not overwrite an unrelated existing repository. When uploading through a connector with selected-repository access, ensure that the new repository is included in that access.

For a normal local Git workflow, create the empty public repository first and use its actual returned URL:

```bash
git init -b main
git add .
git commit -m "Add IC Pathway English classroom"
git remote add origin YOUR_ACTUAL_REPOSITORY_URL
git push -u origin main
```

The uppercase URL is a placeholder, not a working destination. Authenticate using GitHub's supported local workflow; do not put tokens into source files or paste them into chat.

## CI

The `Checks` workflow runs on pushes, pull requests, and manual dispatch. It validates the static site and archive, installs Icarus on the GitHub-hosted Ubuntu runner, and runs the real HDL checks. Its existence does not establish that it has already passed. Check the actual Actions run before reporting success.

## Optional GitHub Pages

The project is ready for a repository subpath because assets and downloads are relative and lesson navigation uses hashes.

1. In the repository, open **Settings → Pages**.
2. Select **GitHub Actions** as the publishing source.
3. Open **Actions → Publish website → Run workflow**, using the branch you intend to publish.
4. Wait for the deployment to succeed and use the URL returned by that run.

The Pages workflow is manual; ordinary source pushes do not automatically publish the website. It packages only `dist/` and uses the `github-pages` environment. The original private deployment URL is not a public demo for this repository.

For the current workflow contract, see [GitHub's Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Other hosts

Upload the contents of `dist/` to a static host. No backend, environment secrets, application database, or server-side compiler is needed. Host from an HTTP(S) origin, preserve the folder structure, and use the URL confirmed by that host.
