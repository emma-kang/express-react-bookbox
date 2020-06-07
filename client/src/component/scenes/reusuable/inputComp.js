import React from 'react';
import TextField from "@material-ui/core/TextField";

const InputComp = ({ name, placeholder, value, type, onChangeHandler }) => {
  return(
    <TextField
        variant="outlined"
        margin="normal"
        type={type != null ? 'password' : 'text'}
        required
        fullWidth
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandler(e)}
    />
  );
}

export default InputComp;