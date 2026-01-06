import 'reflect-metadata'
import dotenv from 'dotenv'
import {PORT} from './constants/app'

dotenv.config()

import app from './app'
import {AppDataSource} from './db/data-source'

AppDataSource.initialize()
    .then(() => {
        console.log('DataSource initialized')
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
        process.exit(1)
    })
