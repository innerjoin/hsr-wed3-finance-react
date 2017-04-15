
import React from 'react'
import { Form, Message } from 'semantic-ui-react'

class MyInput extends React.Component {
  state: {
    error: string
  }

  state = {
    error: null,
  }

  validatePresence= (val:any) => {
    if(val === ""){
      this.setState({error: "can't be blank"})
      return false;
    }else{
      this.setState({error: null})
      return true;
    }
  }

  validateMinLength= (val: any, length: Integer) => {
    if(val.length < length){
      this.setState({error: "requires at least "+length+" characters"})
      return false;
    }else{
      this.setState({error: null})
      return true;
    }
  }

  validateEqualTo= (val: any, otherElement: any) => {
    var otherVal = otherElement.props.value;
    if(val !== otherVal){
      this.setState({error: "has to be equal to "+otherElement.props.label})
      return false;
    }else{
      this.setState({error: null})
      return true;
    }
  }

  runValidations= (val: any) => {
    var hasErrors = false;
    if(this.validations){
      Object.keys(this.validations).forEach(function(key) {
        if(key === "presence" && this.validations[key] === true){
          if(!this.validatePresence(val)){
            hasErrors= true;
          }
        }
        if(key === "minLength"){
          if(!this.validateMinLength(val, this.validations[key])){
            hasErrors= true;
          }
        }
        if(key === "equalTo" && this.validations[key] !== undefined){
          if(!this.validateEqualTo(val, this.validations[key])){
            hasErrors= true;
          }
        }
      }, this); 
    }
    return !hasErrors;
  }

  render() {  
    const {onChange, validations, fluid, ...rest} = this.props;
    this.validations = validations;
    this.validationFunc = (event: Event) => {
      if(event.target instanceof HTMLInputElement){
        this.runValidations(event.target.value);
      }
      if(this.props.onChange){
        this.props.onChange(event);
      }
      return true;
    }

    return (
        <div>
        <Form.Input {...rest} onChange={this.validationFunc}  error={Boolean(this.state.error)}/>
        {this.state.error &&
          <Message
            header='Error'
            content={this.state.error}
          />
        }
        </div>
        )
  }

}
export default MyInput 
