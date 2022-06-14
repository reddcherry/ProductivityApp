import {  useState } from "react";
import React from "react";

const AuthContext = React.createContext({
 idToken:'',
logInFn:()=>{},
logOutFn:()=>{}
})

export default AuthContext



export const AuthProvider = props=>{
const [idToken, setIdToken]= useState('abc')

 const logInFn=async (email, password, userWantsSignin)=>{
const KEY = "AIzaSyCR3Dl9QN8gQlfO5tdmxhvzIW4D81dm3uk";
const url = userWantsSignin
  ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`
  : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;

 try {const resp = await fetch(url, {
  method:'POST',
  body: JSON.stringify({
 email,
 password,
 returnSecureToken:true
  }),
headers:{
 'content-type' :'application/json'
}
 })

 const data = await resp.json();
 const respId = data ? data.idToken : '';
 setIdToken(respId)
 if(data.error){
  throw new Error(data.error.message)
 } 
}
 catch(err){
  alert(err);
 }
} 
const logOutFn=()=>{
 
}

const AuthObject = {
  idToken:idToken,
  logInFn,
  logOutFn,
};

console.log(idToken);
 return <AuthContext.Provider value={AuthObject}>
  {props.children}
 </AuthContext.Provider>
}