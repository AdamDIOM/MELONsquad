function MELONsquad(){
    section.innerHTML = "<h1 id=\"sectionHeading\">MELONsquad</h1>"
}

function About(){
    section.innerHTML = "<h1 id=\"sectionHeading\">About</h1>"
}

function TeamMembers(){
    section.innerHTML = `
        <h1 id="sectionHeading">Team Members</h1>
        ${AddImageBox("Assets/Avatar.ico", "Adam Drummond", "MELONsquad Leader. Bringer of melons to MLH. Also loves a game of Chrome Dino!")}
        ${AddImageBox("Assets/blahaj.png", "BLAHAJ", "King of <a href=\"https://blahajgang.lol\">BLAHAJgang</a>, honorary fellow of MELONsquad. We love BLAHAJ!")}
        ${AddImageBox("Assets/ryan.png", "Ryan Swift", "#1 fan of MELONsquad, wishes it was a separate entity to <a href=\"https://blahajgang.lol\">BLAHAJgang</a> (never gonna happen!!)")}
        `
}

function History(){
    section.innerHTML = "<h1 id=\"sectionHeading\">History</h1>"
}

function Art(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Art</h1>"
}

function AddImageBox(source, title, caption){
    string = `
        <div id="wideBox">
            <img src="${source}" id="boxImg">
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `

    return string;
}