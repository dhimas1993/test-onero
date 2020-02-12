const router = require('express').Router()
const conn = require('../connection/index.js')

// add kurir
router.post('/addkurir', (req,res)=>{
    const sql = `INSERT INTO kurir SET ?`
    const data = req.body

    conn.query(sql,data,(err,results)=>{
        if(err){
            return res.send(err,'gagal diinput')
        }
        res.send(results)
    })
})

// Show all category
router.get('/kurir', (req,res)=>{
    const sql = `SELECT * FROM kurir`
    const data = req.body

    conn.query(sql,data,(err,results)=>{
        if(err){
            return res.send(err,'gagal diinput')
        }
        res.send(results)
    })
})

router.get('/size', (req, res) => {
    const sql = `select * from size`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

module.exports = router