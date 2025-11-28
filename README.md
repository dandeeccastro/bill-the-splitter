# Bill the Splitter

Want to go out with friends but not have the headache of doing math when the bill arrives? Here's a simple web app that does just that!

## Why?

I (luckily) have friends. I also go out with them and have to split bills sometimes. I wanted to have something that helps me with that, so here we are!

## Quick Start

[Go here](https://dandeeccastro.github.io/bill-the-splitter) and have fun!

Or you can clone this repo and host it yourself!

### Install dependencies

```sh
pnpm install
```

### Run locally

```sh
pnpm dev --host # for local network access
```

### Build with type checking

```sh
pnpm build
```

## Usage

You can use the edit button to:
- Add people to your table (and name them, even!) 
- Add the food you ordered
- Create orders so you know who ordered what and, finally, how much is owed from people!

All data is saved locally, so you can leave and come back to it again if you want (why would you do that though?).

## Contributing

Wanna help me make this even cooler than it is? Please submit a PR and I'll check it as soon as I'm capable!

Please remember to:
- **Check if the build works!** Serving it locally may work during development, but builds will break due to type errors.
- **Run tests!** They're available using this command

```sh
pnpm run test
```
