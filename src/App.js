import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import Modal from "./Components/Modal";
import { doc, getDoc } from "firebase/firestore";
import db from './firebaseconfig';
import './Add';
import Swal from "sweetalert2";
import 'reactjs-popup/dist/index.css';
import Instruction from './Components/Instruction';

const App = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const customDocID = new Date();
  let date = "" + customDocID.getFullYear() +
    ((customDocID.getMonth() + 1).toString().length === 1 ? "0" + (customDocID.getMonth() + 1) : (customDocID.getMonth() + 1)) +
    ((customDocID.getDate()).toString().length === 1 ? "0" + (customDocID.getDate()) : (customDocID.getDate()));
  const circleRef = useRef(null);
  const [letters, setLetters] = useState([]);
  const [data, setData] = useState([]);
  const numComponents = letters.length;
  const circleRadiusDesktop = 300;
  const circleRadiusMobile = 150;
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(3000);
  const [answersStatus, setAnswersStatus] = useState({});
  const isMobile = window.innerWidth <= 768;
  const circleRadius = isMobile ? circleRadiusMobile : circleRadiusDesktop;
  const currentTime = new Date();
  let currentSecond = currentTime.getSeconds();
  let currentMinute = currentTime.getMinutes();
  let currentHour = currentTime.getHours();
  let remainingHours = 24 - currentHour - 1;
  if (remainingHours.toString().length === 1) {
    remainingHours = '0' + remainingHours.toString();
  }
  let remainingMinutes = 60 - currentMinute;
  if (remainingMinutes.toString().length === 1) {
    remainingMinutes = '0' + remainingMinutes.toString();
  } 
  let remainingSecond = 60 - currentSecond;
  if (remainingSecond.toString().length === 1) {
    remainingSecond = '0' + remainingSecond.toString();
  }


  useEffect(() => {
    const circle = circleRef?.current;
    // Bileşenlerin çemberin etrafında düzenlenmesi için açı hesaplamaları??
    if (circle) {
      const angleIncrement = (2 * Math.PI) / numComponents;
      let angle = -Math.PI / 2;
      for (let i = 0; i < numComponents; i++) {
        const x = circleRadius * Math.cos(angle) + circle?.clientWidth / 2;
        const y = circleRadius * Math.sin(angle) + circle?.clientHeight / 2;
        // HARFLERİN pozisyonunu belirleme??
        circle.children[i].style.left = `${x - circle?.children[i]?.clientWidth / 2}px`;
        circle.children[i].style.top = `${y - circle?.children[i]?.clientHeight / 2}px`;
        angle += angleIncrement;
      }
    }
  }, [numComponents,circleRadius]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (timer !== 0) {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }
  //     else {
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [timer]);
  const minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (seconds.toString().length === 1) {
    seconds = '0' + seconds.toString();
  }
  const gameFinished = () => {
    Swal.fire({
      title: 'Oyunu bitirmek istediğine emin misin?',
      showCancelButton: true,
      confirmButtonText: 'Bitir',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModal(true);
        setIsInputDisabled(true);
        setIsVisible(false);
      }
      else {
        setOpenModal(false);
        setIsInputDisabled(false);
        setIsVisible(true);

      }
    });

  }
  

  useEffect(() => {
    if(gameStart){
      const interval = setInterval(() => {
        if ((timer === 0 || data.length > 0 ) && (wrongCount + correctCount === data.length)) {
          setOpenModal(true);
          setIsInputDisabled(true);
          setIsVisible(false);
          clearInterval(interval);
        }
        else {
           
          setTimer((prevTimer) => prevTimer - 1);
        }
  
      }, 1000);
      return () => clearInterval(interval);
    }
    



  }, [gameStart,timer,correctCount,data.length,wrongCount]);

  const handleGetData = async (props) => {
    const docRef = doc(db, "DailyQA", date);
    const datafromdb = await getDoc(docRef);
    setLetters(datafromdb.data().data.map((item) => {
      return item.letter;
    }));
    setData(datafromdb.data().data);
  }

  const getAnswer = () => {
    return data[currentLetterIndex]?.answer;
  }

  const getQuestion = () => {
    return data[currentLetterIndex]?.question;
  };

  const isLetterStored = () => {

    
    Object.keys(answersStatus).forEach(element => {
      if (element === letters[currentLetterIndex] && answersStatus[element] === 'skipped') {
        return true;
      }
      else {
        return false;
      }
    });
  }


  const checkAnswer = () => {


    const userAnswerLowerCase = (typeof userAnswer === 'string') ? userAnswer.toLowerCase() : '';
    const correctAnswer = getAnswer();
    if (userAnswerLowerCase === correctAnswer?.toLowerCase()) {
      setAnswersStatus((prevStatus) => ({
        ...prevStatus,
        [letters[currentLetterIndex]]: 'correct',
      }));
      setCorrectCount((prevStatus) => (prevStatus + 1));
      setScore(score + 10);
    } else if (userAnswerLowerCase === 'pas') {
      setAnswersStatus((prevStatus) => ({
        ...prevStatus,
        [letters[currentLetterIndex]]: 'skipped',
      }));
      setPassedCount((prevStatus) => (prevStatus + 1));
    }
    // if (userAnswerLowerCase === '') {
    // setAnswersStatus((prevStatus) => ({
    //   ...prevStatus,
    //   [letters[currentLetterIndex]]: 'skipped',
    // }));
    // setPassedCount((prevStatus) => (prevStatus + 1));
    // }
    else {
      setAnswersStatus((prevStatus) => ({
        ...prevStatus,
        [letters[currentLetterIndex]]: 'wrong',
      }));
      setWrongCount((prevStatus) => (prevStatus + 1));
      setScore(score - 10);
    }

    //   if(correctCount+wrongCount===data.length){  
    setCurrentLetterIndex((prevStatus) =>
      (prevStatus + 1) % data.length);
    // }


    setUserAnswer('');
  }
  useEffect(() => {
    handleGetData();
  }, [handleGetData()])


  const findIndex = (item) => {
    const lettersIndex = 'ABCÇDEFGHIİJKLMNOÖPRSTUÜVXYZ';
    return lettersIndex.indexOf(item);
  };


  function filterObjectsByValue(obj, targetValue) {
    return Object.keys(obj)
      .filter(key => obj[key] === targetValue)
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
  }

  useEffect(() => {
    const passedObjects = filterObjectsByValue(answersStatus, 'skipped');

    if (data.length > 0 && correctCount + passedCount + wrongCount === data.length && Object.keys(passedObjects).length !== 0) {
    
      if (passedCount > 0) {
        let temparr = Object.keys(passedObjects);
        let firstRun = false;

        temparr.forEach(element => {
          if (firstRun = false) {
            // setCurrentLetterIndex((prevStatus) => {
            //   findIndex(element);

            // })
            firstRun = true;
            checkAnswer();
          }
          else {
            return true;
          }

        });
       



      }
    }

  }, [correctCount, wrongCount, passedCount, currentLetterIndex, answersStatus, letters])


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };
  const isPlayed = localStorage.getItem('isPlayed');
  if (isPlayed) {
      if (remainingHours === 0 && remainingMinutes === 0) {

        localStorage.setItem('isPlayed', false);
      } else {
        return (
          <div> Kalan süre: {remainingHours} : {remainingMinutes} : {remainingSecond}</div>
        )
      }
      setInterval(isPlayed, 1000);
      window.onload = isPlayed;
    


  }





  return (

    <div className="circle-letter">
      {openInstruction && <Instruction closeInstruction={setOpenInstruction} playGame={setGameStart} gameStart={gameStart}/>}
      
      <NavBar 
        title="User App"
        buttonContainer="app"
        iconButton="" 
        gameStart={gameStart}/>
      {/* <hr /> */}
      <div className="circle-wrapper" >
        <div className="circle-container" style={{ width: circleRadius * 2, height: circleRadius * 2 }} ref={circleRef}>
          {letters.map((letter, index) => (
            <div className={`circle-component ${answersStatus[letter] || ''} ${currentLetterIndex === index ? 'current' : 'not-current'}`}>
              {letter}
            </div>
          ))}
        </div>
      </div>
      <div className='input-container'>
        <div className="parola-content">
          <p className='question'>Soru:{getQuestion()}
          </p>
        </div>
        <div>
          {/*üm */}
          <input className='input-comp'
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isInputDisabled}
            placeholder="Cevapla"></input>
          {isVisible && (
            <button className='button-container'
              style={{ cursor: "pointer" }}
              onClick={() => checkAnswer()}
            >Gönder
            </button>)}
          <p>Puan: {score}{currentLetterIndex}</p>
          {isVisible && (
            <p className="fa-regular fa-clock" style={{ cursor: "pointer" }}>
              {minutes}:{seconds}</p>)}
          <button className='confirmBtn'
            onClick={gameFinished}
          >Oyunu bitir!</button>
        </div>
      </div>

      {openModal && <Modal answersStatus={answersStatus} data={data} closeModal={setOpenModal} correctCount={correctCount} passedCount={passedCount} wrongCount={wrongCount} />}
    </div>
    //  } </div>

  );

}

export default App;