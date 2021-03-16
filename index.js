function update(){
    console.log("updating...");
    for(i = 0; i < 9; i++){
        document.getElementById(i).innerHTML = document.getElementById(`input${i}`).value;
    }
}