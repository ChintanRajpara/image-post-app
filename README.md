# Image Post App

This app demonstrates real-time UI updates upon user actions and synchronizes these changes every 30 seconds. If no changes are detected, it avoids making unnecessary API requests. However, if changes are detected, it optimizes performance by batching API calls into a single request.

---

### Step 1 - Run server app

- Create a new file `.env` by taking reference from `.env.example`, by default server will listen to port 8080 and will use localhost.

```shell
cd server/

yarn build && yarn dev
```

### Step 2 - Run Client app

- Set `API_SERVER_BASE_URL` in `client/src/utils/constants.tsx`.

- Open another terminal

```shell
cd client/

yarn dev
```
