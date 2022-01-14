import express from "express";
import { updateDailyData, receiveAppointments } from "../models/db.js"

const router = express.Router();


// Index Route -> Login Required
router.get('/', (req, res) => {
    const user = req.user;

    if(user == null){
        res.redirect(`/signIn`);
    }

});



// Updating Covid Data Route in Admin Interface --> Login required
router.put('/updateData:id', (req, res) => {

    try {

        // Data entered in form
        const { infectedNum, deathNum, activeNum, recoveredNum } = req.body;
        const user = req.user;
        const data = {
            infectedNum,
            deathNum,
            activeNum,
            recoveredNum
        };

        // Checking whether data got updated in FireStore
        const dataUpdated = updateDailyData(data, user);


        // Sending Response for Successful Data Updation
        if (dataUpdated) {
            res.status(200).json({
                message: "Data Updated Successfully",
                dataUpdated: dataUpdated
            });
        } else{
            throw Error('Could Not Update Data')
        }

    } catch (error) {
        res.status(500).json(error.message);
    }

});


// Route to receive the appointments -> Login Required
router.get('/getAppointments:id', (req, res) => {

    try{

        const user = req.user;

        const appointments = receiveAppointments(user);

        if(appointments != null){
            res.send(appointments);
        } else{
            throw new Error('Internal Server Error');
        }

    } catch(error){
        res.status(401).send(error.message);
    }

});



export default router;