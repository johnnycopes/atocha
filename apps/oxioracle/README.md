# OXIOracle

A coding challenge submission by [John Coppola](https://www.johnnycopes.com/).

## Links

1. [GitHub codespaces](https://probable-robot-5grv69jwjx5c4j6.github.dev/)
1. [Commit history](https://github.com/johnnycopes/atocha/pull/554/commits)
1. [All code changes](https://github.com/johnnycopes/atocha/pull/554/files)

## Setup

Via GitHub codespaces:

1. Open the [codespaces project](https://probable-robot-5grv69jwjx5c4j6.github.dev)
1. Run `npm start oxioracle` in the Codespaces terminal
1. Open https://probable-robot-5grv69jwjx5c4j6-4800.app.github.dev to see the application running

Locally on your machine:

1. Run `git clone https://github.com/johnnycopes/atocha.git` to clone the project monorepo
1. Run `npm install` in your terminal to install all dependencies
1. Run `npm start oxioracle` to boot the application
1. Visit http://localhost:4800 in your browser to see the application running

## Technical details

### Tools used:

1. [Nx](https://nx.dev/) (monorepo)
2. [Angular](https://angular.dev/) (front-end framework), which includes HTML, CSS, TypeScript, and RxJS
3. [Jest](https://jestjs.io/) (unit testing)
4. [Cypress](https://www.cypress.io/) (e2e testing)
5. [Angular Material](https://material.angular.io/components/table/overview) (for the table)
6. [ng2-charts](https://valor-software.com/ng2-charts/) (for the charts)

### Project location

I created Oxioracle inside of [Atocha](https://github.com/johnnycopes/atocha), my personal Nx monorepo where I manage all of my current applications and libraries, rather than creating an independent repository for this project. This allowed me to reuse code that I leverage elsewhere, follow familiar patterns, and save significant time when installing libraries and writing tests.
