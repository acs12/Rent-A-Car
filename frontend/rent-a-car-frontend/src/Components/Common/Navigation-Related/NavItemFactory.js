import React from "react";
import { MDBNavItem, MDBNavLink } from "mdbreact";

const CreateNavItem = itemList => {
  let itemArray = [];
  itemList.forEach(element => {
    let itemObject = (
      <MDBNavItem active={element.active}>
        <MDBNavLink to={element.to}>{element.name}</MDBNavLink>
      </MDBNavItem>
    );
    itemArray.push(itemObject);
  });

  return itemArray;
};

export default CreateNavItem;
