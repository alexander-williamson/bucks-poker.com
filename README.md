# Bucks Poker Website

This is the source code for the https://bucks-poker.com website.

It is a Next.js static site. There are 4 data files in `/app/data` (in Excel .xlsx format) which are parsed as the project is built. Matt (bultark) has the source data files which are exported from his stats package.

# Develop locally

```
npm install
npm run dev
```

# Build and deploy

```
cd app
npx browserslist@latest --update-db
npm run deploy
aws s3 sync .\out\ s3://www.bucks-poker.com --acl public-read --delete
```
