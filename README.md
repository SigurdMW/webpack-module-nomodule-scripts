# About
This repo contains a webpack setup with support for 2 different bundles - one for modern browsers and one for legacy browsers. The relevant output is this part: 
```html
<script type="module" src="main.modern.2468412b52b8206834d6.js"></script>
<script type="text/javascript" src="main.legacy.4e7b82576df19733c0f7.js" nomodule></script>
```

## Why do this?
This approach has performance benefits over having just one bundle for all browsers. The bundle for modern browsers will be smaller in size because it does not require the same amount of polyfills as the legacy bundle. With this little trick, just one of the bundles are fetched by the browser.

## Roadmap
Adding a dynamic script for supporting certain versions of Safari that are not able to understand the `nomodule` attribute: https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc

## More info
https://philipwalton.com/articles/deploying-es2015-code-in-production-today/

https://medium.com/oyotech/shipping-es6-in-browsers-without-polyfill-90d1fb440a55