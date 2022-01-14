import { db } from "./firebase.js";

export function saveDailyData(dataObj){

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
