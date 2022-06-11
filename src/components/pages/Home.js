import React,{useState,useContext,useEffect,useCallback} from "react";
import AuthContext from "../store/auth-context";
import classes from "./Home.module.css";

const Home = () => {
    const [completeBtnClicked,setCompleteBtnCLicked] = useState(false)
    const authctx = useContext(AuthContext)
    const [initialData,SetInitialData] = useState('')

    const getData = useCallback( async() =>{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw',{
        method:'post',
        body:JSON.stringify({
            idToken:authctx.token,
        })
      })
      const data = await res.json()
      SetInitialData(data)
    },[authctx.token])

    useEffect(()=>{
      getData()
    },[getData])

    let initialName =''
    let initialPhotoUrl =''
    if(initialData.users !== undefined){
      initialName= initialData.users[0].displayName
      initialPhotoUrl= initialData.users[0].photoUrl
    }
    // console.log('initialData',initialName,initialPhotoUrl)
    const [input,setInput] = useState({
      name:`${initialName}`,
      photoUrl:initialPhotoUrl
    }) 
    useEffect(() => { setInput({
      name:initialName,
      photoUrl:initialPhotoUrl
    })}, [initialName,initialPhotoUrl] )
   
    const showProfileForm = (event)=>{
        event.preventDefault();
        setCompleteBtnCLicked(true)
    }
    const hideProfileForm = (event)=>{
        event.preventDefault();
        setCompleteBtnCLicked(false)
    }

   

    const changeHandler = (e)=>{
      const {name,value} = e.target;
      setInput(prevInput=>{
        return{
          ...prevInput,
          [name]:value}
      })
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        const enteredFname = input.name;
        const enteredPhotoUrl = input.photoUrl;
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw',{
            method:'post',
            body:JSON.stringify({
                idToken:authctx.token,
                displayName:enteredFname,
                photoUrl:enteredPhotoUrl,
                returnSecureToken:false
            })
        })

        const data = await res.json()
        console.log(data)
        if(res.ok){
            alert('Profile updated successfully')
            e.target.reset()
        }
    }

  return (
    <div>
      <div className={classes["home-container"]}>
        <span>Welcome to Expense Tracker!!!</span>
        <div className={classes.profileMsg}>
          <span>
            Your profile is incomplete. <button onClick={showProfileForm}> Complete now</button>
          </span>
        </div>
      </div>
      {completeBtnClicked &&<section className={classes['form-container']}>
        <form onSubmit={submitHandler} className={classes.profileForm}>
          <span>Contact Details</span>
          <label htmlFor="name">Fullname</label>
          <input type='text' name='name' id='name' onChange={changeHandler} value={input.name}   required/>
          <label htmlFor="photoUrl">Profile Photo URL</label>
          <input type='text' name='photoUrl' id='photoUrl' onChange={changeHandler} value={input.photoUrl}  required/>
          <button  className={classes['update-btn']} type="submit">Update</button>
          <button className={classes['cancel-btn']} onClick={hideProfileForm}>Cancel</button>
        </form>
      </section>}
    </div>
  );
};
export default Home;
