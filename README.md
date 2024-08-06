## Comparatool

A work tool + Toy project

I found myself creating _many_ lists of npm packages I _wanted to try/needed for projects_, so I created **Comparatool** to simplify the harvest process.

It is also an occasion for me to test the Svelte 5 preview and fiddle with the JavaScript ecosystem. (:

## Tech Stack

-   Svelte 5 (preview)
-   SvelteKit 2
-   Melt-UI for headless components
-   SASS (`.scss`) for styles
-   Prisma ORM
-   PNPM
-   Prettier
-   ESLint

## Limitations

-   Currently only support **GitHub** as a data source
-   Mostly aimed at **`npm` packages**
-   **No auth**, this is (for now) intended for local use only

## Contributing

Open to comments and PR.

1. Clone the project (`git clone `)
1. Create new branch (`git checkout -b new_branch`)
1. `while (!done) { commit('new stuff!') && push(new_branch) }`
1. Create pull request

## Developing

Install dependencies :

```bash
pnpm i
```

Initialize prisma client :

```bash
pnpm prisma:push
```

Start a development server :

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version :

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
