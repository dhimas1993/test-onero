const router = require('express').Router()
const conn = require('../connection/index.js')
const fs = require('fs')
const sharp = require('sharp')

//=======================================
//MULTER PRODUCT IMAGE CONFIGURATION
const multer = require('multer')
const path = require('path')

const rootdir = path.join(__dirname, '../../')
const productImageDir = path.join(rootdir,'./upload/product_image')

const productImage_storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null,productImageDir)
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

const upload_productImage = multer(
    {
        storage: productImage_storage,
        limits:{
            fileSize: 1000000000
        },
        fileFilter(req,file,cb){
            if(file.originalname.match(/\.(jpg|png|jpeg)$/)){
                cb(null,true)
            }else{
                cb(new Error('Please upload a .jpg .png or .jpeg file'))
            }
        }
    }
)

//POST NEW PRODUCT
//karena mau bikin marketplace, jadinya tidak perlu product per user
router.post('/addproduct', (req, res) => {
    const sql = `SELECT product_name FROM product WHERE product_name = '${req.body.product_name}'`
    const sql2 = `INSERT INTO product SET ?`
    const data = req.body

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)
        
        if(result[0]) return res.send('Product sudah tersedia')

        conn.query(sql2, data, (err, result2) => {
            if(err) return res.send(err)
            
            res.send("product telah masuk")
        })
    })
})

// UPLOAD IMAGE
router.post('/product/image', upload_productImage.single('image'), (req, res) => {
    // const sql = `SELECT * FROM users WHERE username = ?`
    const sql2 = `UPDATE product SET image = '${req.file.filename}'
                    WHERE id = '${req.body.id}'`
    // const data = req.body.username

    // conn.query(sql, data, (err, result) => {
    //     if(err) return res.send(err)

    //     const user = result[0]

    //     if(!user) return res.send('User not found')

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err)

            res.send({
                message: 'Upload berhasil',
                filename: req.file.filename
            })
        })
    // })
})

// UPDATE PRODUCT
router.patch('/product/:id', upload_productImage.single('image'), (req, res) => {
    const sql = `UPDATE product SET ? WHERE id = '${req.params.id}'`
    const sql1 = `SELECT * FROM product WHERE id = '${req.params.id}'`
    
    if(req.file === undefined) {
        conn.query(sql, req.body, (err, result) => {
            if(err) return res.send(err.message)
    
            conn.query(sql1, (err, result2) => {
                if(err) return res.send(err.message)
    
                res.send(result2)
            })
        })
    } else {
        const data = {...req.body, image: req.file.filename}
        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.message)
    
            conn.query(sql1, (err, result2) => {
                if(err) return res.send(err.message)
    
                res.send(result2)
            })
        })
    }
})

// GET ALL PRODUCT
router.get('/product', (req,res)=>{
    const sql=`SELECT * FROM product`

    conn.query(sql, (err,results)=>{
        if(err){
            return res.send(err)
        }
        res.send(results)
    })
})

// Delete Product
router.delete('/deleteproduct/:product_id',(req,res)=>{
    const sql = `SELECT image FROM product WHERE id = ${req.params.product_id}`
    const sql2 = `DELETE FROM product WHERE id = ${req.params.product_id}`

    conn.query(sql,(err,results)=>{
        if(err){
            return res.send(err)
        }

        const productImageName = results[0].photo
        const productImagePath = productImageDir + '/' + productImageName

        if(results[0].photo){
            fs.unlink(productImagePath, (err)=>{
                if(err){
                    return res.send(err)
                }
            })
        }

        conn.query(sql2, (err,results)=>{
            if(err){
                return res.send(err)
            }
            res.send(results)
        })
    })
})

// Akses Image
router.get('/product/avatar/:imageName', (req, res) => {
    // Letak folder photo
    const options = {
        root: productImageDir
    }

    // Filename / nama photo
    const fileName = req.params.imageName

    res.sendFile(fileName, options, function(err){
        if(err) return res.send(err)

    })

})

// UPDATE PRODUCT BY ID
router.patch('/product/:id', (req, res) => {
    const sql = `UPDATE product SET ?
                WHERE id = ${req.params.id}`
    const data = req.body
    
    conn.query(sql, data,  (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

// DELETE PRODUCT BY ID
router.delete('/product/:id', (req, res) => {
    const sql = `DELETE FROM product WHERE id = ?`
    const data = req.params.id

    conn.query(sql, data,  (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

// get product by id
router.get('/product/:id', (req, res) => {
    const sql = `select * from product where id = '${req.params.id}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

// get product by Category id
router.get('/product-get/:categoryid', (req, res) => {
    const sql = `SELECT * FROM product where category_id = '${req.params.categoryid}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

// get product best sellers
router.get('/product-bestseller', (req,res) => {
    const sql = `select p.id, sum(o.qty) as qty, p.product_name, p.image, p.price, p.category_id from order_detail o
    join product p on p.id = o.products_id
    group by p.id order by sum(o.qty) desc limit 4`

    conn.query(sql, (err,result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})




module.exports = router