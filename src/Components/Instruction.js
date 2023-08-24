import React from 'react';
import "./Instruction.css";

const Instruction = ({ closeInstruction, correctCount, wrongCount, passedCount, playGame, gameStart }) => {

    return (
        <div className='instructionBackground'>
            <div className='instructionContainer'>
                <header>
                    <h1>Talimatlar!</h1>
                </header>
                <main className='textBody'>
                    <p className='textInstruction'>Her harfe karşılık gelen sorunun cevabını yanıtlamalısın. Cevap, bulunduğun harf ile başlar.</p>
                    <p className='textInstruction'>Yani, "A" harfindeysen cevap "A" ile başlar. </p>
                    <p className='textInstruction'>Cevabın doğru, yanlış veya pas olabilir. Pas geçmek için pas yazabilirsin. Pas geçtiğin sorulara dönebilirsin ve süre bitene kadar cevaplamaya hakkın var.</p>
                    <p className='textInstruction'>Toplam süreniz 5 dakikadır. İyi eğlenceler!</p>
                </main>
                {!gameStart &&
                    <button className='startBtn'
                        onClick={() => {
                            closeInstruction(false);
                            playGame(true);
                        }}>Oyunu başlat</button>}
                {gameStart&& 
                <button className='backBtn'
                onClick={() => {
                    closeInstruction(false);
                }}>Geri dön!</button>}
            </div>
        </div>
    )
}
export default Instruction;
