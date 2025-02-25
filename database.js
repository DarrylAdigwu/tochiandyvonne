import {rsvp, tradRsvp} from "./models/reservations.js";

// Function to add new RSVP to database
export async function newRSVP(first_name, last_name) {
  
  //Function to captialize first letter in both names
  function upper(name) {

    const capName = 
      name.charAt(0).toUpperCase()
      + name.slice(1);

    // trim method to remove potential blank spaces in string
    return capName.trim();
  }

  const newFirstName = upper(first_name);
  const newLastName = upper(last_name);

  try {
    const reserve = await rsvp.create({ 
      firstName: newFirstName, 
      lastName: newLastName,
    });
    
  } catch (e) {
    console.log(e.message);
  }
}

// Function to add new tradRSVP to database
export async function newTradRSVP(first_name, last_name) {
  
  //Function to captialize first letter in both names
  function upper(name) {

    const capName = 
      name.charAt(0).toUpperCase()
      + name.slice(1);

    // trim method to remove potential blank spaces in string
    return capName.trim();
  }

  const newFirstName = upper(first_name);
  const newLastName = upper(last_name);

  try {
    const reserve = await tradRsvp.create({ 
      firstName: newFirstName, 
      lastName: newLastName,
    });
    
  } catch (e) {
    console.log(e.message);
  }
}

