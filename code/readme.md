# Pure - a minimum frontend without runtime dependencies

This project shows how to use browser standard Proyx and Reflect to implement a reactive web application[^1].

For the Documentation read the [web standards](https://developer.mozilla.org/),
especially about Custom Elements, Shadow DOM, Template Literals, the Content Template element,  the Javascript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [Javascript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

With [Can I use](https://caniuse.com/) you will see that your target platform supports all that you need.

## what you get

... is a simple table of todos loaded from [json-placeholder](https://jsonplaceholder.typicode.com/todos), formatted with w3school css styles that do not bleed out of their shadow root and a click handler that starts to randomly change the completed state of certain todos.

## what you learn

... do not use web frameworks, they are obsolete.

## Development

```bash
npm install
npm start
```

## Building

```bash
npm install
npm run build
```

[^1]: Which has nothing to do with the react framework