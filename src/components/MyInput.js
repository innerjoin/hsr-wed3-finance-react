
import React from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'

class MyInput extends React.Component {
  state: {
    error: string
  }

  state = {
    error: null,
  }

  validatePresence= (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const val =event.target.value;
      if(val == ""){
        this.setState({error: "can't be blank"})
      }else{
        this.setState({error: null})
      }
      this.props.onChange(event);
    }
  }

  render() {  
    const {onChange, validator, fluid, ...rest} = this.props;
    return (
        <div>
        <Form.Input {...rest} onChange={this.validatePresence}  error={Boolean(this.state.error)}/>
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
