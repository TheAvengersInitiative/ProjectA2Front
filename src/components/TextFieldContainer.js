import React from 'react'

import TextField from '@material-ui/core/TextField'

export default function TextFieldContainer(props) {
    const { id, formikProps } = props

    return (
        <TextField
            id={id}
            name={id}
            fullWidth
            helperText={formikProps.touched[id] ? formikProps.errors[id] : ''}
            error={formikProps.touched[id] && Boolean(formikProps.errors[id])}
            value={formikProps.values[id]}
            onChange={formikProps.handleChange}
            variant="filled"
            {...props}
        />
    )
}