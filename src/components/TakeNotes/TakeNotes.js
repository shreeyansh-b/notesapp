import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import Calendar from 'react-calendar';
import { IconContext } from "react-icons";
import {FaCheckCircle} from 'react-icons/fa';
import {FaTimesCircle} from 'react-icons/fa';
import classes from './TakeNotes.module.scss';
import moment from 'moment';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';


const TakeNotes = (props) => {
    const [date, dateSelectorHandler] = useState(null);
    const [title, titleUpdateHandler] = useState('');
    const [description, descriptionUpdateHandler] = useState('');
    const [dateError, dateErrorSelectorHandler] = useState(null);
    const [titleError, titleErrorSelectorHandler] = useState(null);
    let reEmptyString = /^(?!\s*$).+/;
    const addDataToNoteHandler = () => {
        if(reEmptyString.test(title)  && date !== null){
            props.onTakeNote(date, title, description);
            props.loadSavedNotes();
            props.onDiscardNote();
        }
        if(date === null){
            dateErrorSelectorHandler('text-danger');
        }
        if(!reEmptyString.test(title)){
            titleErrorSelectorHandler('is-invalid');
        }
    }
    return(
        <Card style={{maxWidth: '450px'}} >
            <Card.Header className={classes.cardHeader}>
                <h3>Add Note</h3>
                <Button variant="danger" className={classes.button} onClick={props.onDiscardNote}><IconContext.Provider value={{className: 'react-icons'}}><FaTimesCircle /></IconContext.Provider></Button>
                </Card.Header>
            <Card.Body className={classes.cardBody}>
                <Calendar onChange={(date) => dateSelectorHandler(date)} className={"mb-3"} />
                <Card.Text className={[classes.cardDate, "mb-3"].join(' ')} >
                    {
                        date ? moment(date).format('LL') : <span className={dateError}>Select Date</span>
                    }
                </Card.Text>
                <Card.Title className={"mb-3"} ><input type="text" placeholder="Note Title" onChange={(e) => titleUpdateHandler(e.target.value)} style={{margin: '0 auto'}} className={[classes.cardTitle, "form-control", titleError].join(' ')}></input></Card.Title>
                <Card.Text className={"mb-3"}>
                    <textarea placeholder="Description" className={[classes.cardDesc, "form-control"].join(' ')} onChange={(e) => descriptionUpdateHandler(e.target.value)}  style={{margin: '0 auto'}}></textarea>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="success"className={classes.button} onClick={addDataToNoteHandler} ><IconContext.Provider value={{className: 'react-icons'}}><FaCheckCircle /></IconContext.Provider></Button>
            </Card.Footer>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return({
    });
}
const mapDispatchToProps = (dispatch) => {  
    return{
        onTakeNote: (date, title, description) => dispatch({type: actionTypes.ADDNOTE, date, title, description}),
        loadSavedNotes: () => dispatch({type: actionTypes.LOADSAVEDNOTES}),
        onDiscardNote: () => dispatch({type: actionTypes.DISCARD})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TakeNotes);