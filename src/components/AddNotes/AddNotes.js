import React from 'react';
import {Button} from 'react-bootstrap';
import classes from './AddNotes.module.scss';
import { IconContext } from "react-icons";
import {FaPlusCircle} from 'react-icons/fa';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';

const AddNotes = (props) => {
    return(
        <IconContext.Provider value={{className: 'react-icons'}}>
            <Button className={classes.btnAddNotes} onClick={props.onAddNote}><FaPlusCircle /> Add Note</Button>
        </IconContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return({
    });
}
const mapDispatchToProps = (dispatch) => {  
    return{
        onAddNote: () => dispatch({type: actionTypes.ADDSTATE}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotes);