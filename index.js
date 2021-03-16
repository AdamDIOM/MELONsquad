function MELONsquad(){
    section.innerHTML = "<h1 id=\"sectionHeading\">MELONsquad</h1>"
}

function About(){
    section.innerHTML = "<h1 id=\"sectionHeading\">About</h1>"
}

async function TeamMembers(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Team</h1>"
    team = await AddImageBoxes("Team", "team");
    console.log(team);
    section.innerHTML += team;
}

function History(){
    section.innerHTML = "<h1 id=\"sectionHeading\">History</h1>"
}

async function Art(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Art</h1>"
    art = await AddImageBoxes("Art", "art");
    console.log(art);
    section.innerHTML += art;
}

function JoinSquad(){
    section.innerHTML = `
    
    <h1 id="sectionHeading">Join the Squad!</h1>
    <div id="instructions">
        <h2>Instructions</h2>
        <ol>
            <li>Click Login</li>
            <li>Log in</li>
            <li>Click Profile</li>
            <li>Scroll to Guild Membership</li>
            <li>Select BLAHAJGang</li>
            <li>Visit the BLAHAJgang Discord Channel</li>
            <li>Add the melon and shark emoji to your nickname</li>
        </ol>
    </div>
    <iframe src="https://discord.mlh.io/profile">
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
        team += AddImageBox(imageDirectory + "/" + json[user].image, json[user].name, json[user].caption);
    }
    //console.log(team);

    return team;
}

function AddImageBox(source, title, caption){
    box = `
        <div id="wideBox">
            <div id="boxImg">
                <img src="Assets/${source}">
            </div>
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `

    return box;
}