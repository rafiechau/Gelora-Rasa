import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

const InputTextField = ({ children, input, disabled = false, register, errors, accept = undefined }) => (
  <FormControl>
    <label htmlFor={input?.name} className={classes.labelInput}>
      {input?.label}
      <input
        className={`${classes.input} ${errors[input?.name] && classes.inputError}`}
        type={input?.type}
        {...register(input?.name, {
          required: input?.required,
          pattern: { value: input?.pattern, message: input?.messagePatern },
          minLength: {
            value: input?.minLength,
            message: input?.messageMin,
          },
        })}
        id={input?.name}
        placeholder={input?.placeholder}
        defaultValue={input?.value}
        accept={accept && accept}
        disabled={disabled}
      />
      {errors[input?.name] && <span className={classes.inputLabelError}>{errors[input?.name].message}</span>}
      {children}
    </label>
  </FormControl>
);
InputTextField.propTypes = {
  children: PropTypes.element,
  input: PropTypes.shape({
    name: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.string,
    pattern: PropTypes.shape(RegExp),
    type: PropTypes.string,
    value: PropTypes.string,
    messagePatern: PropTypes.string,
    messageMin: PropTypes.string,
    minLength: PropTypes.number,
  }),
  register: PropTypes.func,
  errors: PropTypes.object,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputTextField;
