// Countdown function and variables
const weddingDay = new Date("May 23, 2025 18:00:00");

function countdown(targetDate) {
  setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate.getTime() - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / (1000));

    document.querySelector(".countdown").innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    if (timeLeft < 0) {
      clearInterval(x);
      document.querySelector(".countdown").innerHTML = "00:00:00";
    }
  }, 1000);
};

// Burger menu function and variables
const burger = document.querySelector(".burger");
const off = document.querySelector(".off-screen");

function click(event, element) {
  event.addEventListener("click", () => {
    if(event) {
      element.classList.toggle("active");
    }
  });
}


// RSVP add guest function and variables
const addGuest = document.getElementById("addGuest");
const inputAlert = document.querySelector(".input-alert");
const removeGuest = document.getElementById("removeGuest");


function addGuests(alert, addButton, removeButton) {
  // Guest Counter
  let i = 1;

  addButton.addEventListener("click", () => {
    // Input validation
    if(!document.getElementById(`firstName_${i}`).value) {
      return alert.style.display = "block";
    }
    if(!document.getElementById(`lastName_${i}`).value) {
      return alert.style.display = "block";
    }
    if(document.getElementById(`firstName_${i}`).value && document.getElementById(`lastName_${i}`).value) {
      alert.style.display = "none";
    }
    // Event button functionality
    if(addButton && i < 2) {
      // Create div
      const newGuestContainer = document.createElement("div");
      newGuestContainer.setAttribute("id", `guest_${i + 1}`);
      newGuestContainer.setAttribute("class", "guests");
      const currentGuestContainer = document.getElementById(`guest_${i}`);

      // Create label
      const newGuestlabel = document.createElement("label");
      newGuestlabel.setAttribute("for", `firstName_${i}`);
      newGuestlabel.textContent = `Guest #${i + 1}`;
  
      // Create first name input and last name input
      const firstNameInput = document.createElement("input");
      firstNameInput.setAttribute("name", `firstName_${i + 1}`);
      firstNameInput.setAttribute("id", `firstName_${i + 1}`);
      firstNameInput.setAttribute("class", `guest_${i + 1}`);
      firstNameInput.setAttribute("placeholder", "First Name");
      firstNameInput.setAttribute("autocomplete", "on");
      firstNameInput.setAttribute("type", "text");
      firstNameInput.required = true;
  
      const lastNameInput = document.createElement("input");
      lastNameInput.setAttribute("name", `lastName_${i + 1}`);
      lastNameInput.setAttribute("id", `lastName_${i + 1}`);
      lastNameInput.setAttribute("class", `guest_${i + 1}`);
      lastNameInput.setAttribute("placeholder", "Last Name");
      lastNameInput.setAttribute("autocomplete", "off");
      lastNameInput.setAttribute("type", "text");
      lastNameInput.required = true;

      // Create new guest div
      newGuestContainer.appendChild(newGuestlabel);
      newGuestContainer.appendChild(firstNameInput);
      newGuestContainer.appendChild(lastNameInput)

      // Place new div after current div
      currentGuestContainer.after(newGuestContainer);
  
        i++;
    } else {
      return null;
    }
  });

  // Remove guest button
  removeButton.addEventListener("click", () => {
    const lastdiv = alert.previousElementSibling;

    // Event button functionality
    if(removeButton) {
      if( lastdiv != document.getElementById("guest_1")) {
        lastdiv.remove()
        i--;
      }
    }
  });

};


// Get data and send data to server side
async function getData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()
    return responseData;
    
  } catch(error) {
    console.error("There was an error sending the data:", error)
    throw error;
  }
}


// Function to use event listener to send data to server side 
const form = document.querySelector("form.rsvp");
const rsvpURL = "/rsvp"

function sendData(form, url) {
  form.addEventListener("submit", (event) => {
    
    // Prevent default action 
    event.preventDefault();

    // Gather data from the form 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    getData(url, data) 
      .then(result => {
        console.log("Success:", result)
      })
      .catch(error => {
        console.error("Error during data sending:", error)
      })

      // Client-side redirect
      window.location.replace('/rsvp/thank_you');
    })
  }
  
  
  // Function calls
  countdown(weddingDay);
  click(burger, off);
  addGuests(inputAlert, addGuest, removeGuest);
  sendData(form, rsvpURL);
