import React from 'react';
import '../../styles/modal.styles.css'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen : this.props.show}
    this.toggle = this.toggle.bind(this)
  }

  toggle(e) {
    this.setState({isOpen : false})
  }

  render() {
    return (
        <MDBContainer>
          <MDBModal isOpen={this.state.isOpen} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>{this.props.title}</MDBModalHeader>
            <MDBModalBody>
              {this.props.children}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
              <MDBBtn color="primary">Return Car</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
        );
  }
}

export default Popup;
