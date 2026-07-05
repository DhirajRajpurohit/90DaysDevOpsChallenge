# Day 08 - Git & GitHub Basics

## 📌 Objective

Learn the fundamentals of Git and GitHub, understand version control, and perform basic Git operations to manage source code efficiently.

---

## 📖 What is Git?

Git is a **distributed version control system (DVCS)** that helps developers:

- Track changes in source code
- Collaborate with other developers
- Maintain project history
- Restore previous versions if needed

### Benefits of Git

- Version Control
- Easy Collaboration
- Branching & Merging
- Backup of Code
- Faster Development

---

## 🌐 What is GitHub?

GitHub is a cloud-based platform that hosts Git repositories.

It allows developers to:

- Store repositories online
- Collaborate with teams
- Create Pull Requests
- Review code
- Manage issues and projects

---

## 🔄 Git Workflow

```
Working Directory
        │
        ▼
   git add
        │
        ▼
 Staging Area
        │
        ▼
 git commit
        │
        ▼
 Local Repository
        │
        ▼
 git push
        │
        ▼
 GitHub Repository
```

---

# Installation

### Windows

Download Git from:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

---

# Configure Git

Set your username:

```bash
git config --global user.name "Your Name"
```

Set your email:

```bash
git config --global user.email "your@email.com"
```

Check configuration:

```bash
git config --list
```

---

# Important Git Commands

## Initialize Repository

```bash
git init
```

## Clone Repository

```bash
git clone <repository-url>
```

Example:

```bash
git clone https://github.com/username/project.git
```

---

## Check Status

```bash
git status
```

---

## Add Files

Single file

```bash
git add file.txt
```

All files

```bash
git add .
```

---

## Commit Changes

```bash
git commit -m "Initial Commit"
```

---

## View Commit History

```bash
git log
```

Compact version

```bash
git log --oneline
```

---

## Connect Remote Repository

```bash
git remote add origin https://github.com/username/repository.git
```

Check remote:

```bash
git remote -v
```

---

## Push Code

First Push

```bash
git push -u origin main
```

Next Push

```bash
git push
```

---

## Pull Latest Changes

```bash
git pull origin main
```

---

## Fetch Changes

```bash
git fetch
```

---

# Branch Management

Create Branch

```bash
git branch feature
```

Switch Branch

```bash
git checkout feature
```

Create and Switch

```bash
git checkout -b feature
```

List Branches

```bash
git branch
```

Delete Branch

```bash
git branch -d feature
```

---

# Merge Branch

```bash
git checkout main

git merge feature
```

---

# Undo Changes

Discard Changes

```bash
git restore file.txt
```

Unstage File

```bash
git restore --staged file.txt
```

---

# Git Ignore

Create a `.gitignore` file.

Example:

```
node_modules/
.env
*.log
dist/
```

---

# Common Git Commands Summary

| Command | Description |
|----------|-------------|
| git init | Initialize repository |
| git clone | Copy repository |
| git status | Show repository status |
| git add | Stage files |
| git commit | Save changes |
| git log | Show history |
| git branch | Manage branches |
| git checkout | Switch branch |
| git merge | Merge branches |
| git pull | Download latest changes |
| git push | Upload changes |
| git remote -v | View remote repository |

---

# Key Learnings

- Learned the basics of Git and GitHub.
- Understood Version Control Systems.
- Configured Git on the local machine.
- Created and managed repositories.
- Performed commits and tracked changes.
- Worked with branches.
- Connected local repositories to GitHub.
- Pushed and pulled code from remote repositories.
- Learned the purpose of `.gitignore`.

---

# Repository Structure

```
Day-08/
│── README.md
│── screenshots/
│── notes/
```

---

# Conclusion

Git and GitHub are essential tools for every DevOps Engineer and Software Developer. Understanding version control, collaboration, branching, and remote repositories forms the foundation for modern software development and CI/CD workflows.

---

## 🚀 Author

**Dhiraj Rajpurohit**

#90DaysOfDevOps #Git #GitHub #DevOps #VersionControl
