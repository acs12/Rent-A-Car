import React from 'react'
import Navigationbar from '../Common/Navigation-Related/Navigation'
import LocationBrowser from '../Dashboard/LocationBrowser'
import ItemFactory from '../Common/Navigation-Related/NavItemFactory'
import "../../styles/dashboard.styles.css";
import { fetchLocations } from "../../redux/actions/fetchAction";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import Pagination from "@material-ui/lab/Pagination";

class RentalLocation extends React.Component {

    constructor(props) {
        super(props)
        this.getAllLocations('', 0)
    }

    async getAllLocations(searchText, pageNum){
        await this.props.fetchLocations(searchText, pageNum, result => {
            console.log(result);
          });
    }

    handlePageClick = (data) => {
        const { selected } = data;
        this.getAllLocations('',selected);
      }

    render(){
        let tempItems = [{
            name : 'Vehicles', 
            to : '/dashboard', 
            active : false, 
        },{
            name : 'Rental Locations', 
            to : '/locations',
            active : true, 
        },
        {
          name: "My Reservations",
          to: "/reservations",
          active: false
        }]
        let items = ItemFactory(tempItems);
        return(
            <div>
            <Navigationbar navItems = {items} isUser = {true} />
            <div className="list-container">
            <LocationBrowser title = {'Search Locations'}/>
            <Pagination
              count={Math.floor(this.props.totalVehicles/20.0)}
              variant="outlined"
              shape="rounded"
              style={{ backgroundColor: "#ffa000;", width : "10%", margin : "16px auto" }}
              onChange={this.handlePageClick}
            />
        
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalLocations : state.locations.total 
    }
}

export default connect(mapStateToProps, {fetchLocations})(RentalLocation);

/**
 * //     <ReactPaginate
        //   previousLabel="Prev"
        //   nextLabel="Next"
        //   breakLabel="..."
        //   breakClassName="break-me"
        //   pageCount={this.props.totalLocations/20.0}
        //   marginPagesDisplayed={2}
        //   pageRangeDisplayed={0}
        //   onPageChange={this.handlePageClick}
        //   containerClassName="pagination"
        //   subContainerClassName="pages pagination"
        //   activeClassName="active"
        />
 */