# basic-recipes-app

it is an app that stores recipes

build command is:

```
bun build ./source/index.tsx --outdir ./build --watch [--minify]
```

make sure the `json-recipes` npm module is linked locally! install it locally and run `bun link` over in that directory, then the `json-recipes` package should work in this `package.json`
