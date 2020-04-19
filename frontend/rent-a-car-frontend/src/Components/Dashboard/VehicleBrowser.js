import React from "react";
import {
  MDBInput,
  MDBFormInline,
  MDBDataTable,
  MDBRow,
  MDBTableHead,
  MDBTableBody, 
  MDBModal
} from "mdbreact";
import "../../styles/dashboard.styles.css";
import VehicleCell from '../Dashboard/Cells/VehicleCell'
import DropDown from '../Common/Navigation-Related/DropDownComponent'
import DDFactory from '../Common/Navigation-Related/DropDownItemFactory'

class VehicleBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    console.log(e.target.value)
  }

  render() {
      let temp = [{value : 'Ankit', displayValue : 'Ankit', clicked : this.handleClick}]
        let  items = DDFactory(temp)
    return (
      <div>
        <div className = "list-container">
        <h2 align = {"center"}><b>{this.props.title}</b></h2>
          <div className="md-form my-0 vehicleBox finderBox">
            <input
              class="form-inline d-flex justify-content-center md-form form-sm mt-0"
              type="text"
              placeholder="Search for Vehicles"
              aria-label="Search"
            />
            <div>
            <DropDown items = {items}/>
            </div>
          </div>
          <div>
            {temp.map((m) => {
                return (<VehicleCell />)
            })}
          </div>
        </div>
      </div>
    );
  }
}
// <!-- <MDBDataTable data = {data} noBottomColumns = {true}/> --!>
export default VehicleBrowser;

// const data = {
//     columns: [
//       {
//         label: 'Vehicle',
//         field: 'vehicle',
//         sort: 'asc',
//         width: 150
//       },
//       {
//         label: 'Type',
//         field: 'type',
//         sort: 'asc',
//         width: 270
//       },
//       {
//         label: 'Rent',
//         field: 'rent',
//         sort: 'asc',
//         width: 200
//       }
//     ],
//     rows: [
//       {
//         vehicle: 'Tiger Nixon',
//         type: 'System Architect',
//         rent: 'Edinburgh'
//       }]
// }
