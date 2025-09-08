# Profile Management App

## Install
```sh
npm install
```

## Run only frontend
```sh
npm start
```

## Run local json-server API + React app
```sh
npm run dev
```



## Notes
- API base URL is configured by `REACT_APP_API_URL` (see `.env.development`)
- Persisted data is mirrored to `localStorage`
- Deploy to Vercel by connecting the repo and setting environment variables
- To run the API locally, make sure you have `db.json` in the project root
- If you use `npm run dev`, install `concurrently` with:
  ```sh
  npm install concurrently --save-dev
  ```