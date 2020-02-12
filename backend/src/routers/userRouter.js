const conn = require('../connection/')
const router = require('express').Router()
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

// __dirname: alamat folder file userRouter.js
const rootdir = path.join(__dirname,'/../..')
const photosdir = path.join(rootdir, '/upload/photos')

const folder = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, photosdir)
        },
        filename: function (req, file, cb){
            // Waktu upload, nama field, extension file
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

// untuk upload data
const upstore = multer(
    {
        storage: folder,
        limits: {
            fileSize: 100000000 // Byte , default 1MB
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
                return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
            }
    
            cb(undefined, true)
        }
    }
)


// LOGIN USER
router.post('/users/login', (req,res) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    const data = req.body.username

    conn.query(sql,data, async (err, result) => {
        if(err) return res.send (err)

        const user = result[0]

        if(!user) return res.send('username tidak ditemukan')
        const match = await bcrypt.compare(req.body.password, result[0].password)

        if(!match) {
            return res.send('password salah')
        } 
        res.send(user)
    })
})

// CREATE ONE USER
router.post('/users', (req, res) => {

    // tanda tanya akan di ganti oleh variabel data
    const sql = `INSERT INTO users SET ?`
    const sql2 = `SELECT username, name, email, gender, password FROM users WHERE id = ?`
    const data = req.body

    // Cek apakah email valid
    if(!isEmail(data.email)){
        return res.send('Email is not valid')
    }

    // Mengubah password dalam bentuk hash
    data.password = bcrypt.hashSync(data.password, 6)

    // Insert data
    conn.query(sql, data, (err, result1) => {
    
        // Terdapat error ketika insert
        if(err){
            return res.send(err)
        }

        // Read data by user id untuk di kirim sebagai respon
        conn.query(sql2, result1.insertId, (err, result2) => {
            if(err){
                return res.send(err)
            }
            res.send(result2)
            
        })
    })
})


// DELETE USER
router.delete('/users/:id', (req,res) => {
    const sql = `DELETE FROM users WHERE id = ?`
    const data = req.params.id

    conn.query(sql,data, (err, result) => {
        if (err) return res.send(err)
            res.send(result)
    })
})

// UPDATE USER
router.patch('/users/:id', upstore.single('image'), (req, res) => {
    const sql = `UPDATE users SET ? WHERE id = '${req.params.id}'`
    const sql1 = `SELECT * FROM users WHERE id = '${req.params.id}'`
    
    if(req.file === undefined) {
        conn.query(sql, req.body, (err, result) => {
            if(err) return res.send(err.message)
    
            conn.query(sql1, (err, result2) => {
                if(err) return res.send(err.message)
    
                res.send(result2)
            })
        })
    } else {
        const data = {...req.body, avatar: req.file.filename}
        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.message)
    
            conn.query(sql1, (err, result2) => {
                if(err) return res.send(err.message)
    
                res.send(result2)
            })
        })
    }
})

// UPLOAD AVATAR
router.post('/users/avatar', upstore.single('image'), (req, res) => {
    // const sql = `SELECT * FROM users WHERE username = ?`
    const sql2 = `UPDATE users SET avatar = '${req.file.filename}'
                    WHERE id = '${req.body.id}'`

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err)

            res.send({
                message: 'Upload berhasil',
                filename: req.file.filename
            })
        })
    // })
})

// READ DATA
router.get('/users',(req,res) => {
    const sql = `SELECT * FROM users`
    
    conn.query(sql,(err, result) => {
        if(err) return res.send(err)
            res.send(result)
    })
})

router.get('/users/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`
    const data = req.params.id

    conn.query(sql,data, (err,result) => {
        if(err) return res.send(err)
            res.send(result)
    })
})

router.get('/username', (req,res) => {
    const sql = `SELECT * FROM users WHERE ?`
    const data = req.query

    conn.query(sql, data,(err, result) => {
        if(err) return res.send(err)
            res.send(result[0])
    })
})

// ACCESS IMAGE
router.get('/users/avatar/:image', (req, res) => {
    // Letak folder photo
    const options = {
        root: photosdir
    }

    // Filename / nama photo
    const fileName = req.params.image

    res.sendFile(fileName, options, function(err){
        if(err) return res.send(err)
    })
})


// DELETE IMAGE
router.delete('/users/avatar', (req, res)=> {
    const sql = `SELECT * FROM users WHERE username = '${req.body.username}'`
    const sql2 = `UPDATE users SET avatar = null WHERE username = '${req.body.username}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        // nama file
        const fileName = result[0].avatar

        // alamat file
        const imgpath = photosdir + '/' + fileName

        // delete image
        fs.unlink(imgpath, (err) => {
            if(err) return res.send(err)

            // ubah jadi null
            conn.query(sql2, (err, result2) => {
                if(err) return res.send(err)

                res.send('Delete berhasil')
            })
        })
    })
})

module.exports = router


