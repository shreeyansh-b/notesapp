import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';

const NavigationBar = (props) => {
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Notes App</Navbar.Brand>
      </Navbar>
    );
}
export default NavigationBar;