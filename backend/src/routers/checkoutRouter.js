const router = require('express').Router()
const conn = require('../connection/index.js')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const rootdir = path.join(__dirname,'/../..')
const photosorder = path.join(rootdir, '/upload/order_receipt')

const folder = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, photosorder)
        },
        filename: function (req, file, cb){
            // Waktu upload, nama field, extension file
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

const upstore = multer(
    {
        storage: folder,
        limits: {
            fileSize: 1000000000 // Byte , default 1MB
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
                return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
            }
    
            cb(undefined, true)
        }
    }
)

// UPLOAD AVATAR
router.post('/checkout/receipt', upstore.single('image'), (req, res) => {
    const sql2 = `UPDATE checkout SET order_receipt = '${req.file.filename}', order_status = 'Dibayar' WHERE id = '${req.body.id}'`

    conn.query(sql2, (err, result2) => {
        if(err) return res.send(err)

        res.send({
            message: 'Upload berhasil',
            filename: req.file.filename
        })
    })
})

// ACCESS IMAGE
router.get('/checkout/receipt/:imageName', (req, res) => {
    // Letak folder photo
    const options = {
        root: photosorder
    }

    // Filename / nama photo
    const fileName = req.params.imageName

    res.sendFile(fileName, options, function(err){
        if(err) return res.send(err)

    })

})

// DELETE IMAGE
router.delete('/checkout/receipt/:id', (req, res)=> {
    const sql = `SELECT * FROM checkout WHERE id = '${req.params.id}'`
    const sql2 = `UPDATE checkout SET order_receipt = null, order_status = 'Transaksi Ditolak' WHERE id = '${req.params.id}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        // nama file
        const fileName = result[0].order_receipt

        // alamat file
        const imgpath = photosorder + '/' + fileName

        // delete image
        fs.unlink(imgpath, (err) => {
            if(err) return res.send(err)

            // ubah jadi null
            conn.query(sql2, (err, result2) => {
                if(err) res.send(err)

                res.send('Delete berhasil')
            })
        })
    }) 
})

// get kurir
router.get('/kurir', (req, res) => {
    const sql = `select * from shipping`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

// ADD CHECKOUT
router.post('/addcheckout', (req, res) => {
    const sql = `insert into checkout set ?`
    const sql2 = `select * from checkout where id = ?`

    conn.query(sql, req.body, (err, result) => {
        if(err) return res.send(err)

        conn.query(sql2, result.insertId, (err, result2) => {
            if(err) return res.send(err)

            res.send(result2)
        })
    })
})

// GET CHECKOUT
router.get('/checkout',(req, res)=>{
    const sql = 'select * from checkout'

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)
        
        res.send(result)
    })
})

// get checkout by user
router.get('/checkout/:users_id',(req, res)=>{
    const sql = 'select * from checkout where user_id = ? order by CREATED_AT DESC'
    const data = req.params.users_id

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)
        
        res.send(result)
    })
})

// Update order status
router.get('/confirmpayment/:id', (req, res) => {
    const sql2 = `UPDATE checkout SET order_status = 'Transaksi Selesai' WHERE id = ?`
    const sql3 = `select * from checkout where id = ?`

        conn.query(sql2, req.params.id, (err, result2) => {
            if(err) return res.send(err)
            
            conn.query(sql3, result2.insertId, (err, result3) => {
                if(err) return res.send(err)
                
                res.send(result3)
            })
        })
    })

// cancel payment
router.get('/cancelpayment/:id', (req, res) => {
    const sql2 = `UPDATE checkout SET order_status = 'Transaksi Dibatalkan' WHERE id = ?`
    const sql3 = `select * from checkout where id = ?`

        conn.query(sql2, req.params.id, (err, result2) => {
            if(err) return res.send(err)
            
            conn.query(sql3, result2.insertId, (err, result3) => {
                if(err) return res.send(err)
                
                res.send(result3)
            })
        })
})

//check pending payment
router.get('/pendingpayment/:user_id', (req, res) => {
    const sql = `SELECT * FROM checkout where order_status = 'Pending' AND ?`

    conn.query(sql, req.params, (err, result) => {
        if(err) return res.send(err)    

        res.send(result)
    })
})

//post to order detail
router.post('/orderdetail', (req, res) => {
    const {arrayCart} = req.body

    console.log(arrayCart);
    
    const valueArray = arrayCart.map( cart => {
        return `( ${cart[2]}, ${cart[0]}, ${cart[1]} )`
    })

    console.log(valueArray);
    
    const sql = `INSERT INTO order_detail (checkout_id, products_id, qty) VALUES ${valueArray.join(',')} ` 

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)
        
        res.send(result)
    })
})


module.exports = router