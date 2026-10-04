# Bucks Poker Website

[![default](https://github.com/alexander-williamson/bucks-poker.com/actions/workflows/default.yml/badge.svg)](https://github.com/alexander-williamson/bucks-poker.com/actions/workflows/default.yml)

This is the source code for the https://bucks-poker.com website.

It is a Next.js static site. There are 4 data files in `/app/data` (in Excel .xlsx format) which are parsed as the project is built. Matt (bultark) has the source data files which are exported from his stats package.

## Uploading new spreadsheet files

The data files live in [`app/data`](https://github.com/alexander-williamson/bucks-poker.com/tree/main/app/data):

```
app/data/Poker - Monthly Positions.xlsx
app/data/Poker - Person Info.xlsx
app/data/Poker - Year Figures.xlsx
app/data/Poker - Year Hands.xlsx
```

**Keep the filenames exactly as they are**, including the spaces and the hyphen. The
site looks each workbook up by that exact name, so a new upload has to replace the
old file rather than sit alongside it as `Poker - Year Figures (1).xlsx`. The column
headings matter too — the build validates them and will fail if the export format
changes.

There are two ways to get a new workbook in. Use whichever you find easier; the
result is identical.

### Option 1: the GitHub website

No tools to install — this all happens in the browser.

1. Go to [`app/data`](https://github.com/alexander-williamson/bucks-poker.com/tree/main/app/data).
2. Click **Add file** → **Upload files**.
3. Drag your `.xlsx` files onto the page. Because the names match, GitHub will
   replace the existing workbooks.
4. Under *Commit changes*, put a short description in the first box, for example
   `September 2026 figures`.
5. Choose **Create a new branch for this commit and start a pull request**. The
   suggested branch name is fine.
6. Click **Propose changes**, then **Create pull request** on the next screen.
7. Wait for the **Pull Request Checks** to finish. Green tick means the site builds
   cleanly with your data — click **Merge pull request**. A red cross means
   something is wrong with the workbook; open the check to see what.

### Option 2: git on the command line

```bash
# once, to get a copy
git clone git@github.com:alexander-williamson/bucks-poker.com.git
cd bucks-poker.com

# every time, starting from an up-to-date main
git checkout main
git pull
git checkout -b data/september-2026

# copy the new workbook over the old one, keeping the name identical
cp ~/Downloads/"Poker - Year Figures.xlsx" "app/data/Poker - Year Figures.xlsx"

git add app/data
git commit -m "September 2026 figures"
git push -u origin data/september-2026
```

`git push` prints a link to open the pull request. Follow it, create the PR, wait
for the checks to pass and merge. If you have the [GitHub CLI](https://cli.github.com)
you can skip the browser with `gh pr create --fill`.

Spreadsheets are binary files, so git cannot merge two people's edits to the same
workbook. Always `git pull` before you start, and avoid sitting on a branch for days.

### What happens after merging

Merging to `main` triggers the **Deploy to Production** workflow, which lints, tests,
rebuilds the site from the spreadsheets and publishes it to
<https://bucks-poker.com>. It usually takes a couple of minutes; you can watch it on
the [Actions tab](https://github.com/alexander-williamson/bucks-poker.com/actions).

Because the workbooks are parsed at build time, the live site only changes when a
deploy runs — uploading a file is what starts that.

## Develop locally

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run deploy
```
