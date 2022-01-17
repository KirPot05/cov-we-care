import {db} from "./firebase.js"
import {collection, addDoc, doc, getDoc, Timestamp, setDoc} from 'firebase/firestore'


// Carries out saving out daily Data of the Dashboard
export async function saveDailyData(dataObj){

    try{
        
        const {infectedNum, deceasedNum, activeNum, recoveredNum, date} = dataObj;

        // Date to be in this format while saving
        // date: new Date(Date.now()).toDateString(),

        const data = doc(db, 'dailyCovidData', date);   
        const isDatapresent = await getDoc(data);


        if(isDatapresent.exists()){
            return false;
        }

        else{
            const dataToSave = {   
                infectedNum,
                deceasedNum, 
                activeNum, 
                recoveredNum
            }

            const isDataSaved = setDoc(doc(db, 'dailyCovidData', date.toString()), dataToSave).then(() => {return true}).catch(() => {return false});

            if(isDataSaved != null){
                return true;
            }
        }

    } catch(e){
        console.error(e.message);
    }

}

export async function bookAppointment(formData){
    return true;
}

export function updateDailyData(data, user){
    return true;
}

export function receiveAppointments(user){

}

export function cancelAppointment(appointments){

}

export function getRegionData(){

    // Test Data
    return [
        {
            region: "India",
            cases: 290002
        },

        {
            region: "USA",
            cases: 21000012
        },

        {
            region: "France",
            cases: 190345
        },
    ]
}


export async function signInAdmin(email, password){

}

