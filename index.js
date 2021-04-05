async function MELONsquad(){
    await navBar();
    console.log(window.location.href);
    if(window.location.href.includes("%23")){
        hash = window.location.href.indexOf("%");
        window.location.href = window.location.href.substring(0,hash) + '#' + window.location.href.substring(hash+3);
    }
    //setting pos to a number so high it won't be reached
    pos = 500
    pos = window.location.href.indexOf("#")
    pos2 = window.location.href.lastIndexOf("#");
    /*for(c in window.location.href){
        if(window.location.href[c] == '#' && c < pos){
            console.log(c);
            pos = c;
            break;
        }

    }*/

    console.log(pos);
    if(pos == pos2) {
        ending = window.location.href.substring(pos);
        ChoosePage(ending);
    }
    else{
        ending = window.location.href.substring(pos,pos2);
        text = await ChoosePage(ending);

        if(text == "events"){
            theEvent = window.location.href.substring(pos2 + 1).toLowerCase();
            SelectEvent(theEvent);
        }
        else{
            anchor = window.location.href.substring(pos2 + 1).toLowerCase();
            console.log("second: " + anchor);
            scrollSmoothTo(anchor);
        }

    }
    console.log("ending: " + ending);
    
    

}

function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

async function ChoosePage(ending){
    switch(ending.toLowerCase()){
        case "#about":
            About()
            return "about"
        case "#team":
            await TeamMembers();
            return "squad"
        case "#squad":
            await TeamMembers();
            return "squad"
        case "#gang":
            await TeamMembers();
            return "squad"
        case "#history":
            await History();
            return "history"
        case "#art":
            await Art();
            return "art"
        case "#event":
            await Events();
            return "events"
        case "#events":
            await Events();
            return "events"
        case "#recipes":
            await Recipes();
            return "recipes"
        case "#schedule":
            await Schedule();
            return "schedule"
        case "#join":
            JoinSquad();
            return "join"
        case "#join-us":
            JoinSquad();
            return "join"
        default:    
            MELON();
            break;
    }
}

async function navBar(){
    navList = document.getElementById('list');
    //console.log("list");
    const response = await fetch("JSON/navbar.json")
    .then(response => response.json());
    json = response;
    //console.log(json);


    for(link in json){
        //console.log(link)
        navList.innerHTML += `<a href="#${json[link].link}"><li onclick="${json[link].onclick}">${json[link].text}</li></a>`
    }
    navList.innerHTML += `<li id="audioSwapButton" onclick="AudioSwap()" style="margin-top:2vh;">Play Audio</li>`
}

function AudioSwap(){
    currentText = document.getElementById("audioSwapButton").innerHTML;
    if(currentText == "Pause Audio"){
        document.getElementById("audioSwapButton").innerHTML = "Play Audio";
        document.getElementById("background").pause();
    }
    if(currentText == "Play Audio"){
        document.getElementById("audioSwapButton").innerHTML = "Pause Audio";
        document.getElementById("background").play();
    }
}

function APause(){
    console.log("pause");
    document.getElementById("audioSwapButton").innerHTML = "Play Audio";
    document.getElementById("background").pause();
}
function APlay(){
    console.log("play");
    document.getElementById("audioSwapButton").innerHTML = "Pause Audio";
    document.getElementById("background").play();
}

function MELON(){
    section.innerHTML = `
    <h1 id="sectionHeading">MELONsquad</h1>
    <h1>🍉🦈</h1>
    <img src="Assets/BLAHAJ.gif" id="blahajpic">
    `
}

function About(){
    section.innerHTML = "<h1 id=\"sectionHeading\">About - Coming soon...</h1>"
}

async function TeamMembers(){
    console.log("team");
    section.innerHTML = `
        <h1 id="sectionHeading">The Squad</h1> 
        <audio id="eventMusic" autoplay onplay="APause()" onended="APlay()">
            <source src="Assets/Music/Wow.mp3" Type="audio/mpeg">
        </audio>
    `
    team = await AddImageBoxes("Team", "team");
    section.innerHTML += team;
}

async function History(){
    section.innerHTML = `
        <h1 id="sectionHeading">History</h1>
        <h2>It's time to make history by winning Local Hack Day: Share together!</h2>
        
        <h2>Find below some of the historical hackathon prizes our MELONsquad members have won... this is why we will be the best squad at LHD: Share!</h2>
        `
    hHistory = await HackathonHistory();
    section.innerHTML += hHistory;
}

async function Art(){
    section.innerHTML = `<h1 id=\"sectionHeading\">Art</h1>
        <audio id="asmr" autoplay>
            <source src="Assets/Music/Will ASMR.mp3" type="audio/mpeg">
        </audio>
    `
    art = await AddImageBoxes("Art", "art", true);
    section.innerHTML += art;
}

async function Events(){
    section.innerHTML = `
        <h1 id=\"sectionHeading\">Events</h1>
        <select id="eventSelector" name="event" onchange="ChangeEvent()"></select>
        <div id="eventContent"></div>
    `

    const response = await fetch("JSON/events.json")
    .then(response => response.json());
    events = response;
    console.log(events);

    var select = document.getElementById("eventSelector");
    var option = document.createElement("option");
    option.value = "Default";
    option.id = "default";
    option.innerHTML = "Select an Event";
    select.appendChild(option);
    for(eventOption in events){
        var option = document.createElement("option");
        option.innerHTML = events[eventOption].name;
        option.value = eventOption;
        select.appendChild(option);
    };

}

async function ChangeEvent(){
    document.getElementById("default").disabled = "disabled";
    var eventSection = document.getElementById("eventContent")
    const response = await fetch("JSON/events.json")
    .then(response => response.json());
    events = response;

    console.log(window.location.href)

    pos1 = window.location.href.indexOf("#")
    pos2 = window.location.href.lastIndexOf("#");
console.log(pos1 + ' ' + pos2)
    if(pos1 == pos2){
        window.location.href = window.location.href + '#' + events[document.getElementById("eventSelector").value].name.toLowerCase()[0]
    }
    else{
        window.location.href = window.location.href.substring(0,pos2) + '#' + events[document.getElementById("eventSelector").value].name.toLowerCase()[0];
    }
    

    console.log(document.getElementById("eventSelector").value)
    console.log(events[document.getElementById("eventSelector").value].name)
    eventSection.innerHTML = `
        <h2>${events[document.getElementById("eventSelector").value].name}</h2>
        <p>${events[document.getElementById("eventSelector").value].description}</p>
    `
    if(events[document.getElementById("eventSelector").value].src == "local"){
        console.log("audio")
        eventSection.innerHTML += `
            <audio id="eventMusic" autoplay onplay="APause()" onended="APlay()">
                <source src="Assets/Music/${events[document.getElementById("eventSelector").value].sounds}" type="audio/mpeg">
            </audio>
        `
    }
    else{
        eventSection.innerHTML += `
    <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/${events[document.getElementById("eventSelector").value].sounds}?controls=0&autoplay=1\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen onplay="APause()" onended="APlay()"></iframe>`

    }
    
    
    for(image in events[document.getElementById("eventSelector").value].images){
        console.log(image)
        eventSection.innerHTML += `
        <siv id="outerEventImage">
        <div id="eventImage">
                <a target="_blank" href="Assets/Graphics/${events[document.getElementById("eventSelector").value].name}/${events[document.getElementById("eventSelector").value].images[image]}.png">    
                
                    <img src="Assets/Graphics/${events[document.getElementById("eventSelector").value].name}/${events[document.getElementById("eventSelector").value].images[image]}.png">
               
            </a>

            </div>
            </div>
        `
    }
}

function SelectEvent(theEvent){
    console.log(theEvent);
    var select = document.getElementById("eventSelector");
    console.log("before switchin")
    console.log(theEvent.toLowerCase()[0])
    switch(theEvent.toLowerCase()[0]){
        case 'a':
            console.log("asmr")
            select.selectedIndex = 1;
            break;
        case 'b':
            console.log("bake")
            select.selectedIndex = 2;
            break;
        case 'e':
            console.log("espresso")
            select.selectedIndex = 3;
            break;
        case 'k':
            console.log("karaoke")
            select.selectedIndex = 4;
            break;
        case 'v':
            console.log("pizza")
            select.selectedIndex = 5;
            break;
    }
    ChangeEvent();
}

async function Recipes(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Recipes</h1>"
    const response = await fetch("JSON/recipes.json")
    .then(response => response.json());
    json = response
    console.log(json.mlb.name);
    recipeString = "<ol>"
    for(s in json.mlb.steps){
        console.log(json.mlb.steps[s]);
        recipeString += "<li>"
        recipeString += json.mlb.steps[s];
        recipeString += "</li>"
    }
    recipeString += "</ol>"
    section.innerHTML += recipeString;
}

// created by Ayush
async function Schedule() {
    console.log("schedule");
    section.innerHTML = "<h1 id=\"sectionHeading\">LHD Share Schedule - Coming soon...</h1>"
    section.innerHTML = "";
    hHistory = await innerSchedule();
    section.innerHTML += hHistory;
}
  
async function innerSchedule() {
    const response = await fetch("JSON/schedule.json")
    .then((response) => response.json());
    json = response;
  
    historystring = "";
  
    for (hacker in json) {
        historystring += `
                <div id="historyOuter">
                    <h2>${json[hacker].name}</h2>
                `;
      for (hackathon in json[hacker].hackathons) {
        historystring += `<a href="${json[hacker].hackathons[hackathon].link}" target="_blank" id="noformat">`;
  
        historystring += AddImageBox(
          "Graphics/LHD.png",
          json[hacker].hackathons[hackathon].name,
          json[hacker].hackathons[hackathon].prize
        );
        historystring += `</a>`;
      }
  
      historystring += `</div>`;
      //console.log(historystring);
    }
    //console.log(historystring);
    return historystring;
  }

function JoinSquad(){
    section.innerHTML = `
    <h1 id="sectionHeading">Join us!</h1>
    <div>
        <h2>Instructions</h2>
        <ol>
            <li>Visit <a href="https://discord.mlh.io" target="_blank">discord.mlh.io</a>
            <li>Click Sign in with Discord</li>
            <li>Log in</li>
            <li>Click Edit Profile</li>
            <li>Scroll to Guild Membership</li>
            <li>Select guild BLAHAJGang</li>
            <li>Visit the BLAHAJgang Discord Channel</li>
            <li>Add the melon and shark emoji to your nickname (🍉🦈)</li>
            <li>Optional - ask to be added to the <a href="#squad" target="_blank">website</a></li>
        </ol>
    </div>
    `;
}

async function News(){
    console.log("news");
    section.innerHTML = "<h1 id=\"sectionHeading\">MELONsquad & BLAHAJgang in the News - Coming soon...</h1>"
}

async function AddImageBoxes(imageDirectory, jsonFile, link = false){
    const response = await fetch("JSON/" + jsonFile + '.json')
    .then(response => response.json());
    json = response
    team = "";
    for(user in json){
        if(!Array.isArray(json[user].image)){
            imageurl = json[user].image;
        } else {
            //console.log(json[user].image.length);
            imgNum = Math.floor(Math.random() * (json[user].image.length));
            console.log(imgNum);
            imageurl = json[user].image[imgNum];
        }
        team += AddImageBox(imageDirectory + "/" + imageurl, json[user].name, json[user].caption, user, link);
    }

    return team;
}

function AddImageBox(imageSrc, title, caption, user, link){
    box = "";
    if(link){
        box += `<a id="noformat" href="Assets/${imageSrc}" target="_blank">`
    }
    box += `
        <div class="wideBox" id="${user}">
            <div id="boxImg">
                <img src="Assets/${imageSrc}">
            </div>
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `
    if(link){
        box += `</a>`
    }

    return box;
}

async function HackathonHistory(){
    const response = await fetch("JSON/wins.json")
    .then(response => response.json());
    json = response;
    
    historystring = "";

    for(hacker in json){
        //console.log(json[hacker]);
        //console.log(json[hacker].hackathons[0].name);
        historystring += `
            <div id="historyOuter">
                <h2>${json[hacker].name}</h2>
            `
            for(hackathon in json[hacker].hackathons){
                historystring += `<a href="${json[hacker].hackathons[hackathon].link}" target="_blank" id="noformat">`;
                historystring += AddImageBox("Hackathons/" + json[hacker].hackathons[hackathon].name + ".png", json[hacker].hackathons[hackathon].name, json[hacker].hackathons[hackathon].prize);
                historystring += `</a>`;
            }
            
        historystring += `</div>`;
        //console.log(historystring);
    }
    //console.log(historystring);
    return historystring;
}



function Links(){
    
}