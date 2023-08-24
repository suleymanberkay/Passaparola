import React, { useState } from 'react';
import './Login.css';

const Login = ({ closeLogin }) => {

    const [parola, setParola] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleParolaChange = (event) => {
        setParola(event.target.value);
    };


    const handleLoginClick = () => {
        if (parola === 'abc') {
            closeLogin(false)
        } else {
            alert('Yanlış şifre girdiniz, lütfen tekrar deneyiniz!');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLoginClick();
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginContainer'>
                <p className='text'>Erişim izni gerekiyor!</p>
                <input className='input'
                    type="password"
                    value={parola}
                    onChange={handleParolaChange}
                    placeholder="Şifreyi giriniz"
                    onKeyPress={handleKeyPress}
                >

                </input>
                <button className='loginBtn'
                    onClick={handleLoginClick}>Giriş yap</button>
            </div>
        </div>
    );

}
export default Login;