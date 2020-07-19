import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import {connect} from 'react-redux';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import classes from './App.module.scss';
import * as actionTypes from './store/actions/actionTypes';


import NavigationBar from './components/NavigationBar/NavigationBar';
import AddNotes from './components/AddNotes/AddNotes';
import TakeNotes from './components/TakeNotes/TakeNotes';
import NotesViewer from './components/NotesViewer/NotesViewer';
import NoteModal from './components/NoteModal/NoteModal';
import EditModal from './components/NoteModal/EditModal';

function App(props) {
  useEffect(() => {
    props.loadSavedNotes();
  },[]);
  return (
    <div className="App">
      <NavigationBar />
      <Container className={classes.container}>
        <Row>
          <Col md={6} className={classes.leftpane}>
            {
              props.addState ? <TakeNotes /> : <AddNotes />
            }
          </Col>
          <Col md={6} className={classes.rightpane}>
            {
              props.savedNotes.length ? <NotesViewer /> : <h1>Notes Appear Here</h1>
            }
            
          </Col>
        </Row>
      </Container>
      <NoteModal />
      <EditModal />
    </div>
  );
}
const mapStateToProps = (state) => {
  return({
    addState: state.addState,
    savedNotes: state.savedNotes
  });
}
const mapDispatchToProps = (dispatch) => {  
  return{
      loadSavedNotes: () => dispatch({type: actionTypes.LOADSAVEDNOTES})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
