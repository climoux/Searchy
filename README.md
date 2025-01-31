Searchy is a simple web browser. No ads or trackers, just results. It is enhanced by my own web crawler.
This project is made with [Next.js](https://nextjs.org).

## Features

- Private browsing experience with no ads or trackers
- Custom web crawler to enhance search results
- Self-hosted API for handling search queries
- Built with Next.js for performance and scalability

## Installation

To run Searchy locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/Climoux/searchy.git`

2. Navigate to the project directory:

`cd searchy`

3. Install dependencies:

```
npm install
or
pnpm install
or
yarn install
```

4. Launch the application

```
npm run dev
or
pnpm run dev
or
yarn run dev
```

The application will be available at `http://localhost:3000`.

## API Endpoints

The backend API is located in the `/src/app/api` folder. Here are some key endpoints:

- `GET /api/search?q=your-query` - Fetches search results based on the query.
- `GET /api/stats` - Returns statistics about the crawler and indexed pages.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the CC0-1.0 license.
