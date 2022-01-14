import express from "express";
import { getRegionData, bookAppointment } from '../models/db.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).sendFile('/index.html');
});


// Route to save the appointment
router.post('/bookAppointment', async (req, res) => {

    try {

        const { firstName, lastName, bDate, contactNum, isFirstVisit, timeSlot, description } = req.body;

        const data = { firstName, lastName, bDate, contactNum, isFirstVisit, timeSlot, description };

        const isBooked = bookAppointment(data);

        if (isBooked) {
            res.json({
                message: "Appointment Booked Successfully",
                isAppointmentPlaced: true
            });
        } else{
            throw Error("Internal Server Error");
        }

    } catch (error) {
        res.status(500).json(error.message);
    }



});


export default router;