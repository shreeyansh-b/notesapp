import React, {useState, useEffect} from 'react';
import { Button, Modal} from 'react-bootstrap';
import moment from 'moment';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import classes from './NoteModal.module.scss';

const NoteModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const editHandler = () => {
        props.onClose();
        props.onEdit();
    }
    return(
        <React.Fragment>
            <Modal show={props.viewState} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"h5"}>{props.note? moment(props.note.date).format('LL') : null}</Modal.Title>
            </Modal.Header>
            <Modal.Title style={{textAlign: 'center'}}>{props.note? props.note.title : null}</Modal.Title>
            <Modal.Body>{props.note? props.note.description : null}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {props.onDelete(props.note.id); props.onClose(); props.loadSavedNotes(); }}>
                Delete
                </Button>
                <Button variant="secondary"  onClick={editHandler}>
                Edit
                </Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return({
        viewState: state.viewState,
        editState: state.editState,
        note: state.currentNote
    });
}
const mapDispatchToProps = (dispatch) => {  
    return{
        onClose: () => dispatch({type: actionTypes.DISCARD}),
        onEdit: () => dispatch({type: actionTypes.EDITSTATE}),
        onDelete: (id) => dispatch({type: actionTypes.DELETENOTE, noteID: id}),
        loadSavedNotes: () => dispatch({type: actionTypes.LOADSAVEDNOTES}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);