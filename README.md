# ⏰ periodic-promise ⏰
Asynchronous periodic polling with promise.
- - -
<img src="https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80" />
<sup>**Photo by [Icons8 team](https://unsplash.com/icons8) on [Unsplash](https://unsplash.com/)**</sup>

<p align="center">
  <a href="https://www.npmjs.com/package/periodic-promise"><img src="https://img.shields.io/npm/v/periodic-promise.svg?style=flat-square" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/periodic-promise"><img src="https://img.shields.io/npm/dm/periodic-promise.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://circleci.com/gh/pixari/periodic-promise"><img src="https://circleci.com/gh/pixari/periodic-promise/tree/master.png?style=shield" alt="CircleCI Status"></a>
  <a href="https://snyk.io/test/github/pixari/periodic-promise?targetFile=package.json"><img src="https://snyk.io/test/github/pixari/periodic-promise/badge.svg?targetFile=package.json" alt="Known Vulnerabilities"></a>
  <a href="https://codeclimate.com/github/pixari/periodic-promise/maintainability"><img src="https://api.codeclimate.com/v1/badges/0a6a290620d30cba593d/maintainability" alt="Maintainability"></a>
    <a href="https://app.netlify.com/sites/periodic-promise/deploys"><img src="https://api.netlify.com/api/v1/badges/f6d1c032-c541-4a9d-937b-835a10300745/deploy-status" alt="Netlify Status"></a>
</p>
       

- - -
## ⏰ What is "periodic promise"?

It's a lightweight library that answers the following need:
  * resolving a Promise at specified intervals (in milliseconds)
  * calling a callback after every cycle exposing the response of the Promise
  * externally breaking the cycle
  * defining a specified number of iterations


Promises are a JavaScript feature that allow you to defer further actions until after a previous action has completed, or respond to its failure.


### :star: How to get it

NPM:

```bash
npm install periodic-promise
```

YARN:

```bash
yarn add periodic-promise
```

CDN: 
https://unpkg.com/periodic-promise

### :star: Usage in a nutshell

This code will call every 2 seconds the "foo.api()" until the response will return "bar".

```js
(async () => {
  const callback = r => r === 'bar';
  await periodicPromise(2000, () => foo.api(), callback)
})()
```

This example will do the same, but it will perform only 20 iterations.

```js
(async () => {
  const callback = r => r === 'bar';
  await periodicPromise(2000, () => foo.api(), callback, 20)
})()
```
### Live example:
[See the live example](https://periodic-promise.netlify.com/): https://periodic-promise.netlify.com/

## :open_book: API

### Syntax
```js
periodicPromise(delay, action, callback, limit);
```

### Parameter values
| Parameter | Description                                                                                                                                                                                                                               | Default value    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| delay     | Required. The intervals in milliseconds on how often to execute the code. ( > 0)                                                                                                                                                          | N/A              |
| action    | Required. The function that will be executed.                                                                                                                                                                                             | N/A              |
| callback  | Required. The function that will be call after every execution with the response of "action" as first param. If the returned value is truthy, the execution will continue. If the returned value is falsy, the execution will be stopped. | N/A              |
| limit     | Optional. After how many times the execution will be stopped.                                                                                                                                                                             | undefined (no limit) |

## :pencil: Documentation
### :rotating_light: Tests

Run your unit tests once:

```bash
npm run test
```

or in watch mode:
```bash
npm run test:watch
```

### :construction_worker: Build

Build the library:

```bash
npm run build
```

### :rocket: Dev mode

In dev mode, you can build in real-time your changes:

```bash
npm run dev
```


## :exclamation: Issues

I'm sure you'll find bugs and when you do it would be great if you'd could [report them here](https://github.com/pixari/periodic-promise/issues).

## :muscle: Contribution

The project is still in its early stages and in progress. I think there's no need for guidelines yet, so feel free to contribute or give feedback as you prefer.

## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
