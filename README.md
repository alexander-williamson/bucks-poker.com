# Build and deploy

```
cd app
npx browserslist@latest --update-db
npx next build
npx next export
aws s3 sync .\out\ s3://www.bucks-poker.com --acl public-read --delete
```
