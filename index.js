let notes = ["A", "B", "C", "D", "E", "F", "G"];
let getNote1 = () => $("#note1").text();
let getNote2 = () => $("#note2").text();
let setNote1 = (note) => $("#note1").text(note);
let setNote2 = (note) => $("#note2").text(note);
let setNotes = (notes) => {
    setNote1(notes[0]);
    setNote2(notes[1]);
}
let getIntervalSelection = () => parseInt($("#interval").val());
let currentNotes = [];

let flashGreen = () => {
    $("#main").css("background-color","lightgreen");

    setTimeout(() => {
        $("#main").css("background-color","white");
    }, 200);
}

let flashRed = () => {
    $("#main").css("background-color","lightcoral");

    setTimeout(() => {
        $("#main").css("background-color","white");
    }, 200);
}

let getRandomNotes = () => {
    let rand1 = Math.floor(Math.random() * notes.length + 1);
    let rand2 = Math.floor(Math.random() * notes.length + 1);

    while (rand1 - 1 === rand2 - 1) {
        rand2 = Math.floor(Math.random() * notes.length + 1);
    }

    return [notes[rand1 - 1], notes[rand2 - 1]];
}

let getInterval = () => {
    let pos1 = notes.indexOf(getNote1()) + 1;
    let pos2 = notes.indexOf(getNote2()) + 1;

    if (pos2 > pos1){
        return pos2 - pos1 + 1;
    }

    return (8 - pos1) + pos2 ;
}

let getSuffix = (number) => {
    switch (number)
    {
        case 2:
            return "nd"
        case 3:
            return "rd"
        default: 
            return "th"
    }
}

$(document).ready(() => {
    setNotes(getRandomNotes());

    $("#interval").change(() => {
        $("#selection").text(`Your selection: ${$("#interval").val()}`);
        $("#suffix").text(`${getSuffix(getIntervalSelection())}`);
    })

    $("#submit").click(() => {
        if (getIntervalSelection() === getInterval()) {
            flashGreen();
            setNotes(getRandomNotes());
        }
        else {
            flashRed();
        }
        $("#interval").focus();
    });

});