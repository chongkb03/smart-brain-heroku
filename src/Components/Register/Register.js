import React from 'react';

class Register extends React.Component {

 constructor (props) {
  super(props);

  this.state = {

    email: '',
    password: '',
    name: ''
  }

 }

  onEmailChange = (event)=> {

    this.setState({email: event.target.value});
  }


  onPasswordChange = (event) => {

 this.setState({password: event.target.value});

  }


  onNameChange = (event) => {

 this.setState({name: event.target.value});

  }



  onSubmitRegister = () => {

    console.log(this.state.email + '*' + this.state.password+ '*' + this.state.name);

    fetch('http://peaceful-harbor-83036.herokuapp.com/register',{

      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(r => r.json())
    .then(user => {
         if (user.id){

          console.log(user);
            this.props.loadUser(user);
            this.props.onRouteChange('home');
            }
    })


    //
  }


  render () {

  const   {onRouteChange} = this.props;
	return (
		<article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	 <main class="pa4 black-80">
  <div class="measure">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="f4 fw6 ph0 mh0">Register</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" htmlfor="name">Name</label>
        <input onChange ={this.onNameChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
        <input onChange ={this.onEmailChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div class="mv3">
        <label class="db fw6 lh-copy f6" for="password">Password</label>
        <input onChange ={this.onPasswordChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
      
    </fieldset>
    <div class="">
      <input  class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="Register"  
      onClick={this.onSubmitRegister}
      />
    </div>
    
  </div>
</main>
</article>
	
	);

}

}

export default Register;