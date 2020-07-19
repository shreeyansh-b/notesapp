import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import { IconContext } from "react-icons";
import {FaPenSquare} from 'react-icons/fa';
import moment from 'moment';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import classes from './NotesViewer.module.scss';

const NotesViewer = (props) => {
    useEffect(() => {
        props.loadSavedNotes();
    },[]);
    return(
        <Container>
            <Row>
                {
                    props.savedNotes.map((note) => {
                        return(
                            <Col lg={6} xl={4} key={note.id} className={"mb-4"}>
                                <Card onClick={() => props.onView(note.id)} >
                                    <Card.Header>{moment(note.date).format('LL')}</Card.Header>
                                    <Card.Body >
                                        <Card.Title className={"text-truncate"} style={{margin: 0, padding: '5px'}}>{note.title}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary" onClick={(e) => {e.stopPropagation(); props.loadCurrentNote(note.id); props.onEdit()}}><IconContext.Provider value={{className: 'react-icons'}}><FaPenSquare /> Edit</IconContext.Provider></Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return({
        savedNotes: state.savedNotes
    });
}
const mapDispatchToProps = (dispatch) => {  
    return{
        loadSavedNotes: () => dispatch({type: actionTypes.LOADSAVEDNOTES}),
        onView: (id) => dispatch({type: actionTypes.VIEWNOTE, noteID: id}),
        loadCurrentNote: (id) => dispatch({type: actionTypes.CURRENTNOTE, noteID: id}),
        onEdit: () => dispatch({type: actionTypes.EDITSTATE})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotesViewer);