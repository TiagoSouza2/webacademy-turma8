import express from "express"
import getEnv from "./utils/getEnv.js"
import router from "./router/index.js"

const app = express()
const env = getEnv()

app.use(express.json())
app.use(router)

app.listen(env.PORT, () => {
    console.log(`Serve running on port ${env.PORT}`)
})