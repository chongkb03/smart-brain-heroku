import React from 'react';

const Navigation = ({onRouteChange, s}) => {
	

	return (
	 <div>

	
     { 

      !s  ? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick ={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p> 
      <p onClick ={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p> 
      </nav> : 
       <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick ={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p> 
      </nav>
     }

     
     </div>
	);

}

export default Navigation;
