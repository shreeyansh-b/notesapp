import * as actionTypes from '../actions/actionTypes';

/*
    schema of a note
    {
        id,
        date,
        title,
        description
    }
*/


const initialState = {
    savedNotes: [], //array of objects, to be loaded from localstorage
    currentNote: null, //object, the note which is in modal
    addState: false, //boolean, when the note is being added,
    viewState: false, //boolean, when the note is being viewed in the modal
    editState: false, //boolean, when the note is being edited/deleted in modal
}
const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.LOADSAVEDNOTES){
        const savedNotes = JSON.parse(localStorage.getItem('saved-notes')) ? JSON.parse(localStorage.getItem('saved-notes')) : [];
        return{
            ...state,
            savedNotes
        }
    }
    if(action.type === actionTypes.ADDNOTE){
        const newNote = {
            noteID: getNoteID(state),
            date: action.date,
            title: action.title,
            description: action.description
        };
        saveNoteLocally(newNote);
        return{
            ...state,
            addState: false
        }
    }
    if(action.type === actionTypes.VIEWNOTE){
        return{
            ...state,
            currentNote: loadCurrentNote(action.noteID, state),
            viewState: true
        }
    }
    if(action.type === actionTypes.EDITNOTE){
        const editedNote = {
            date: action.date,
            title: action.title,
            description: action.description
        };
        saveEditedNoteLocally(action.noteID, editedNote);
        return{
            ...state,
            editState: false
        }
    }
    if(action.type === actionTypes.DELETENOTE){
        deleteNoteLocally(action.noteID);
        return{
            ...state,
            editState: false
        }
    }
    if(action.type === actionTypes.DISCARD){
        return{
            ...state,
            addState: false,
            viewState: false,
            editState: false
        }
    }
    if(action.type === actionTypes.ADDSTATE){
        return{
            ...state,
            addState: true
        }
    }
    if(action.type === actionTypes.EDITSTATE){
        return{
            ...state,
            editState: true
        }
    }
    if(action.type === actionTypes.CURRENTNOTE){
        return{
            ...state,
            currentNote: loadCurrentNote(action.noteID, state)
        } 
    }
    return state;   //very important

}

const getNoteID = (state) => {
    if(state.savedNotes.length === 0){
        return 0;
    }else{
        return state.savedNotes[state.savedNotes.length - 1].id + 1;
    }
}

const loadCurrentNote = (noteID, state) => {
    let foundNote = null;
    state.savedNotes.forEach((note) => {
        if(note.id === noteID){
            foundNote = note;
        }
    })
    return foundNote;
}
const saveNoteLocally = (note) => {
    const savedNotes = JSON.parse(localStorage.getItem('saved-notes')) ? JSON.parse(localStorage.getItem('saved-notes')) : [];
    let newNote = {
        id: note.noteID,
        date: note.date,
        title: note.title,
        description: note.description
    };
    savedNotes.push(newNote);
    localStorage.setItem('saved-notes', JSON.stringify(savedNotes));
}
const saveEditedNoteLocally = (noteID, editednote) => {
    const savedNotes = JSON.parse(localStorage.getItem('saved-notes')) ? JSON.parse(localStorage.getItem('saved-notes')) : [];
    savedNotes.forEach((note) => {
        if(note.id === noteID){
            note.id = noteID;
            note.title = editednote.title;
            note.description = editednote.description;
            note.date = editednote.date;
        }
    })
    localStorage.setItem('saved-notes', JSON.stringify(savedNotes));
}
const deleteNoteLocally = (noteID) => {
    const savedNotes = JSON.parse(localStorage.getItem('saved-notes'));
    const newNotes = savedNotes.filter((note) => {
        if(note.id !== noteID){
            return note;
        }
    })
    localStorage.setItem('saved-notes', JSON.stringify(newNotes));
}



export default reducer;