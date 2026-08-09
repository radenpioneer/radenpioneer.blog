# radenpioneer.net

A personal site combining a dev blog with a portfolio. Content is authored in a git-based CMS and published as a static site.

## Language

### Content

**Blog Post**:
A dated piece of writing. Its identity is tied to when it was published — it records something at a point in time and is not expected to be revised to stay true.
_Avoid_: Article, entry, "post" used generically

**Portfolio Item**:
A piece of work being shown off. It describes a standing state rather than an event, so it is kept current rather than dated. Not a kind of Blog Post — it has its own fields, its own taxonomy, and its own ordering.
_Avoid_: Project, work item, portfolio post, "post" used to cover both kinds of content

**Draft**:
Content that exists in the repository but is deliberately not published. Visible while working locally, absent from the published site.
_Avoid_: Unpublished, hidden, WIP

### Classification

**Tag**:
A named topic a Blog Post belongs to. A first-class thing with its own name and description, not a loose string — so it can be browsed and described. Applies to Blog Posts only.
_Avoid_: Category, topic, keyword, label

**Taxonomy**:
A dimension along which content is classified. Blog Posts are classified by Tag; Portfolio Items use a separate taxonomy of their own.

### Configuration

**Site Settings**:
The single set of site-wide values that an author can change without a code change. Exactly one exists — it is not a collection.
_Avoid_: Config, globals, site config, options
