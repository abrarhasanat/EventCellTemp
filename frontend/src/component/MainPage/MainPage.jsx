import './MainPage.scss';
import { useEffect, useState,useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Auth from '../../user/pages/Auth';
const MainPage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  // const [counter, setCounter] = useState(0);

  const slides = document.getElementsByClassName("media-picture");
  let counter = 0;
  useEffect(() => {
  const timer = setInterval(() => {
    // debugger
    slides[counter].classList.remove("active");
    counter++;
    if (counter >= 2) counter = 0;
    slides[counter].classList.add("active");
  },3000);

  return () => clearInterval(timer);
  },[]);
  
  const modalFunctions = {
    setShowLoginModal: (shown) => setShowLoginModal(shown),
    setShowSignupModal: (shown) => setShowSignupModal(shown)
  }
  
  const handleCreateTrip = () => {
    if (auth.isLoggedIn)
      history.push(`/createPackage`);
    else history.push(`/auth`);
    }

  return (
    <>
      <div className="main-page">
        <div className="main-content-container">
          <div className="main-content">
            <div className="info-container">
              <h1>An Online Tour Management System</h1>
              <p>Create your journey together. All in one place</p>
              <button onClick={handleCreateTrip} className="create-trip-button">
                <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
                <span className="create-trip-text">Create New Trip</span>
              </button>
            </div>
          </div>
          <div className="media-section">
            <img id="slide-1" className="media-picture active" src={require('../../assets/canyon.png')}/>
            <img id="slide-2" className="media-picture" src={require('../../assets/mountain.png')}/>
            <img id="slide-3" className="media-picture" src={require('../../assets/valley.png')}/>
          </div>
        </div>
      </div>
      {/* {showCreateModal && <Modal component={CreateTripModal} close={() => setShowCreateModal(false)} />}
      {showLoginModal && <Modal component={LoginModal} close={() => setShowLoginModal(false)} modalFunctions={modalFunctions} />}
      {showSignupModal && <Modal component={SignupModal} close={(shown) => setShowSignupModal(shown)} modalFunctions={modalFunctions} />} */}
    </>
  );
}

export default MainPage;

