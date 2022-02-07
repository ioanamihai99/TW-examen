const router = require('express').Router();
const Participant = require('../models').Participant;

//gasirea tuturor participantilor dintr-un meeting
router.get("/meeting/:meetingId", async (req, res) => {
    console.log(req.query)
    try {
        await Participant.findAll({
            where: { meetingId: req.params.meetingId }
        }).then((allItems) => { console.log(allItems); return res.status(200).send(allItems) });
    }
    catch (err) {
        console.log(err)
        return res.status(404).send({ message: "No elements found in the database" });
    }
});

//adaugare participant in meeting
router.post("/meeting/:meetingId/add", async (req, res) => {
    let participant = {
        name: req.body.name,
        meetingId: req.params.meetingId,
    }
    //todo check if meetingId is in DB
    console.log(participant)
    if (participant.name?.length < 3) {
        return res.status(500).send({ message: "name sa fie mai mare decat 3" })
    }
    try {
        await Participant.create(participant);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Item has been created successfully" })
});

//modificare
router.put("/:participantId", async (req, res) => {
    try {
        await Participant.update(
            req.body,
            {
                where:
                    { id: req.params.participantId }
            }
        );

        return res.status(200).send({ message: "item updated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
});

router.delete("/:participantId", async (req, res) => {
    let itemFound = await Participant.findByPk(req.params.participantId);
    if (!itemFound) {
        return res.status(404).send({ message: "Item not found" });
    }
    await itemFound.destroy().then(() => { return res.send({ message: "Item deleted" }) });
});

module.exports = router;