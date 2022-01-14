import express from "express";
import { signInAdmin, getRegionData } from "../models/db.js";

const router = express.Router();


router.get('/', (req, res) => {

    // For Handling the user being redirected from Invalid SignIN
    if (req.statusCode === 401) {
        
        res.json('Unauthorized Access');

    } else {
        res.render();        
    }
});



// Route to get individual regions data for updating in maps
router.get('/regionData', (req, res) => {
    const data = getRegionData();
    res.send(data);
});




// Route for Admin SignIn
router.post('/signIn', async (req, res) => {

    try {

        const { email, password, healthCentre } = req.body;
        const isValidUser = await signInAdmin(email, password);

        if (isValidUser) {
            res.redirect(200, '/admin');
        } else {
            res.redirect(401, '/');
        }


    } catch (error) {

    }

})

export default router;