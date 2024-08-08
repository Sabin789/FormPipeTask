# Formpipe React Development Test

This project is designed to allow you to showcase your React skills by building a simple application that consumes a mock back end API.

## Installation & Setup

1. Clone the repository (ensure the Git history is preserved, and **commit your changes as you go**. This is a key part of the test and any submissions without
   a Git history will be rejected.) We're not looking for you to commit every change, but want to see your process in action.
2. Run `yarn install` (the project is bootstrapped using Yarn but feel free to use another package manager if you prefer)
3. Run `yarn dev` to start the application. It will be available at Vite's default location of http://localhost:5173/
4. Run `yarn start-server` to start the mock back end. You should see a message in the console saying `JSON Server started on PORT :3000` and a list of
   available endpoints.

**Note:** When running `start-server` the file `db-source.json` will be copied to `db.json`. This is to ensure that the mock data is reset to its original state
when starting up. Any newly created data will be lost when the server is restarted.

The project is configured to use Prettier and ESLint, which you should utilise to maintain code quality.

If you experience any issues running the project, please contact [Drew Spencer](mailto:drew.spencer@formpipe.com).

## Coding Task

The task is to complete the development of a simple application that lists users and their roles.

An application skeleton has been provided for you. It contains some basic routing, and a few pages have been scaffolded for you.

The applications already has the following features:

1. A basic page that lists all users as cards.
2. A set of filtering options for the users, which currently do nothing.

### Core tasks:

1. Implement the filters in the expandable panel at the top of the 'List Users' page. You should ideally design it so that it could handle a very large number
   of records in the future.
2. The 'List Users' page should also allow the user to see all users in a table. The table should include some standard features such as sorting and pagination.
3. Add a detail page for the user that shows their details and a list of roles they belong to.

### Optional tasks:

1. There is an issue with routing in the application. Can you fix it?
1. Add a page that allows editing of an existing user. For this you can call `PATCH /users/:id` with the appropriate data.
2. Add the ability to group users by their roles.

## Notes

* Complete as many of the tasks as you can. You may decide to complete them all at a basic level, or you may decide to complete only some of them to a higher
  standard.
* You should use Mantine for UI components.
* You can use any other libraries you like, as long as you can justify their use.
* You may restyle and restructure the application as much as you like.
* You may find the documentation for json-server useful: https://github.com/typicode/json-server/tree/v0

## What we are looking for

* A well-structured, maintainable application.
* A good user experience.
* State management that is appropriate for the application.
* Good use of typescript features.
* Use of ESLint and Prettier to maintain code quality and style. These are configured in the project already, so you should ensure your IDE is configured to
  utilise them.

**Recommended time limit: 4-8 hours**

---

# Mantine Vite template (left for reference)

## Features

This template comes with the following features:.

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
