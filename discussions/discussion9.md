# Discussion 9: Practice questions and answers

These questions follow the three Git Basics videos, Coder Coder's command-line tutorial, and Coder Coder's GitHub Desktop tutorial in that order. Command examples use `main` as the primary branch.

## 1. Git Basics, episode 1 — What is version control?

**1. What does a version control system record?**

**Answer:** It records selected states of a project and the history connecting them. We can inspect who recorded a change, when, and why through its commit information and compare what changed between versions.

**2. Why is ordinary saving insufficient for understanding a project's history?**

**Answer:** Saving a file replaces its current contents, but it does not necessarily explain the earlier contents or the reason for a revision. Version control gives us named historical points and comparisons across all tracked project files.

**3. Is version control useful only for source code?**

**Answer:** No. The video also discusses documents, designs, graphics, and other files. Text changes are usually easier to compare line by line; binary files can still be versioned, though their differences may be less readable.

**4. What do a commit's author, date, and message contribute?**

**Answer:** They give context for a recorded project state. The message should describe the change or its purpose so someone reading the history can understand it later.

**5. What is a diff?**

**Answer:** A diff is a comparison between two states, such as the current file and its staged version or two commits. For text, it commonly shows added and removed lines.

**6. Why does collaboration make version control more important?**

**Answer:** Several people can work from overlapping starting points and change the same or related files. Git keeps their work identifiable and helps combine it instead of requiring one person to overwrite the other's copy.

**7. What is a merge, and does Git always complete it automatically?**

**Answer:** A merge integrates two lines of work. Git can combine compatible changes automatically, but conflicting edits need a person to choose or write the intended result.

**8. Scenario: two classmates edit different paragraphs of the same tracked file. What happens next?**

**Answer:** Each can commit the work locally. When the histories are integrated, Git will often combine nonoverlapping text changes automatically. The classmates should still review the resulting document.

## 2. Git Basics, episode 2 — What is Git?

**9. How do Git and version control differ?**

**Answer:** Version control is the general practice of recording and comparing project history. Git is one version control system that implements it.

**10. What is a repository?**

**Answer:** A repository is a project's Git history and control data. In a local project, this data lives in `.git`, while the files we normally edit sit in the working tree.

**11. Can Git record history without GitHub or an internet connection?**

**Answer:** Yes. Git can initialize a local repository and make commits on one computer. A hosted remote becomes useful for sharing and synchronizing those commits.

**12. What does `git init` do in the video?**

**Answer:** It initializes the Git control structure for a new project. `git init project1` creates the `project1` directory and a repository inside it; `git init` inside an existing directory initializes that directory.

**13. How do `git add` and `git commit` differ?**

**Answer:** `git add` places selected current file contents into the staging area for the next commit. `git commit` records the staged project state as a new historical point.

**14. What is a snapshot in Git?**

**Answer:** It is the recorded state of the tracked project files at a commit. Git can display changes between snapshots, but a commit represents a project state, not merely a loose list of edits.

**15. Why can two collaborators commit independently before merging?**

**Answer:** Each has a local repository and can record commits while working from a common earlier state. Git later uses the histories' shared ancestry to help integrate the changes.

**16. Is a branch a separate full copy of every file?**

**Answer:** No. A branch is a movable reference to a commit. The commits reachable from that reference describe the branch's history, and checking it out updates the working tree to the chosen state.

**17. What can advanced Git users control beyond committing entire files?**

**Answer:** They can stage selected changes, inspect detailed or graphical history, and choose options for branching and merging. The introductory video presents these as extensions of the same core model.

## 3. Git Basics, episode 3 — Get going

**18. What are `user.name` and `user.email` for?**

**Answer:** Git writes them into commit attribution. They do not authenticate us to GitHub. In a public repository, commit email information may be visible, so a suitable no-reply address can protect a personal address.

**19. How can we set and check a name and email for the current user?**

**Answer:** Use `git config --global user.name "Your Name"` and `git config --global user.email "address@example.com"`; inspect them with `git config --global --get user.name` and `git config --global --get user.email`. The values are examples, not login credentials.

**20. What are the first commands for a new local project?**

**Answer:** For a new directory, run `git init project1`, enter it with `cd project1`, create a file, then run `git add file1.txt` and `git commit -m "Add first file"`. The add prepares the file; the commit creates the historical record.

**21. Does `git add` permanently save the file in project history?**

**Answer:** No. It prepares the file's current contents in the staging area. A commit records that staged state in history.

**22. Why include `-m` with `git commit`?**

**Answer:** It supplies a commit message on the command line. Without it, Git normally opens the configured editor for a message.

**23. What should we do after the first commit?**

**Answer:** Continue editing, inspect changes, stage the desired state, and commit coherent increments. History becomes more useful when messages explain distinct steps.

## 4. Coder Coder — Command-line Git and GitHub

### Local states and inspection

**24. What is the difference among the working tree, staging area, and repository history?**

**Answer:** The working tree contains the files we edit. The staging area holds the selected state for the next commit. Repository history holds committed states and their relationships.

**25. What does `git status` tell us?**

**Answer:** It reports the current branch and which files are untracked, modified, staged, or otherwise different from the last commit. It is the first check before staging, committing, switching branches, or pushing.

**26. What does “untracked” mean?**

**Answer:** Git has not included that file in a commit or staged it for tracking. Creating a file in the folder does not automatically add it to history.

**27. What does “working tree clean” mean?**

**Answer:** Git sees no staged or unstaged changes to tracked files and no untracked files that it reports. It does not mean the project is correct or that every local file is backed up; ignored files can still be present.

**28. What does `git add .` select, and why inspect afterward?**

**Answer:** It stages eligible changes under the current directory, including additions, modifications, and deletions. It may include more than intended, so run `git status` and `git diff --staged` before committing. A named path is more selective.

**29. Scenario: we stage `index.html`, edit it again, and commit immediately. Which version is committed?**

**Answer:** The version captured by the earlier `git add`, without the second edit. Run `git add index.html` again if the latest edit belongs in the commit.

**30. What short command sequence includes that second edit?**

**Answer:** After saving the second edit, run `git add index.html`, `git diff --staged`, and `git commit -m "Update page heading"`. The second `add` refreshes the staged contents.

**31. How do we inspect unstaged versus staged changes?**

**Answer:** `git diff` compares the working tree with the staging area for tracked files; `git diff --staged` compares the staging area with the last commit. `git status` summarizes both. A newly untracked file will not appear in ordinary `git diff` until staged or otherwise introduced to the index.

**32. Why can the same file appear under both staged and unstaged changes?**

**Answer:** Its staged contents differ from the last commit, and its current working-tree contents differ again from the staged copy. This often happens after another edit following `git add`.

**33. What does `git commit -m "..."` commit?**

**Answer:** Ordinarily, it commits the state already in the staging area. It does not automatically include every current working-tree edit.

**34. What does `git commit -am "..."` change?**

**Answer:** It stages and commits modifications and deletions to files already tracked by Git. It does not include newly untracked files. Check `git status` first because it may sweep in several tracked changes.

**35. How do `git log` and `git log --oneline` differ?**

**Answer:** `git log` shows detailed commit information; `--oneline` provides abbreviated identifiers and messages for a compact history view. A commit's identifier distinguishes it from other commits.

**36. What are a parent commit, `HEAD`, and the current branch?**

**Answer:** A normal commit refers to its previous commit as its parent. `HEAD` identifies the checked-out position, usually through the current branch, and that branch advances when we commit on it.

**37. Why might moving a file first look like a deletion and a new file?**

**Answer:** Git compares recorded paths with current paths. Once the changes are staged, it may recognize a rename from similar contents. Empty directories alone do not have a Git file record.

### Ignoring and recovering files

**38. What does `.gitignore` do?**

**Answer:** It lists patterns for intentionally untracked files Git should normally ignore, such as generated build outputs or local environment files. We often commit `.gitignore` itself so collaborators share those rules.

**39. Scenario: a tracked `.env.local` is added to `.gitignore`. Is it now untracked or removed from GitHub?**

**Answer:** No. Ignore rules do not affect already tracked files or erase old commits. To stop tracking it in future commits while retaining the local file, use `git rm --cached .env.local` and commit the change; an exposed secret still needs to be revoked or rotated.

**40. What is a safe command for restoring an accidentally deleted, tracked file before staging?**

**Answer:** Check `git status` and `git diff`, then run `git restore path/to/file`. That restores the indexed version in the working tree and discards unstaged changes to that path. It cannot recover an untracked file Git has never recorded.

**41. How do we remove a file from the staging area without discarding its working-tree edit?**

**Answer:** Run `git restore --staged path/to/file`. The edit remains in the working tree and can be staged later.

**42. What is a revert?**

**Answer:** `git revert <commit>` creates a new commit reversing an earlier commit's effect, subject to resolving any conflicts. It preserves the original commit in history.

**43. Scenario: a mistaken deletion is already published. Should we use restore or revert?**

**Answer:** Use `git revert <deletion-commit>` to make a new corrective commit, then push it. `git restore` addresses a working-tree or index state and does not by itself reverse a published commit for collaborators.

**44. Why avoid rewriting a commit that collaborators may already have downloaded?**

**Answer:** Their histories contain the published commit. Replacing it with different history makes later synchronization and merging harder; a revert adds an explicit correction everyone can receive.

### Branches and merging

**45. How do we create and switch to a feature branch?**

**Answer:** Run `git switch -c welcome`. Alternatively, use `git branch welcome` followed by `git switch welcome`. `git branch` alone lists local branches and marks the current one.

**46. What happens to `main` when we commit on `welcome`?**

**Answer:** `welcome` advances to the new commit; `main` stays at its previous commit. Switching to `main` ordinarily changes the working tree to match its state.

**47. What commands merge `welcome` into `main`?**

**Answer:** After committing or otherwise safely handling current edits, run `git switch main` and then `git merge welcome`. Review the result; if Git reports conflicts, resolve them and complete the merge.

**48. What is a fast-forward merge?**

**Answer:** It occurs when the destination branch has not advanced separately since the feature branch started. Git can move the destination branch reference forward to the feature commit without creating a merge commit.

**49. Scenario: both branches edit the same line differently. What happens next?**

**Answer:** Git may stop with a conflict and mark the affected file. We decide the intended combined text, stage the resolved file, and complete the merge. An automatic line merge cannot decide the desired meaning for us.

**50. When can the finished feature branch be deleted?**

**Answer:** After its work is integrated and checked, `git branch -d welcome` removes the branch reference. The merged commits remain reachable through `main`.

### Remotes and GitHub

**51. What is GitHub's role compared with Git's?**

**Answer:** Git is the local version control system; GitHub hosts remote repositories and provides ways to share, view, and collaborate on their committed history.

**52. What is a remote, and what does `origin` mean?**

**Answer:** A remote is a named connection to another repository. `origin` is the conventional name for the primary remote, not a special requirement of Git.

**53. How do we connect an existing local repository to an empty GitHub repository and push `main`?**

**Answer:** Copy that repository's URL and run:

```sh
git remote add origin https://github.com/OWNER/REPO.git
git push -u origin main
```

`-u` records `origin/main` as the branch's upstream for later synchronization. Authentication to GitHub is still required when pushing.

**54. Why does the command-line tutorial create an empty GitHub repository?**

**Answer:** It already has a separate local history to push. Adding a README on GitHub first creates a remote commit that the local history does not contain, so the first push may be rejected until the two histories are integrated.

**55. What is the difference between a local commit and a push?**

**Answer:** A commit records history in the local repository. A push transfers commits and updates the selected remote branch, assuming the remote accepts them.

**56. Scenario: a file is edited but not committed. Does `git push` publish it?**

**Answer:** No. Pushing sends commits, not uncommitted working-tree or staged edits. Even a local commit stays off GitHub until it is pushed.

**57. How do clone, fetch, and pull differ?**

**Answer:** Clone creates a local copy of a remote repository. Fetch downloads remote updates without integrating them into the current branch. Pull fetches and then integrates them according to the repository's configured strategy.

## 5. Coder Coder — GitHub Desktop

**58. What choices matter when creating a GitHub repository in the Desktop tutorial?**

**Answer:** Choose public or private visibility, and decide whether to create a README, `.gitignore`, and license. A README describes the project, ignore rules keep matching untracked files out of normal staging, and a license states permitted reuse.

**59. What happens when GitHub creates a repository with a README?**

**Answer:** GitHub creates an initial commit containing that file. Cloning then downloads that committed history; the remote is not empty.

**60. What does cloning into GitHub Desktop give us?**

**Answer:** It gives us a local repository and working files associated with the GitHub remote. We can edit those local files while the GitHub copy remains unchanged until commits are pushed.

**61. What do the Changes and History views represent?**

**Answer:** Changes shows current local file changes and their diffs, similar to status and diff commands. History shows recorded commits and their messages.

**62. Can Desktop commit only part of current work?**

**Answer:** Yes. The tutorial selects particular files and, for a suitable text diff, particular lines. This is the graphical counterpart of choosing what to stage for a coherent commit.

**63. Scenario: we make a Desktop commit but the GitHub page still shows the earlier commit. Why?**

**Answer:** The new commit exists only locally. Use Push origin to send it to the hosted repository, then refresh the page.

**64. What do Fetch origin and Pull do?**

**Answer:** Fetch checks for and downloads remote commits without placing them into the current local branch. Pull incorporates those remote commits into the local branch. Neither action publishes uncommitted local edits.

**65. How does Desktop handle a mistake before any commit?**

**Answer:** Discard changes returns the selected uncommitted work to its earlier recorded state. Inspect the diff first, because discarded edits may be lost.

**66. What does Desktop's Undo do for a recent, unpushed commit in the tutorial?**

**Answer:** It removes that local commit and returns its changes to the Changes view. This is appropriate only while that commit has not been shared with others.

**67. How does Desktop reverse a commit already pushed to GitHub?**

**Answer:** Revert changes in commit creates a new commit with the inverse change. Push that new commit so the remote and collaborators receive the correction while retaining the original history.

**68. What single question should guide our choice among Discard, Undo, and Revert?**

**Answer:** Ask whether the change is merely uncommitted, committed only locally, or already shared. Discard addresses the first state, Undo in the demonstrated workflow addresses the second, and Revert addresses the published third state.
