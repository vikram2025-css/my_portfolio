import TextField from '@mui/material/TextField';

const InputField = ({
    label,
    type = 'text',
    name,
    register,
    error = '',
    helperText = '',
    fullWidth = true,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            type={type}
            {...register(name)}  // <-- react-hook-form register
            error={!!error}
            helperText={error || helperText}
            fullWidth={fullWidth}
            variant="outlined"
            size="medium"
            {...rest}



        />
    );
};

export default InputField;
