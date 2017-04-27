import React from 'react'
import {Input, FormField, Label} from 'semantic-ui-react'

export type Props = {
    validations: any,
}

class FormFieldWithValidation extends React.Component {

    props: Props;

    state: {
        hasError: boolean,
        isValidated: boolean,
        message: string,
        message_color: string,
        value: any
    };

    state = {
        hasError: true,
        isValidated: false,
        message: null,
        message_color: null,
        value: null
    };

    validatePresence = (val: any) => {
        if (val === "") {
            this.setState({valid: false, message: 'can\'t be blank', message_color: 'red'});
            return false;
        } else {
            return true;
        }
    };

    validateMinLength = (val: any, length: Integer) => {
        if (val.length < length) {
            this.setState({message: 'requires at least ' + length + " characters", message_color: 'red'});
            return false;
        } else {
            return true;
        }
    };

    validateEqualTo = (val: any, otherElement: any) => {
        var otherVal = otherElement.props.value;
        if (val !== otherVal) {
            this.setState({message: 'has to be equal to ' + otherElement.props.label});
            return false;
        } else {
            return true;
        }
    };

    validateGreaterOrEqualTo = (val: number, otherElement: number) => {
        var otherVal = otherElement;
        if (val < otherVal) {
            this.setState({message: 'has to be greater than or equal to ' + otherElement, message_color: 'red'});
            return false;
        } else {
            return true;
        }
    };

    resetMessage = () => {
        this.setState({message: null, message_color: null})
    };

    resetField = () => {
        this.setState({hasError: true});
        this.resetMessage();
    };

    runValidations = (value: any) => {
        var hasErrors = false;
        this.resetMessage();

        const {validations} = this.props;
        if (validations) {
            Object.keys(validations).forEach(function (key) {
                if (key === "presence" && validations[key] === true) {
                    if (!this.validatePresence(value)) {
                        hasErrors = true;
                    }
                }
                if (key === "minLength") {
                    if (!this.validateMinLength(value, validations[key])) {
                        hasErrors = true;
                    }
                }
                if (key === "equalTo" && validations[key] !== undefined) {
                    if (!this.validateEqualTo(value, validations[key])) {
                        hasErrors = true;
                    }
                }
                if (key === "greaterOrEqualTo" && validations[key] !== undefined) {
                    if (!this.validateGreaterOrEqualTo(value, validations[key])) {
                        hasErrors = true;
                    }
                }

            }, this);
        }
        this.setState({isValidated: true, hasError: hasErrors});

        return !hasErrors;
    };

    validationCallback = (isValidated: Boolean, hasError: Boolean, message: String, message_color: String) => {
        this.setState({isValidated: isValidated, hasError: hasError, message: message, message_color: message_color});
    };

    validate = (value: any) => {
        if (typeof this.props.validations === "function") {
            this.props.validations(value, this.validationCallback);
        } else {
            this.runValidations(value);
        }
    };

    handleOnChange = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({value: event.target.value});
        }

        this.validate(event.target.value);

        // call the onChange of the declaration
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        return true;
    };

    hasError = () => {
        if (!this.state.isValidated) {
            this.validate(this.state.value)
        }
        return this.state.hasError;
    };

    render() {
        const {onChange, validations, fluid, ...props} = this.props;
        return (
            <FormField>
                <Input {...props} onChange={this.handleOnChange}
                       error={Boolean(this.state.isValidated && this.state.hasError)}/>
                {
                    this.state.message &&
                    (this.state.message_color ?
                            <Label basic pointing color={this.state.message_color} content={this.state.message}/>
                            :
                            <Label basic pointing content={this.state.message}/>
                    )
                }
            </FormField>
        )
    }
}
export default FormFieldWithValidation
