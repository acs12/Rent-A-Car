import React from 'react';


class CustomTextBox extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  render() {
    const inputClass = 'form-control';
    const {
      boxTitle, type, name, placeholder, defaultValue, onChange, list, options,
    } = this.props;
    return (

      <div>
        <div className="form-group">
          <label>{boxTitle !== undefined && boxTitle}</label>

          <input
            type={type === undefined ? 'text' : type}
            className={inputClass}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            list={list}
            required
          />
          {options}
        </div>
      </div>
    );
  }
}

export default CustomTextBox;
