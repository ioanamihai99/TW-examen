const router = require('express').Router();
const Meeting = require('../models').Meeting;
const moment = require('moment')
router.get("/", async (req, res) => {
    let orderByValue;
    if (req.query.orderBy) {
        orderByValue = [
            //ordonam masa in functie de ce primim in query: ASC/DESC
            ['createdAt', req.query.orderBy],
        ];
    }


    try {
        await Meeting.findAll({
            // order - reprezinta obiectul prin care putem sa stabilim ordinea
            ...orderByValue && { order: orderByValue },
        })
            .then((allItems) => {
                console.log(allItems);
                return res.status(200).send(allItems)
            });
    }
    catch (err) {
        console.log(err)
        return res.status(404).send({ message: "No elements found in the database" });
    }

});

router.get("/:meetingId", async (req, res) => {
    console.log(req.params)
    let meetingFound;
    await Meeting.findOne({
        where: {
            id: req.params.meetingId
        }
    }).then((sc) => meetingFound = sc);
    if (meetingFound) {
        return res.status(200).send(meetingFound)
    }
    return res.status(404).send({ message: "No elements found in the database" });
});

// //salvare
router.post("/save", async (req, res) => {

    let meeting = {
        description: req.body.description,
        url: req.body.url,
    }
    if (meeting.description?.length < 5) {
        return res.status(500).send({ message: "description sa fie mai mare decat 5" })
    }
    //TODO url

    try {
        console.log(meeting)
        await Meeting.create(meeting);
    } catch (err) {
        console.log(err)

        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Item has been created successfully" })
});

router.put("/:meetingId", async (req, res) => {
    try {
        await Meeting.update(
            req.body,
            {
                where:
                    { id: req.params.meetingId }
            }
        );

        return res.status(200).send({ message: "item updated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
});

router.delete("/:meetingId", async (req, res) => {
    let itemFound = await Meeting.findByPk(req.params.meetingId);
    if (!itemFound) {
        return res.status(404).send({ message: "Item not found" });
    }
    await itemFound.destroy().then(() => { return res.send({ message: "Item deleted" }) });
});
module.exports = router;