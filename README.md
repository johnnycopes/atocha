# Atocha

This is a monorepo containing several of my applications and libraries. Technologies used:

1. [Nx](https://nx.dev/) (monorepo)
2. [TypeScript](https://www.typescriptlang.org/) (language)
3. [Angular](https://angular.io/) (front-end framework)
4. [Firebase](https://firebase.google.com/) (real-time database + hosting)
5. [Netlify](https://www.netlify.com/) (hosting)
6. [Jest](https://jestjs.io/) (unit testing)
7. [Cypress](https://www.cypress.io/) (integration / e2e testing)
8. [Storybook](https://storybook.js.org/) (component workbench)

## Applications

### Globetrotter

- Live site: https://globetrotter.rocks
- [Original repo](https://github.com/johnnycopes/globetrotter)

A geography app featuring a country explorer and a configurable quiz. Test yourself on national flags, capitals, or country names from any part(s) of the world you like and receive a score based on your performance.

It has no back-end (at least for now), but uses both the [REST Countries API](https://restcountries.com/) for country data and the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) for country summary data.

### Menu Matriarch

- Live site: https://menu-matriarch.web.app
- [Original repo](https://github.com/johnnycopes/menu-matriarch)

A kitchen management app where you can add your favorite dishes, group them into meals, and plan your weekly menus. It uses Firebase for authentication and the database.

### Lorenzo

- Live site: https://lorenzo-ref.surge.sh

A dictionary app for the board game [Lorenzo il Magnifico](https://boardgamegeek.com/boardgame/203993/lorenzo-il-magnifico). All the game data is hard-coded and it uses the browser's LocalStorage API for state management.

## Shared libraries

Generic, well-tested collections of code. Minimally opinionated for maximum reusability.

### Core

1. **data-access**: abstractions for interacting with Firebase.
1. **ui**: generic, customizable Angular components.
1. **util**: framework-agnostic TypeScript functions/classes.

### Tree

1. **ui**: generic Angular components to render trees of any height with selectable nodes
2. **util**: framework-agnostic TypeScript logic to transform tree state and count data within a given tree
