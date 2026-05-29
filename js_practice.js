console.log("Welcome to the Community Portal");

window.onload = () =>{
    alert("Page Loaded");
};

const eventName = "Music Night";
const eventDate = "10-06-2026";

let seats = 5;

console.log(`Event: ${eventName} Date: ${eventDate}`);

seats--;

let events = [
{
    name:"Music Night",
    category:"Music",
    seats:5,
    date:"2026-06-10"
},
{
    name:"Baking Workshop",
    category:"Workshop",
    seats:10,
    date:"2026-06-20"
},
{
    name:"Old Event",
    category:"Music",
    seats:0,
    date:"2020-01-01"
}
];

events.forEach(event=>{

    if(event.seats>0 &&
       new Date(event.date) > new Date()){

        console.log(event.name);
    }

});

function addEvent(event){

    events.push(event);

}

function registerUser(event){

    try{

        if(event.seats<=0){
            throw "No Seats Available";
        }

        event.seats--;

        renderEvents();

    }

    catch(error){

        alert(error);

    }

}

function filterEventsByCategory(category,callback){

    let result = events.filter(
        event => event.category===category
    );

    callback(result);

}

function registrationCounter(){

    let count = 0;

    return function(){

        count++;

        return count;

    };

}

const musicCount = registrationCounter();

class Event{

    constructor(name,seats){

        this.name=name;
        this.seats=seats;

    }

}

Event.prototype.checkAvailability=function(){

    return this.seats>0;

};

let sampleEvent = new Event(
    "Dance Show",
    20
);

console.log(
    Object.entries(sampleEvent)
);

addEvent({
    name:"Dance Show",
    category:"Music",
    seats:20,
    date:"2026-07-10"
});

let musicEvents = events.filter(
    event => event.category==="Music"
);

console.log(musicEvents);

let displayNames = events.map(
    event => `Workshop on ${event.name}`
);

console.log(displayNames);

const container =
document.querySelector("#eventsContainer");

function renderEvents(){

    container.innerHTML="";

    events.forEach(event=>{

        if(event.seats<=0){
            return;
        }

        let card =
        document.createElement("div");

        card.className="eventCard";

        card.innerHTML=`
        <h3>${event.name}</h3>
        <p>${event.category}</p>
        <p>Seats: ${event.seats}</p>
        <button onclick="registerUser(events.find(e=>e.name==='${event.name}'))">
        Register
        </button>
        `;

        container.appendChild(card);

    });

}

renderEvents();

document
.querySelector("#categoryFilter")
.onchange=function(){

    let category=this.value;

    if(category==="All"){

        renderEvents();

        return;
    }

    filterEventsByCategory(
        category,
        result=>{

            container.innerHTML="";

            result.forEach(event=>{

                let card =
                document.createElement("div");

                card.className="eventCard";

                card.innerHTML=
                event.name;

                container.appendChild(card);

            });

        }
    );

};

document
.querySelector("#searchBox")
.addEventListener(
"keydown",
function(){

    console.log(
        this.value
    );

});

function fetchEventsPromise(){

    document
    .getElementById("loading")
    .style.display="block";

    fetch(
    "https://jsonplaceholder.typicode.com/posts"
    )

    .then(response=>response.json())

    .then(data=>{

        console.log(data);

    })

    .catch(error=>{

        console.log(error);

    })

    .finally(()=>{

        document
        .getElementById("loading")
        .style.display="none";

    });

}

fetchEventsPromise();

async function fetchEventsAsync(){

    try{

        let response =
        await fetch(
        "https://jsonplaceholder.typicode.com/posts"
        );

        let data =
        await response.json();

        console.log(data);

    }

    catch(error){

        console.log(error);

    }

}

fetchEventsAsync();

const {
name:firstName,
category:firstCategory
} = events[0];

console.log(
firstName,
firstCategory
);

let copiedEvents = [...events];

console.log(copiedEvents);

document
.getElementById("registerForm")
.addEventListener(
"submit",
function(event){

event.preventDefault();

console.log(
"Form Submitted"
);

let name =
this.elements["name"].value;

let email =
this.elements["email"].value;

let selectedEvent =
this.elements["event"].value;

document
.getElementById("nameError")
.innerHTML="";

document
.getElementById("emailError")
.innerHTML="";

let valid=true;

if(name===""){

document
.getElementById("nameError")
.innerHTML="Name Required";

valid=false;

}

if(email===""){

document
.getElementById("emailError")
.innerHTML="Email Required";

valid=false;

}

if(!valid){
return;
}

console.log(
{
name,
email,
selectedEvent
}
);

setTimeout(()=>{

fetch(
"https://jsonplaceholder.typicode.com/posts",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
name,
email,
selectedEvent
})

}
)

.then(response=>response.json())

.then(data=>{

console.log(data);

document
.getElementById("message")
.innerHTML=
"Registration Successful";

})

.catch(()=>{

document
.getElementById("message")
.innerHTML=
"Registration Failed";

});

},2000);

});

$("#registerBtn").click(function(){

$(".eventCard").fadeOut(
1000,
function(){

$(".eventCard").fadeIn(1000);

});

});

function greetUser(
name="Guest"
){

console.log(
`Hello ${name}`
);

}

greetUser();