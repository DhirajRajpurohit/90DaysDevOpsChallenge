# Day 09 - Git & GitHub Advanced

## 📌 Objective

Learn advanced Git concepts that are commonly used in real-world software development and DevOps workflows. This includes branching strategies, merging, rebasing, resolving conflicts, stashing changes, reverting commits, tags, cherry-picking, and more.

---

# 📖 What You Will Learn

- Branching
- Merging
- Merge Conflicts
- Git Rebase
- Git Cherry-pick
- Git Stash
- Git Reset
- Git Revert
- Git Reflog
- Git Tags
- Git Remote
- Fork Workflow
- Pull Requests
- Best Practices

---

# 🌳 Git Branches

A branch is an independent line of development. It allows developers to work on new features or bug fixes without affecting the main project.

### View Branches

```bash
git branch
```

### Create a Branch

```bash
git branch feature-login
```

### Switch to a Branch

```bash
git checkout feature-login
```

or

```bash
git switch feature-login
```

### Create and Switch Together

```bash
git checkout -b feature-login
```

or

```bash
git switch -c feature-login
```

### Delete a Branch

```bash
git branch -d feature-login
```

Force delete

```bash
git branch -D feature-login
```

---

# 🌿 Merge Branches

Merge combines changes from one branch into another.

Example:

```bash
git checkout main
git merge feature-login
```

### Merge Workflow

```
main
 |
 |--------- Feature Branch
 |             |
 |             |
 |-------------|
      Merge
```

---

# ⚠ Merge Conflicts

Conflicts occur when Git cannot automatically combine changes.

Example Conflict

```text
<<<<<<< HEAD
Hello World
=======
Hello Git
>>>>>>> feature-login
```

Resolve manually and commit.

```bash
git add .
git commit
```

---

# 🔄 Git Rebase

Rebase moves commits from one branch onto another, creating a cleaner history.

```bash
git checkout feature-login

git rebase main
```

### Difference

Merge

```
A---B---C------M
     \
      D---E
```

Rebase

```
A---B---C---D---E
```

---

# 📦 Git Stash

Temporarily save uncommitted work.

Save changes

```bash
git stash
```

List stashes

```bash
git stash list
```

Apply latest stash

```bash
git stash apply
```

Apply and remove stash

```bash
git stash pop
```

Delete stash

```bash
git stash drop
```

---

# 🍒 Git Cherry-pick

Copy a specific commit from another branch.

```bash
git cherry-pick <commit-id>
```

Useful when only one commit is required instead of merging the whole branch.

---

# 🔖 Git Tags

Tags are used to mark important versions like releases.

Create lightweight tag

```bash
git tag v1.0
```

Annotated tag

```bash
git tag -a v1.0 -m "Version 1.0"
```

View tags

```bash
git tag
```

Push tags

```bash
git push origin v1.0
```

Push all tags

```bash
git push --tags
```

---

# ↩ Git Reset

Moves HEAD to another commit.

Soft Reset

```bash
git reset --soft HEAD~1
```

Mixed Reset

```bash
git reset HEAD~1
```

Hard Reset

```bash
git reset --hard HEAD~1
```

> ⚠ Hard reset permanently removes local changes.

---

# ↪ Git Revert

Creates a new commit that undoes a previous commit.

```bash
git revert <commit-id>
```

Unlike reset, revert preserves project history.

---

# 📜 Git Reflog

Shows every movement of HEAD.

```bash
git reflog
```

Recover lost commit

```bash
git reset --hard HEAD@{2}
```

Very useful after accidental resets.

---

# 🌐 Git Remote

View remote repository

```bash
git remote -v
```

Add remote

```bash
git remote add origin https://github.com/username/project.git
```

Change remote URL

```bash
git remote set-url origin https://github.com/username/newproject.git
```

Remove remote

```bash
git remote remove origin
```

---

# ⬆ Push Branch

```bash
git push origin feature-login
```

---

# ⬇ Pull Latest Changes

```bash
git pull origin main
```

---

# 📥 Fetch Changes

```bash
git fetch origin
```

Fetch downloads updates without merging.

---

# 🍴 Fork Workflow

Fork creates your own copy of another repository.

Workflow

```
Original Repository
        │
      Fork
        │
Your GitHub Repository
        │
      Clone
        │
Make Changes
        │
Commit
        │
Push
        │
Create Pull Request
```

---

# 🔀 Pull Request (PR)

A Pull Request allows contributors to propose changes before merging them into the main branch.

Typical workflow:

1. Create a branch
2. Make changes
3. Commit changes
4. Push branch
5. Open Pull Request
6. Review
7. Merge

---

# 📝 .gitignore

Ignore unnecessary files.

Example

```text
node_modules/
.env
*.log
dist/
coverage/
.idea/
.vscode/
```

---

# 📊 Merge vs Rebase

| Merge | Rebase |
|--------|---------|
| Preserves history | Creates cleaner history |
| Safe | Rewrites commits |
| Adds merge commit | No merge commit |
| Good for teams | Good for local branches |

---

# 📊 Reset vs Revert

| Reset | Revert |
|---------|---------|
| Removes commits | Creates new commit |
| Rewrites history | Keeps history |
| Dangerous on shared branches | Safe for shared branches |

---

# 📊 Pull vs Fetch

| Pull | Fetch |
|--------|---------|
| Downloads and merges | Downloads only |
| Updates working directory | Doesn't modify files |
| Easier | Safer |

---

# 📚 Common Advanced Git Commands

```bash
git branch
git checkout
git switch
git merge
git rebase
git stash
git stash pop
git stash list
git cherry-pick
git tag
git reset
git revert
git reflog
git remote -v
git fetch
git pull
git push
```

---

# 💡 Best Practices

- Commit small and meaningful changes.
- Use descriptive commit messages.
- Pull before pushing changes.
- Create feature branches for new work.
- Avoid committing sensitive files.
- Use `.gitignore` for temporary files.
- Review Pull Requests before merging.
- Prefer `git revert` on shared branches.
- Use tags for stable releases.
- Regularly sync with the main branch.

---

# 📂 Repository Structure

```
Day-09/
│── README.md
│── screenshots/
│── notes/
```

---

# 🎯 Key Learnings

- Understood advanced Git workflows.
- Learned branching and merging.
- Resolved merge conflicts.
- Used rebase for cleaner history.
- Saved temporary work using stash.
- Applied commits with cherry-pick.
- Managed releases using tags.
- Recovered lost commits using reflog.
- Compared reset and revert.
- Learned Pull Request workflow.
- Followed Git best practices.

---

# 🚀 Conclusion

Git is much more than a version control tool. Advanced Git commands help developers collaborate efficiently, maintain a clean project history, recover mistakes, and manage large software projects. Mastering these concepts is an essential skill for every DevOps Engineer and Software Developer.

---

## 👨‍💻 Author

**Dhiraj Rajpurohit**



#90DaysOfDevOps #Git #GitHub #DevOps #VersionControl #OpenSource
