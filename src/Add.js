import React, { useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import db from './firebaseconfig';
import './Add.css'
import { useNavigate } from 'react-router-dom';
import Login from './Components/Login';


const TURKISH_LETTERS = ['A', 'B', 'C', 'Ç','D', 'E', 'F', 'G', 'H', 'I','İ', 'J', 'K', 'L', 'M', 'N', 'O','Ö', 'P', 'R', 'S', 'T', 'U', 'Ü','V', 'Y', 'Z'];
const Add = () => {
  const [openLogin, setOpenLogin] = useState(true);
  const navigate = useNavigate();
  const handleGoBack = () => {
    //window.history.back();
    navigate('/');

  };

  const [letters] = useState(TURKISH_LETTERS);
  const [dailyData, setDailyData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(letters[0]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const customDocID = new Date();
  let date = "" + customDocID.getFullYear() +
    ((customDocID.getMonth() + 1).toString().length === 1 ? "0" + (customDocID.getMonth() + 1) : (customDocID.getMonth() + 1)) +
    ((customDocID.getDate()).toString().length === 1 ? "0" + (customDocID.getDate()) : (customDocID.getDate()));
  const collectionRef = collection(db, "DailyQA");



  const handleSendData = async () => {
   
    if (TURKISH_LETTERS.length === dailyData.length) {
      try {
        await setDoc(doc(collectionRef, date.toString()), {
          data: dailyData,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
   
    let hasSameLetter = false;
    dailyData.forEach((element) => {

      if (element.letter === selectedLetter) {
        let filteredArray = dailyData.filter((el) => {
          return el.letter !== selectedLetter;
        })
        let preparedArray = [...filteredArray, {
          letter: selectedLetter, question: question, answer: answer
        }]
        hasSameLetter = true;
        setDailyData(preparedArray);
      }
      else {
      }
    })

    if (hasSameLetter === false) {
      setDailyData((prevData) => [
        ...prevData,
        { letter: selectedLetter, question: question, answer: answer },
      ]);
    }
    

   
    setQuestion('');
    setAnswer('');

  };
  return (

    <div className='addPage'>
      {openLogin && <Login closeLogin={setOpenLogin} />}
      <div className='addBar'>
        <header style={styles.header}>
          <button onClick={handleGoBack} style={styles.button}>
            <i className="fa-solid fa-arrow-left" style={{ cursor: "pointer" }}></i>
          </button>
          <div style={styles.title}>Günlük Data</div>
          <div style={styles.buttonContainer}>
          </div>
        </header>
      </div>
      <div className='container-card'>
        <div className='cardAdd'>
          <form
            onSubmit={handleSubmit}>
            <div className='dropdown'>
              <label className='lettersText'>Harfler</label>
              <select className='ABC'
                value={selectedLetter}
                onChange={(e) => {
                  setSelectedLetter(e.target.value)
                }}>
                {letters.map((letter) => (
                  <option
                    key={letter}
                    value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
            <div className='inputLane'>
              <div>
                <label>Soru({selectedLetter}):  </label>
                <input className='question-input'
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div>
                <label>Cevap({selectedLetter}): </label>
                <input className='answer-input'
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

            </div>
            <button className='AddButton' type="submit" disabled={(!question.trim()) || (!answer.trim())}>Ekle</button>
            <button className='AddButton' type="submit" onClick={() => {
              handleSendData();
              alert('gönderildi!');
            }}>
              Gönder</button>
          </form>

        </div>
      </div>
      <div className='Datas'>
        <h2>Veriler</h2>
        <ul>
          {dailyData.map((data, index) => (
            <li key={`${data.letter}-${index}`}>
              {data.letter}: {data.question} - {data.answer}
            </li>
          ))}
        </ul>
      </div>
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
    padding: '5px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
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
export default Add;