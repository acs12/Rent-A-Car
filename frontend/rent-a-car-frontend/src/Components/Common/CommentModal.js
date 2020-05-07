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
          <MDBModal isOpen={true} >
            <MDBModalHeader >{this.props.title}</MDBModalHeader>
            <MDBModalBody>
              {this.props.children}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.props.onClose}>{this.props.closeTitle}</MDBBtn>
              <MDBBtn color="primary" onClick={this.props.onSubmit}>{this.props.submitTitle}</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
        );
  }
}

export default Popup;
