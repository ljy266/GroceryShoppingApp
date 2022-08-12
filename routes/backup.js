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

router.get('/store1111', async (req, res) => {
    function manageSingleItem(p1) {
        let finalReturn1 = {} //grocery item info
        let finalReturn2 = {} //store info
        const itemName = JSON.parse(req.query.answer).name
        newName = itemName.split(' ')
        //console.log(newName[0])
        const array = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 1; i <= 8; i++) {
            GroItem.find({ $and: [{ name: newName[1] }, { type: newName[0] }, { shopId: i }] })
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
                // console.log("The lowest priced item is located in store with shopId: "
                //     + tempData2[0].shopId + "  and the lowest price is: " + tempData2[0].price)
                finalReturn1 = tempData2

            })
            .catch((error) => {
                console.log('Error Message:  ', error)
            })

        Store.find({ shopID: finalReturn1[0].shopId })
            .then((tempData3) => {
                finalReturn2 = tempData3
                const responseData = [{
                    "name": finalReturn2[0].storeName,
                    "picture": finalReturn2[0].image,
                    "description": finalReturn2[0].description,
                    "total": min,
                    "groceries": [
                        {
                            "name": finalReturn1[0].name,
                            "image": finalReturn1[0].picUrl,
                            "price": finalReturn1[0].price
                        }
                    ]
                }]
                console.log(finalReturn2[0].image)
            })
            .catch((error) => {
                console.log('Error Message:  ', error)
            })
        return responseData
    }

    ////////////function ends////////////

    let checkList = req.query.answer

    if (checkList[1] != null) {
        ilist = checkList
        for (let i = 1; i <= ilist.length; i++) {

        }
    }

    else {
        let finalReturn1 = {} //grocery item info
        let finalReturn2 = {} //store info
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

        await GroItem.find({ $and: [{ price: min }, { name: newName[1] }, { type: newName[0] }] })
            .then((tempData2) => {
                // console.log("The lowest priced item is located in store with shopId: "
                //     + tempData2[0].shopId + "  and the lowest price is: " + tempData2[0].price)
                finalReturn1 = tempData2

            })
            .catch((error) => {
                console.log('Error Message:  ', error)
            })

        await Store.find({ shopID: finalReturn1[0].shopId })
            .then((tempData3) => {
                finalReturn2 = tempData3
                const responseData = [{
                    "name": finalReturn2[0].storeName,
                    "picture": finalReturn2[0].image,
                    "description": finalReturn2[0].description,
                    "total": min,
                    "groceries": [
                        {
                            "name": finalReturn1[0].name,
                            "image": finalReturn1[0].picUrl,
                            "price": finalReturn1[0].price
                        }
                    ]
                }]
                console.log(finalReturn2[0].image)
                res.json(responseData)
            })
            .catch((error) => {
                console.log('Error Message:  ', error)
            })

        // console.log('outsidevalue1 =' + finalReturn1)
        // console.log('outsidevalue2 =' + finalReturn2)
    }

})

//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/store', async (req, res) => {
    let finalReturn1 = {} //grocery item info
    let finalReturn2 = {} //store info
    const groceryListItems = req.query.answer //list of items
    const organicListItems = []
    const nonOrganicListItems = []
    groceryListItems.map((groceryItem) => {
        // console.log (JSON.parse(groceryItem), "This is the groceryitem list:  ")
        const nameType = JSON.parse(groceryItem).name.split(' ')
        nameType[0].toLowerCase() === "organic" ? organicListItems.push(nameType[1]) : nonOrganicListItems.push(nameType[1])
    })

    // console.log(nonOrganicListItems, "this is non organic item")
    // console.log(organicListItems, "this is organic item")
    const array = [0, 0, 0, 0, 0, 0, 0, 0]
    // $or {$and {type = organic, name in organicListItems} , {type = non-organic, name in nonOrganicListItems}}

    //   $or: [ $and:[{"type": "organic", "name":{ $in: organicListItems }}], $and:[{"type": "non-organic", "name":{ $in: nonOrganicListItems }}]]
    //   $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ]
    //   $or: [ {$and: [{type: "organic"}, {name:{ $in: organicListItems }}]} ,   {   $and: [{type: "non-organic"}, {name:{ $in: nonOrganicListItems }}]  }  ]
    let globalUltimateFind
    await GroItem.find({ $or: [{ $and: [{ type: "Organic" }, { name: { $in: organicListItems } }] }, { $and: [{ type: "Non-Organic" }, { name: { $in: nonOrganicListItems } }] }] })
        .then((ultimateFind) => {
            ultimateFind.map((ary) => {
                array[ary.shopId - 1]  = array[ary.shopId - 1] + parseFloat(ary.price)
            })
            // console.log(array)
            globalUltimateFind = ultimateFind
        })
        .catch((error) => {
            console.log('Error Message:  ', error)
        })


    const minIndexStoreId = array.indexOf(Math.min(...array)) + 1
    const min = Math.min(...array)


    const trueUltimateFind = globalUltimateFind.filter((item) => {
        return parseInt(item.shopId) === minIndexStoreId
    })

    console.log(trueUltimateFind)

    Store.find({ shopID: minIndexStoreId })
        .then((tempData3) => {
                    const responseData = [{
                        "name": tempData3[0].storeName,
                        "picture": tempData3[0].image,
                        "description": tempData3[0].description,
                        "storeHours": tempData3[0].storeHours,
                        "total": min,
                        "groceries": 
                         trueUltimateFind.map ((i) => ({
                            "name": i.type + i.name,
                            "image": i.picUrl,
                            "price": i.price
                         }))
                        
                    }]
                    res.json(responseData)
                })
                .catch((error) => {
                    console.log('Error Message:  ', error)
                })










    // for (let i = 1; i <= 8; i++) {
    //     await GroItem.find({ $and: [{ name: newName[1] }, { type: newName[0] }, { shopId: i }] })
    //         .then((tempData) => {
    //             array[i - 1] = tempData[0].price
    //             console.log("price has been saved to array, the new array now is: " + array)
    //             console.log('this for loop ran ' + i + 'time(s)')
    //         })
    //         .catch((error) => {
    //             console.log('Error Message:  ', error)
    //         })
    //     //$and: [{ age: { $gt: 2 } }, { age: { $lte: 4 } }]
    // }
    // const min = Math.min(...array)
    // console.log(min)

    // await GroItem.find({ $and: [{ price: min }, { name: newName[1] }, { type: newName[0] }] })
    //     .then((tempData2) => {
    //         // console.log("The lowest priced item is located in store with shopId: "
    //         //     + tempData2[0].shopId + "  and the lowest price is: " + tempData2[0].price)
    //         finalReturn1 = tempData2

    //     })
    //     .catch((error) => {
    //         console.log('Error Message:  ', error)
    //     })

    // await Store.find({ shopID: finalReturn1[0].shopId })
    //     .then((tempData3) => {
    //         finalReturn2 = tempData3
    //         const responseData = [{
    //             "name": finalReturn2[0].storeName,
    //             "picture": finalReturn2[0].image,
    //             "description": finalReturn2[0].description,
    //             "total": min,
    //             "groceries": [
    //                 {
    //                     "name": finalReturn1[0].name,
    //                     "image": finalReturn1[0].picUrl,
    //                     "price": finalReturn1[0].price
    //                 }
    //             ]
    //         }]
    //         console.log(finalReturn2[0].image)
    //         res.json(responseData)
    //     })
    //     .catch((error) => {
    //         console.log('Error Message:  ', error)
    //     })

    // // console.log('outsidevalue1 =' + finalReturn1)
    // // console.log('outsidevalue2 =' + finalReturn2)
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