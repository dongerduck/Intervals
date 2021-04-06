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
let note1Lock = false;
let note2Lock = false;
let streak = 0;

const setStreak = (newStreak) => {
    streak = newStreak;
    $("#streak").text(`Streak: ${streak}`);
}

const flash = (colour) => {
    $("#main").css("background-color", colour);

    setTimeout(() => {
        $("#main").css("background-color","white");
    }, 200);
}

const getRandomNotes = () => {
    let note1 = note1Lock ? notes.indexOf(getNote1()) + 1 : Math.floor(Math.random() * notes.length + 1);
    let note2 = note2Lock ? notes.indexOf(getNote2()) + 1 : Math.floor(Math.random() * notes.length + 1);

    while (note1 - 1 === note2 - 1) { 
        note1 = note1Lock ? notes.indexOf(getNote1()) + 1 : Math.floor(Math.random() * notes.length + 1);
        note2 = note2Lock ? notes.indexOf(getNote2()) + 1 : Math.floor(Math.random() * notes.length + 1);
    }

    return [notes[note1 - 1], notes[note2 - 1]];
}

const getInterval = () => {
    let pos1 = notes.indexOf(getNote1()) + 1;
    let pos2 = notes.indexOf(getNote2()) + 1;

    if (pos2 > pos1){
        return pos2 - pos1 + 1;
    }

    return (8 - pos1) + pos2 ;
}

const getSuffix = (number) => {
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

const toggleLock = (lock) => {
    let isLock1 = lock === "lock1";
    let status = isLock1 ? !note1Lock : !note2Lock;
    let lockElement = isLock1 ? $("#lock1") : $("#lock2");

    if (status) {
        isLock1 ? note1Lock = true : note2Lock = true;
        lockElement.removeClass("btn-outline-danger");
        lockElement.addClass("btn-danger");
        lockElement.text("Locked");
        return;
    }

    isLock1 ? note1Lock = false : note2Lock = false;
    lockElement.addClass("btn-outline-danger");
    lockElement.removeClass("btn-danger");
    lockElement.text("Unlocked");
}

$(document).ready(() => {
    setNotes(getRandomNotes());

    $("#interval").change(() => {
        $("#selection").text(`Your selection: ${$("#interval").val()}`);
        $("#suffix").text(`${getSuffix(getIntervalSelection())}`);
    });

    $("#lock1").click(() => {
        toggleLock("lock1");
    });

    $("#lock2").click(() => {
        toggleLock("lock2");
    });

    $("#submit").click(() => {
        if (getIntervalSelection() === getInterval()) {
            flash("lightgreen");
            setNotes(getRandomNotes());
            setStreak(streak + 1)
        }
        else {
            flash("lightcoral");
            setStreak(0)
        }
        $("#interval").focus();
    });

});