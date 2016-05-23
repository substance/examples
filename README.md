# Substance Examples

Here you can find a number of examples that cover various Substance API's. If you are new to Substance, check them out in the following order:

## Install

You can start playing around with the code by cloning this repo and starting the dev server.

```bash
$ git clone https://github.com/substance/examples.git
$ npm install
$ npm start
```

And navigate to [http://localhost:5000](http://localhost:5000)

## Bundling

A static distribution of the demos can be created by running the bundle command. To adapt the bundling process edit `gulpfile.js`.

```bash
$ npm run bundle
```

## Examples

Our examples are based on Substance users' questions. The goal of this repository is to cover every Substance feature and demonstrate it based on simple code snippets.

### How can I change the icon of a tool?

The easiest way to do this is to extend the tool component and overwrite the `renderIcon` method.

### How can I implement my own node type?

There are different kinds of node types. See a, b, c.

### How to create a modal dialog?

TODO

## Questions

Please create an issue in the [Substance repository](https://github.com/substance/substance/issues).
