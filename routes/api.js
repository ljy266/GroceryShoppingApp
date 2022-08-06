const express = require('express');

const router = express.Router();

const GroItem = require('../models/groItem')

const Store = require('../models/store')

//Routes
router.get('/', (req, res) => {
    const data = {
        Message: 'Nothing to see here, this is the api route, reserved'
    }
    res.json(data)
})
//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/item', (req, res) => {
    // console.log(GroItem.findOne({"name": "mango"}).limit(1), "new")
    const temp = req.query.answer
    searchResult = new RegExp(temp, 'i')
    GroItem.find({"name": searchResult}).limit(2).then((data) => {
             const object1 = data[0]
             const object2 = data[1]
             const object3 =  {
                "name": object1.type + " " + object1.name,
                "image": object1.picUrl,
                "description": object1.description
             }
             const object4 = {
                "name": object2.type + " " + object1.name,
                "image": object2.picUrl,
                "description": object2.description
             }
             const newData = [object3, object4]
             console.log(data[0], 'picUrl')
            //  console.log(newData)
             res.json(newData)
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })
})
//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/item1', (req, res) => {
    console.log(req.query.answer)
    GroItem.find({name: req.query.answer})
        .then((data) => {
            // console.log('Data:  ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })
})
//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/store', (req, res) => {
    //accessdatabase
    //transform daata
    //return the correct data

    const temp = [
        {
            "name": "Trader Joes",
            "picture": "Picture Route",
            "description": "MWF 8am - 10pm",
            "total": "$56.00",
            "groceries": [
                {
                    "name": "Tomato1",
                    "image": "../salmon.png",
                    "price": "$28.00"
                },
                {
                    "name": "Tomato2",
                    "image": "../salmon.png",
                    "price": "$28.00"
                },
                {
                    "name": "Tomato3",
                    "image": "../salmon.png",
                    "price": "$28.00"
                }
            ]
        }]
    Store.find({})
        .then((data) => {
            // console.log('Data:  ', data)
            res.json(temp)
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })
})
//////////////////////////////////////////////////////////////////////////////////////////////


// router.get('/temporary', (req, res) => {
//     const data = {
//         name: "Tomato2",
//         description: "Tomato grown from somewhere"
//     }
//     res.json(data)
// })
//////////////////////////////////////////////////////////////////////////////////////////////


router.get('/search', (req, res) => {
    let searchResult = {}
    if (req.query.name != null && req.query.name !== '') {
        searchResult.name = new RegExp(req.query.name, 'i')
    }
    const result = GroItem.find(searchResult)
    res.send(result)
})
//////////////////////////////////////////////////////////////////////////////////////////////


router.post('/save', (req, res) => {
    console.log('Body:  ', req.body)
    const dataComeIn = req.body

    const newGI = new GroItem(dataComeIn)

    //.save
    newGI.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry internal errors' })
            return;
        }
        //GroItem
        return res.json({
            msg: 'We recceived data, and it has been saved!'
        })

    })
})
//////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/calculation', (req, res) => {
//     //list of items
//     GroItem.find({$or:[{name: 'Tomato1'}, {name: 'Tomato2'}]})
//         .then((data) => {
//             console.log('Data:  ', data)
//             res.json(data)
//         })
//         .catch((error) => {
//             console.log('Error Message:  ', error)
//         })

// })

// router.get('/calculation', (req, res) => {

//     GroItem.find({name: 'Tomato1'})
//         .then((data) => {
//             console.log('Data:  ', data)
//             res.json(data)
//         })
//         .catch((error) => {
//             console.log('Error Message:  ', error)
//         })

// })


module.exports = router;