import React from 'react';
import PropTypes from 'prop-types';
import Instruction from './Instruction';
import { useState } from 'react';
import Modal from "./Modal";


function NavBar({gameStart}) {
  const [openInstruction, setOpenInstruction] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleGoBack = () => {
    //window.history.back();
  };

  const handleInfoButtonClick = () => {
    setOpenInstruction(true);
  };

  // const handleGraphButtonClick = () => {
  //   setOpenModal(true);
  // };

  // const handleUserButtonClick = () => {
  // };
  return (
    <div className='navBar'>
      <header style={styles.header}>
        <button onClick={handleGoBack} style={styles.button} >
          {openInstruction && <Instruction closeInstruction={setOpenInstruction} gameStart={gameStart} />}
          {openModal && <Modal closeModal={setOpenModal} />}

          <i></i>
        </button>
        <div style={styles.title}>PassaParola</div>
        <div style={styles.buttonContainer}>
          <button onClick={handleInfoButtonClick} style={styles.iconButton}>
            <i className="fa-solid fa-info" style={{ cursor: "pointer" }}></i>
          </button>
          {/* <button onClick={handleGraphButtonClick} style={styles.iconButton}>
            <i className="fa-solid fa-chart-simple" style={{ cursor: "pointer" }}></i>
          </button> */}
          {/* <button onClick={handleUserButtonClick} style={styles.iconButton}>
            <i className="fa-regular fa-user" style={{ cursor: "pointer" }}></i>

          </button> */}
        </div>
      </header>
    </div>
  );
};


const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '10px 20px',
  },
  button: {
    padding: '0px 0px',
    backgroundColor: 'rgb(235, 123, 123)',
    border: 'none',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '80px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  iconButton: {
    padding: '5px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
  },


}
NavBar.propTypes = {
  title: PropTypes.string.isRequired
}
NavBar.defaultProps = {
  title: "Default App"
}

export default NavBar;
