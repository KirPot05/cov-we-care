import {db} from "./firebase.js"
import {collection, doc, getDoc, setDoc, updateDoc, onSnapshot, query, orderBy, limit, deleteDoc} from 'firebase/firestore';


// Fetches the data from Firestore with specified Collection Name and DocID 
async function fetchDataSnap(collectionName, docID){
    const data = doc(db, collectionName, docID);

    const docSnap = await getDoc(data);
    return docSnap;
}


// Checks if the data is present in the Collection 
async function checkData(collectionName, docId){
    
    const isDatapresent = await fetchDataSnap(collectionName, docId);
    if(isDatapresent.exists()){
        return true;
    } else{
        return false;
    }
}

// Saves the data in the firestore
async function saveData(collectionName, docId, data){

    const isDataSaved = setDoc(doc(db, collectionName, docId), data).then(() => {return true}).catch(() => {return false});
    return isDataSaved;
}


// Updates the data in Firestore Collection
async function updateData(collectionName, docId, data){

    // Returns true if data updated successfully else false
    const dataUpdated = await updateDoc(doc(db, collectionName, docId), data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });


    return dataUpdated;
}


// Carries out saving out daily Data of the Dashboard
export async function saveDailyData(dataObj){

    try{
        
        const {infectedNum, deceasedNum, activeNum, recoveredNum, date} = dataObj;

        // Date to be in this format while saving
        // date: new Date(Date.now()).toDateString(),

        const isDatapresent = await checkData('dailyCovidData', date)

        // Shows that data is already present in DB
        if(isDatapresent){
            return !isDatapresent;
        }

        else{
            const dataToSave = {   
                infectedNum,
                deceasedNum, 
                activeNum, 
                recoveredNum
            }

            const isDataSaved = await saveData('dailyCovidData', date, dataToSave);

            return isDataSaved;
        }

    } catch(e){
        console.error(e.message);
    }

}



// Get daily Covid Data 
export function getDailyCovidData(){

    try {
        const date = new Date(Date.now()).toDateString();
        const data = onSnapshot(doc(db, 'dailyCovidData', date), (doc) => {
            return doc.data();
        })

    } catch (error) {
        console.error(error)
    }

}


// Books out appointment of users with their respective userID
export async function bookAppointment(formData){
    

    try {
        // Appointments are fixed with userId as their DocID in 'appointments' collection
        const {fullName, gender, phoneNum, birthDate, address, email, prevMedHistory, currAilment, user} = formData;
        
        // Checks if the appointment is already booked by specified user
        const isAppointmentPresent = await checkData('appointments', user);

        if(!isAppointmentPresent){

            const dataToSave = {
                fullName, 
                gender, 
                phoneNum, 
                birthDate,
                address, 
                email, 
                prevMedHistory, 
                currAilment,
                date: new Date(Date.now()).toDateString()
            }

            const isDataSaved = await saveData('appointments', user, dataToSave);
            return isDataSaved;
        }

    } catch (error) {   
        console.error(error.message);
    }

}



// Updating the Daily Covid Data by Admin (Health Center Staff)
export async function updateDailyData(dataToUpdate, user){
    
    try {

        const prevDataSnap = await fetchDataSnap('dailyCovidData', dataToUpdate.date);
        const prevData = prevDataSnap.data();


        // Object which stores the data to be updated in firestore collection
        const dataToSave = {};


        // Checks if the value:
        // 1. Is not NULL
        // 2. Data to be updated is not previously present value
        for(let key in dataToUpdate){
            if(key != 'date' && dataToUpdate[key] != null && dataToUpdate[key] > prevData[key]){
                dataToSave[key] = dataToUpdate[key];
            }
        }

        const dataUpdated = await updateData('dailyCovidData', dataToUpdate.date, dataToSave);
        return dataUpdated;


    } catch (error) {
        console.error(error.message);
    }



}


export function receiveAppointments(user){

    try{
        
        const q = query(collection(db, 'appointments'), orderBy('date', 'desc'), limit(5));
        const appointments = [];
        
        const unsub = onSnapshot(q, (doc) => {
            doc.forEach(element => {
                appointments.push(doc.data());
            });
        });
        
        return appointments;

    }
    
    catch(error){
        console.error(error);
    }


}

export async function cancelAppointment(appointment){

    try {
        
        const appointmentDeleted = deleteDoc(doc(db, 'appointments', appointment.user)).then(() => {
            return true;
        }).catch(() => {
            return false;
        });
        
        return appointmentDeleted;


    } catch (error) {
        
    }

}

// Function to perform retrieval of documents from the collection
function getDocCollection(collectionName, limitNum){

    try {
        const q = query(collection(db, collectionName), limit(limitNum));
        const dataArr = [];
        const unsub = onSnapshot(q, (doc) => {
            doc.forEach((docData) => {
                dataArr.push(docData.data());
            });
        });

        return dataArr;

    } catch (error) {
        console.error(error);
    }
    

    
}


// Returns the regions for Dashboard map 
export function getRegionData(){


    const regions = getDocCollection('regions', 20);
    return regions;

}


// Returns the healthCentres info 
export function getHealthCentreInfo(){

    const healthCentres = getDocCollection('healthCentres', 20);
    return healthCentres;
}

