const router = require('express').Router()
const conn = require('../connection/index.js')


// add category
router.post('/addcategory', (req,res)=>{
    const sql = `INSERT INTO category SET ?`
    const data = req.body

    conn.query(sql,data,(err,results)=>{
        if(err){
            return res.send(err,'gagal diinput')
        }
        res.send(results)
    })
})

// delete category
router.delete('/deletecategory/:category_id',(req,res)=>{
    const sql = `DELETE FROM categories WHERE id = ${req.params.category_id}`

    conn.query(sql,(err,results)=>{
        if(err){
            return res.send(err)
        }
        res.send(results)
    })
})

// Show all category
router.get('/category', (req,res)=>{
    const sql = `SELECT * FROM category`
    const data = req.body

    conn.query(sql,data,(err,results)=>{
        if(err){
            return res.send(err,'gagal diinput')
        }
        res.send(results)
    })
})

// get product by id
router.get('/category/:id', (req, res) => {
    const sql = `select * from category where id = '${req.params.id}'`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

module.exports = router