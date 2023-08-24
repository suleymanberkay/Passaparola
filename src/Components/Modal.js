import React, { useEffect } from 'react';
import "./Modal.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Modal = ({ closeModal, correctCount, wrongCount, passedCount, answersStatus, data }) => {
  
  useEffect(() => {
    console.log(data);
    console.log(answersStatus);
  }, [])
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <Tabs classID='tabs'>
          <TabList className={"tabList"}>
            <Tab>Sonuç Ekranı</Tab>
            <Tab>Cevap Anahtarı</Tab>
          </TabList>

          <TabPanel>
            <div className='titleCloseBtn'>
              <div className='title'>
                <h1>Sonuçlar </h1>

              </div>
              <div className='body'>
                <div className='correct-board'>
                  <span class="gg-check-o"></span>
                  <div className='content'>
                    <span class="texts">Doğru sayısı:</span>
                    <span class="value">{correctCount}</span>
                  </div>
                </div>
                <div className='wrong-board'>
                  <span class="gg-close"></span>
                  <div className='content'>
                    <span class="texts">Yanlış Sayısı:</span>
                    <span class="value">{wrongCount}</span>
                  </div>
                </div>
                <div className='passed-board'>
                  <span class="gg-shape-circle"></span>
                  <div className='content'>
                    <span class="texts">Pas Sayısı:</span>
                    <span class="value">{passedCount}</span>
                  </div>
                </div>
              </div>
              <div className='footer'>
                <button
                  onClick={() => { closeModal(false); localStorage.setItem('isPlayed', true) }} id='cancelBtn'
                >Cancel</button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='solutionCard'>
              <div class="row">
                <div class="col">
                  <div className='cardText'>
                  {data.map((data, index) => (
                    <div class="card card-body">
                      {data.letter} - {data.question} - {data.answer}
                    </div>
                  ))}
                  </div>
                </div>
                
              </div>
            </div>
          </TabPanel>
        </Tabs>

      </div>
    </div>
  );
};

export default Modal;
