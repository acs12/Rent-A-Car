import React from "react";
import {  MDBDropdownItem } from "mdbreact";

const DropDownItemFactory = itemList => {
  let itemArray = [];
  itemList.forEach(element => {
    let itemObject = (
        <MDBDropdownItem key = {element.value} name = {element.name} value = {element.value} onClick={element.clicked}>{element.displayValue}</MDBDropdownItem>
    );
    itemArray.push(itemObject);
  });

  return itemArray;
};

export default DropDownItemFactory;
