import { useState } from 'react'
import { Button, Input, message, notification} from "antd";
import './App.css'
import InputComponent from './components/InputComponent';
import LoginServices from './service/Login.services';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // const navigate = useNavigate()
const handleChangeInput = (value, type) => {
  if(type === "Email"){
    setEmail(value)
  }
  if(type === "Password"){
    setPassword(value)
  }
console.log(value)
}
const handleSubmit = async () => {
  console.log(email, password)
  const payload = {
    username: email,
    password,
  }
  const resonse = await LoginServices.Login(payload); //
  if(resonse?.status === 200){
    console.log("resonse", resonse)
notification.success({message: resonse.data.message})
  }

}
  return (
    <>
      <h1>Login page</h1>
        <InputComponent placeholder={"Enter Email"} label="Email" onChange={(e) => handleChangeInput(e.target.value, "Email")} />
        <InputComponent label="Password" placeholder={"Enter Password"} onChange={(e) => handleChangeInput(e.target.value, "Password")} />
      <Button type="primary" onClick={handleSubmit}>Login</Button>
    </>
  )
}

export default App
