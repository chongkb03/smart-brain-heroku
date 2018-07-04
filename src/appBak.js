import React, { Component } from 'react';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';


import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

import './App.css';


const app = new Clarifai.App({
apiKey: 'ebcde1ec1ef8436aba3ad24110debac6'

});

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,

    user : {
   id: '',
  name: '',
    entries:0,
    joined: ''
    }
    
}

const particlesOptions = {

  particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
}

class App extends Component {

  constructor (){

    super();
    this.state = initialState;
  }



  

  calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height =  Number(image.height);
  console.log(width, height);
 return {
 leftCol:  clarifaiFace.left_col * width,
 topRow: clarifaiFace.top_row * height,
 rightCol: width - (clarifaiFace.right_col * width),
 bottomRow: height - (clarifaiFace.bottom_row * height)

 }
  
  }




  displayFaceBox = (box) => {
 console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
  this.setState({input : event.target.value})
console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>{
         if (response) {
         fetch('http://localhost:4000/image/',{
          method: 'put',
          headers: {'content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
                              })
                        })   
          .then(r => r.json())  
          .then(c => {
                this.setState(Object.assign(this.state.user,{entries:c}))
          })      
                     }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }
      )
    .catch(err => console.log(err));

  }

onRouteChange = (r) => {

  this.setState({route: r})

  if (r === 'signout') {
    this.setState(initialState)
  }
  else
  if (r === 'home') {
    this.setState({isSignedIn: true})
  }
}

loadUser = (u) => {
this.setState({user : {
id: u.id,
  name: u.name,
    entries: u.entries,
    joined: u.joined

}})

}

  render() {
    console.log('render '+ this.state.user.entries);
    return (


      <div className="App">

       <Particles className='particles'
              params={particlesOptions}
              
            />
          <Navigation onRouteChange={this.onRouteChange} s={this.state.isSignedIn}/>
       { this.state.route === 'home' ? 
         <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
        </div> :
        (
        this.state.route === 'signin' || this.state.route === 'signout'
        ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

        )
      }

      </div>
    );
  }
}

export default App;
