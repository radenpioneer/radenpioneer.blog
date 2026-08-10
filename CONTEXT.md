# radenpioneer.net

A personal site combining a dev blog with a portfolio. Content is authored in a git-based CMS and published as a static site.

## Language

### Content

**Blog Post**:
A dated piece of writing. Its identity is tied to when it was published — it records something at a point in time and is not expected to be revised to stay true. It may be **corrected**; that is a different act from being kept current, and it does not change where the post sits in time.
_Avoid_: Article, entry, "post" used generically

**Correction**:
A fix applied to a published Blog Post — a typo repaired, a wrong fact retracted. A correction never changes what the post is a record of, so it never reorders the post relative to others. Distinct from keeping a Portfolio Item current, which is expected and continuous.
_Avoid_: Update, revision, edit — all three suggest the post is being kept current, which a Blog Post never is

**Portfolio Item**:
A piece of work being shown off. It describes a standing state rather than an event, so it is kept current rather than dated. Not a kind of Blog Post — it has its own fields, its own taxonomy, and its own ordering. Visitors meet it under the label **Work**; Portfolio Item is the name used in code and documents.
_Avoid_: Project, portfolio post, "post" used to cover both kinds of content

**Draft**:
Content that exists in the repository but is deliberately not published. Visible while working locally, absent from the published site.
_Avoid_: Unpublished, hidden, WIP

### Classification

**Tag**:
A named topic a Blog Post belongs to. A first-class thing with its own name and description, not a loose string — so it can be browsed and described. Applies to Blog Posts only.
_Avoid_: Category, topic, keyword, label

**Stack**:
A named technology a Portfolio Item was built with. A first-class thing so that new ones can be introduced by authoring, without a code change — but unlike Tag it is never browsed and carries no description. Every Portfolio Item names at least one.
_Avoid_: Tech, tool, technology tag, "tag" used to cover both kinds of classification

**Status**:
The condition of a Portfolio Item as a reader should understand it. `concept` marks work built to prove a concept rather than to serve users, and it is permanent — it describes what the work *is*, so it outranks any stage the work has reached. `on-progress`, `live`, and `archived` mark the stage of work that is not a concept.
_Avoid_: State, stage, phase, lifecycle — none of these capture that `concept` is a kind rather than a stage

**Taxonomy**:
A dimension along which content is classified. Blog Posts are classified by Tag; Portfolio Items are classified by Stack and Status. No Portfolio Item taxonomy is browsable — both are read on the item itself, not navigated.

### Configuration

**Site Settings**:
The site's own identity as copy — what it calls itself and how it describes itself. Exactly one exists. Anything that only takes effect after a code change is not a Site Setting.
_Avoid_: Config, globals, site config, options

**About**:
Who the author is — a name, a portrait, a one-line bio, and freeform prose. Exactly one exists. On a personal site the site and the person are the same subject, so About is both the site's about page and the author identity every Blog Post is bylined with.
_Avoid_: Author, profile, bio, me — each one splits a thing that is deliberately single
