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
    GroItem.find({ "name": searchResult }).limit(2).then((data) => {
        const object1 = data[0]
        const object2 = data[1]
        const object3 = {
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
        //console.log(data[0], 'picUrl')
        res.json(newData)
    })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })
})
//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/item0', (req, res) => {
    const temp = req.query.answer
    searchResult = new RegExp(temp, 'i')
    GroItem.find({ name: searchResult })
        .then((data) => {
            const sid = data[0].shopId
            const length = data.length
            console.log(sid)
            console.log(length)
            res.json(data)
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })
})
//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/store', async (req, res) => {
    const itemName = JSON.parse(req.query.answer).name
    newName = itemName.split(' ')
    //console.log(newName[0])
    const array = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 1; i <= 8; i++) {
        await GroItem.find({ $and: [{ name: newName[1] }, { type: newName[0] }, { shopId: i }] })
            .then((tempData) => {
                array[i - 1] = tempData[0].price
                console.log("price has been saved to array, the new array now is: " + array)
                console.log('this for loop ran ' + i + 'time(s)')
            })
            .catch((error) => {
                console.log('Error Message:  ', error)
            })
        //$and: [{ age: { $gt: 2 } }, { age: { $lte: 4 } }]
    }
    const min = Math.min(...array)
    console.log(min)

    GroItem.find({ $and: [{ price: min }, { name: newName[1] }, { type: newName[0] }] })
        .then((tempData2) => {
            console.log("The lowest priced item is located in store with shopId: "
                + tempData2[0].shopId + "  and the lowest price is: " + tempData2[0].price)
            // console.log(tempData2)
            res.json(tempData2)
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })


})

//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/store0', (req, res) => {
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


router.get('/temporary', (req, res) => {
    // Store.find({ })
    //     .then((data) => {
    //         res.json()
    //     })
    //     .catch((error) => {
    //         console.log('Error Message:  ', error)
    //     })
})
//////////////////////////////////////////////////////////////////////////////////////////////


router.get('/search', (req, res) => {
    let searchResult = {}
    if (req.query.name != null && req.query.name !== '') {
        searchResult.name = new RegExp(req.query.name, 'i')
    }
    const result = GroItem.find(searchResult)
    res.send(result)
    //??how to send data back to frontend
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