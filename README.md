# Rick and Morty Frontend Application

This project is a frontend application that consumes the [Rick and Morty API](https://rickandmortyapi.com/) . It provides an interactive interface to explore characters, episodes, and locations from the popular TV show. The application supports pagination and various filtering options.

## Table of Contents

- [Requirements](https://github.com/christian-gama/rick-and-morty#requirements)
- [Installation](https://github.com/christian-gama/rick-and-morty#installation)
- [Available Scripts](https://github.com/christian-gama/rick-and-morty#available-scripts)
- [Testing](https://github.com/christian-gama/rick-and-morty#testing)
- [Linting](https://github.com/christian-gama/rick-and-morty#linting)

## Requirements

- [Node.js](https://nodejs.org/en/) v14.17.0 or later
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) v1.x

## Installation

1. Clone this repository:

```bash

git clone https://github.com/your-username/rick-and-morty.git
```

1. Navigate to the project folder:

```bash

cd rick-and-morty
```

1. Install the dependencies:

```bash

yarn install
```

## Available Scripts

In the project directory, you can run the following scripts:

### `yarn dev`

Runs the application in development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser. The page will reload if you make edits.

### `yarn build`

Builds the application for production. The build artifacts will be stored in the `.next` folder.

### `yarn start`

Starts the production server after a successful build.

## Testing

To run the test suite, use the following command:

```bash

yarn test
```

This will run Jest with the appropriate configuration and report any errors or warnings.

## Linting

The project uses ESLint and Prettier for linting and code formatting. To run the linter, use the following command:

```bash

yarn lint
```

To automatically fix linting issues, use:

```bash

yarn lint:fix
```
