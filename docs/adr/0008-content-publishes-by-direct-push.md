# Content publishes by direct push, and the `main` ruleset gives up three rules

Saving an entry in `/keystatic` commits straight to `main`, and that push deploys. There is no branch, no pull request, and no merge step between writing a post and publishing it. To allow this, ruleset `main` (id `12376541`) gives up exactly three of its eight rules:

| Removed | Kept |
|---|---|
| `pull_request` | `code_quality` |
| `code_scanning` | `copilot_code_review` |
| `required_status_checks` | `required_linear_history` |
| | `non_fast_forward` |
| | `deletion` |

This is recorded because deliberately weakening a branch protection is unreadable a year later without its reasoning, and because the split between the two columns is not a judgement call — it was measured.

## Why exactly three

GitHub keeps the evaluation of every push that a ruleset judged, at `GET /repos/{owner}/{repo}/rulesets/rule-suites`. The Keystatic save that was rejected while provisioning the CMS is still there, and it names the rules that failed:

| Rule | Result |
|---|---|
| `pull_request` | fail — *Changes must be made through a pull request.* |
| `code_scanning` | fail — *waiting for results from CodeQL* |
| `required_status_checks` | fail — *"Deploy to Cloudflare" is expected* |
| `code_quality` | **pass** |
| `required_linear_history` | **pass** |
| `non_fast_forward` | **pass** |
| `deletion` | **pass** |

`copilot_code_review` does not appear at all: it only evaluates on pull requests, so a direct push never puts it to the test.

The four rules that passed are not in the CMS's way and never were. Keystatic commits through GitHub's `createCommitOnBranch` mutation, which is a single commit fast-forwarded from the head it expected — linear by construction, never a force-push, never a deletion. Removing them would have given up protection in exchange for nothing.

## The fact that closed the cheapest option

The same record answers a question the GitHub documentation does not:

```
actor_id:   7355835
actor_name: "radenpioneer"
```

**The actor is the human, not the app.** Keystatic authenticates with a user-to-server token, so GitHub attributes the push to the person who logged in — which means adding the `radenpioneernet` GitHub App to the ruleset's bypass list would never be consulted on this path. The bypass option is not merely unattractive; it does not address the actor being evaluated.

Granting the *user* bypass would work, but that is this decision written in a different place, with the protection silently absent from the ruleset rather than visibly removed from it.

## Considered Options

- **Add the GitHub App as a bypass actor.** Closed by the fact above — the App is not the actor.
- **Publish through a pull request.** Rejected once it was clear how little of it Keystatic does. Its "Create pull request" control is an anchor to `${repoURL}/pull/new/${branch}` with `target="_blank"` — two call sites, no mutation — so Keystatic opens no pull request, merges none, and cannot update a branch that has fallen behind. Everything after that link is GitHub's UI, not the CMS's. The published documentation implies otherwise and its deployment section reads "Coming soon"; the source is what was believed.
- **Pull request plus auto-merge, dropping `required_review_thread_resolution`.** Recommended, and rejected by the author in favour of adding no mechanism at all. It would have bought a preview URL per post, at the cost of a github.com round trip on every publish and a merge that stalls whenever Copilot opens a review thread. GitHub's auto-merge does not update a stale branch, so `strict_required_status_checks_policy` would have made concurrent posts require a manual *Update branch*.
- **Remove the ruleset entirely.** Rejected: four of its rules cost the CMS nothing, and two of those are the only thing standing between a mistyped command and a rewritten `main`.

## Consequences

**The code path loses three gates too.** The ruleset was written for code, and nothing scopes a ruleset by path — so pull requests are no longer required for any change, CodeQL no longer blocks, and `Deploy to Cloudflare` is no longer a required check. `code_quality` still evaluates direct pushes, and `copilot_code_review` still reviews any pull request opened voluntarily, but as advice rather than a gate: `required_review_thread_resolution` lived inside the `pull_request` rule and left with it.

**Deploys are unaffected.** The workflow triggers on `push` to `main`, not on the required check, so a CMS save still deploys. Its `pull_request` trigger also survives, so preview deployments still run for any pull request that is opened — they are simply no longer compulsory.

**The pipeline stays repo-read-only, and now on one leg instead of two.** That rule was previously guarded twice: the workflow token cannot write, and the ruleset would have refused the push. The second guard is gone. `permissions: contents: read` is now the whole of it, which makes it a decision to be maintained rather than a condition of the environment — and it is what keeps OG images a build-time artifact.

**`main` is no longer frozen.** It previously required a pull request that could never merge, because the required check was expected from a workflow that did not exist. Removing two of those three rules unfreezes it, so the pipeline's own bootstrap no longer has to sequence itself around a merge.

**Reversal is cheap, and that is the point.** Re-adding the three rules is three entries in one ruleset — but it re-freezes the CMS at exactly the same place, with the same opaque GraphQL error, and this document is the only thing that would explain why.
