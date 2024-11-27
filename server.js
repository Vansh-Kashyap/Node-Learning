const dotEnv = require('dotenv')
const mongoose = require('mongoose')
dotEnv.config({ path: './config.env' })
const app = require('./app')
const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log("DB Connected sucessfully")
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});