# Paotoong
## MERN stack  

Run wirh **Docker**\
\
`backend/.env`
```
PORT=3000
MONGO_URI=mongodb://host.docker.internal:27017/paotoong
SECRET=SECRET
```

`frontend/.env`
```
VITE_API_URL=http://backend:3000
```
