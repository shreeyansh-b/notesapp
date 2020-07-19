import React, {useState, useEffect} from 'react';
import { Button, Modal} from 'react-bootstrap';
import moment from 'moment';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import classes from './EditModal.module.scss';

const EditModal = (props) => {
    const [date, dateSelectorHandler] = useState(null);
    const [title, titleUpdateHandler] = useState('');
    const [description, descriptionUpdateHandler] = useState('');
    const [titleError, titleErrorSelectorHandler] = useState(null);
    let reEmptyString = /^(?!\s*$).+/;
    const addDataToNoteHandler = () => {
        if(reEmptyString.test(title)  && date !== null){
            props.onEditNote(date, title, description, props.note.id);
            props.loadSavedNotes();
        }
        if(!reEmptyString.test(title)){
            titleErrorSelectorHandler('is-invalid');
        }
    }
    useEffect(() => {
        dateSelectorHandler(props.note? new Date(props.note.date) : null);
        titleUpdateHandler(props.note? props.note.title: '');
        descriptionUpdateHandler(props.note? props.note.description: '');
        return (() => {
            titleErrorSelectorHandler(null); //to clear the is-invalid class when component unmounts
        })
    },[props.editState])
    return(
        <React.Fragment>
            <Modal show={props.editState} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={classes.modalHeaderTitle}>Edit Note</Modal.Title>
            </Modal.Header>
            <Calendar className={["mx-auto", "mb-2"].join(" ")} onChange={(date) => dateSelectorHandler(date)} defaultValue={props.note? new Date(props.note.date) : null}/>
            <Modal.Title className={[classes.modalTitle, "h5"].join(' ')}><input type="text" onChange={(e) => titleUpdateHandler(e.target.value)} value={title} style={{margin: '0 auto'}} className={[classes.modalTitle, "form-control", titleError].join(' ')} placeholder={titleError? 'Enter a title' : null} ></input></Modal.Title>
            <Modal.Body className={classes.modalBody}><textarea className={[classes.modalTextArea, 'form-control'].join(' ')} onChange={(e) => descriptionUpdateHandler(e.target.value)} value={description} ></textarea></Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onClose}>
                Discard
                </Button>
                <Button variant="success"  onClick={addDataToNoteHandler}>
                Save
                </Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return({
        editState: state.editState,
        note: state.currentNote
    });
}
const mapDispatchToProps = (dispatch) => {  
    return{
        onClose: () => dispatch({type: actionTypes.DISCARD}),
        onEditNote: (date, title, description, noteID) => dispatch({type: actionTypes.EDITNOTE, date, title, description, noteID }),
        loadSavedNotes: () => dispatch({type: actionTypes.LOADSAVEDNOTES}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);