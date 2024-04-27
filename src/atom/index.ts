import { atom } from "recoil";


export const Authenticated = atom({
    key: "Authenticated",
    default: false  
}); 


export const Admin = atom({
    key : "Admin",
    default : {}
})