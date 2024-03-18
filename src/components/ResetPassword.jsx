import React, { useState } from 'react';
import styles from './Login.module.css' // Import CSS module styles
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
    const { token } = useParams();
    const [responseMessage, setResponseMessage] = useState('');
  
    const validate = async (e) => {
      e.preventDefault();
      let goodPassword = false;
      let goodConfirmPassword = false;
      if(!password || password.length<8){
        setInvalidPassword(true);
      }else{
        setInvalidPassword(false);
        goodPassword = true;
      }
      if(!confirmPassword || confirmPassword.length<8 || confirmPassword!==password){
        setInvalidConfirmPassword(true);
      }else{
        setInvalidConfirmPassword(false);
        goodConfirmPassword = true;
      }
      if(goodPassword&&goodConfirmPassword){
        console.log('here')
        try {
          const response = await axios.post(`http://192.168.0.102:3001/accounts/resetpassword/${token}`, {
            password: password,
            confirmPassword: confirmPassword
          });
          setResponseMessage(response.data.message);
          alert(response.data.message)
          window.location.reload();
        } catch (error) {
          setResponseMessage(error.response.data.error)
          alert(responseMessage)
          window.location.reload();
        }
      }
    }
  
    return (
      <div className={styles.body}> 
      {console.log(password)}
        <form className={styles.container}> 
          <div className={styles.items}> 
            <label  htmlFor="password" >New Password</label>
            <input type="password" required placeholder='Enter new password...' className={styles.textfield} value={password} onChange={(value)=>{setPassword(value.target.value);setInvalidPassword(false)}} name="password"/>
          </div>
          {invalidPassword&&<p style={{ color: 'red', margin: '-35px 0px' }}>Password is too short!</p>}
          <div className={styles.items}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" required placeholder='Enter password...' className={styles.textfield} value={confirmPassword} onChange={(value)=>{setConfirmPassword(value.target.value);setInvalidConfirmPassword(false)}} name="confirm_password"/>
          </div>
          {invalidConfirmPassword&&<p style={{ color: 'red', margin: '-35px 0px' }}>Password and confirm password should be the same!</p>}
          <div>
            <button className={styles.button} onClick={(e)=>{validate(e)}}>Reset Password</button>
          </div>
        </form>
        {/* {responseMessage&&<h1>{responseMessage}</h1>} */}
      </div>
    );
  };

  export default ResetPassword;