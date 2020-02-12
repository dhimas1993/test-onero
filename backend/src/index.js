const express = require('express')
const cors = require('cors')

const adminRouter = require('./routers/adminRouter')
const userRouter = require('./routers/userRouter')
const categoryRouter = require('./routers/categoryRouter')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const kurirRouter = require('./routers/kurirRouter')
const checkoutRouter = require('./routers/checkoutRouter')

const app = express()
const port = 2019

app.use(express.json())
app.use(cors())
app.use(adminRouter)
app.use(userRouter)
app.use(categoryRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(kurirRouter)
app.use(checkoutRouter)

app.listen(port, () => {
    console.log('Berhasil Running di ' + port)
})