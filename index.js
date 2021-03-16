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
            <img src="Assets/${source}" id="boxImg">
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `

    return box;
}