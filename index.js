function MELONsquad(){
    console.log(window.location.href);
    for(c in window.location.href){
        if(window.location.href[c] == '#'){
            console.log(c);
            pos = c;
            break;
        }
    }
    console.log(c);
    ending = window.location.href.substring(c);
    console.log(ending);
    switch(ending.toLowerCase()){
        case "#about":
            About()
            break;
        case "#team":
            TeamMembers();
            break;
        case "#squad":
            TeamMembers();
            break;
        case "#gang":
            TeamMembers();
            break;
        case "#history":
            History();
            break;
        case "#art":
            Art();
            break;
        case "#join":
            JoinSquad();
            break;
        default:    
            section.innerHTML = `
                <h1 id="sectionHeading">MELONsquad</h1>
                <h1>🍉🦈</h1>
                <img src="Assets/BLAHAJ.gif" id="blahaj">`
            break;
    }
}

function About(){
    section.innerHTML = "<h1 id=\"sectionHeading\">About</h1>"
}

async function TeamMembers(){
    section.innerHTML = "<h1 id=\"sectionHeading\">The Squad</h1>"
    team = await AddImageBoxes("Team", "team");
    //console.log(team);
    section.innerHTML += team;
}

async function History(){
    section.innerHTML = `
        <h1 id="sectionHeading">History</h1>
        <h2>It's time to make history by winning Local Hack Day: Share together!</h2>
        `
    hHistory = await HackathonHistory();
    console.log(hHistory);
    section.innerHTML += hHistory;
}

async function Art(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Art</h1>"
    art = await AddImageBoxes("Art", "art");
    //console.log(art);
    section.innerHTML += art;
}

function JoinSquad(){
    section.innerHTML = `
    
    <h1 id="sectionHeading">Join us!</h1>
    <div id="instructions">
        <h2>Instructions</h2>
        <ol>
            <li>Click Login</li>
            <li>Log in</li>
            <li>Click Profile</li>
            <li>Scroll to Guild Membership</li>
            <li>Select BLAHAJGang</li>
            <li>Visit the BLAHAJgang Discord Channel</li>
            <li>Add the melon and shark emoji to your nickname (🍉🦈)</li>
        </ol>
    </div>
    <iframe src="https://discord.mlh.io/profile" SameSite=Strict>
    `;
}

async function AddImageBoxes(imageDirectory, jsonFile){
    const response = await fetch("JSON/" + jsonFile + '.json')
    .then(response => response.json());
    json = response
    //console.log(json);
    team = "";
    for(user in json){
        //console.log(user);
        //console.log(team);
        /*try {
            const image = await fetch("Assets/Team/" + json[user].image);
            imageurl = json[user].image;
        } catch (error) {
            imageurl = "nopic";
        }*/
        if(true){
            console.log("file exists");
            imageurl = json[user].image;
        }
        else{
            imageurl = "nopic";
        }
        
        team += AddImageBox(imageDirectory + "/" + imageurl, json[user].name, json[user].caption);
    }
    //console.log(team);

    return team;
}

function AddImageBox(imageSrc, title, caption){
    
    box = `
        <div id="wideBox">
            <div id="boxImg">
                <img src="Assets/${imageSrc}">
            </div>
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `

    return box;
}

async function HackathonHistory(){
    const response = await fetch("JSON/wins.json")
    .then(response => response.json());
    json = response;
    
    historystring = "";

    for(hacker in json){
        console.log(json[hacker]);
        console.log(json[hacker].hackathons[0].name);
        historystring += `
            <div id="historyOuter">
                <h2>${json[hacker].name}</h2>
            `
            for(hackathon in json[hacker].hackathons){
                historystring += `<a href="${json[hacker].hackathons[hackathon].link}">`;
                historystring += AddImageBox("Hackathons/" + json[hacker].hackathons[hackathon].name + ".png", json[hacker].hackathons[hackathon].name, json[hacker].hackathons[hackathon].prize);
                historystring += `</a>`;
            }
            
            
        historystring += `
            </div>
        `;

        console.log(historystring);
    }
    console.log(historystring);
    return historystring;
    //data we have: name, hackathons [name, prize]



}