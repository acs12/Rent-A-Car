import React from "react";
import {
  MDBCard,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

class DropDown extends React.Component {

  constructor(props){
    super(props)
    this.watchSearchText = this.watchSearchText.bind(this)
  }

  watchSearchText(e){
    e.preventDefault()
    this.props.searchHandler(e.target.value)
  }

  clicked(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <MDBDropdown>
        <MDBDropdownToggle id = {this.props.id} caret>{this.props.title}</MDBDropdownToggle>
        <MDBDropdownMenu>
          <div class="md-form">
            <input
              class="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style = {{margin : 8, overflow : "hidden", width : "80%"}}
              onChange = {this.watchSearchText}
            />
          </div>
          {this.props.items}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}

export default DropDown;

/**<div class="dropdown">
            
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2-1"
              data-toggle="dropdown">Material
              search</button>
          
            <div class="dropdown-menu dropdown-primary" id="your-custom-id-material">
              
              <div class="md-form">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search" />
              </div>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://mdbootstrap.com/">MDB</a>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://mdbootstrap.com/docs/react/">MDB react</a>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://mdbootstrap.com/docs/angular/">MDB angular</a>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://mdbootstrap.com/docs/vue/">MDB vue</a>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://brandflow.net/">BrandFlow</a>
              <a class="dropdown-item mdb-dropdownLink-2" href="https://mdbootstrap.com/education/bootstrap/">MDB
                Rocks</a>
            </div>
          </div> */
