import React,{useState,useRef,useContext} from "react";
import AuthContext from "../store/auth-context";
import classes from "./Home.module.css";

const Home = () => {
    const [completeBtnClicked,setCompleteBtnCLicked] = useState(true)
    const nameRef = useRef()
    const photoUrlRef = useRef()
    const authctx = useContext(AuthContext)
    const showProfileForm = (event)=>{
        event.preventDefault();
        setCompleteBtnCLicked(true)
    }
    const hideProfileForm = (event)=>{
        event.preventDefault();
        setCompleteBtnCLicked(false)
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        const enteredFname = nameRef.current.value;
        const enteredPhotoUrl = photoUrlRef.current.value;
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
          <label htmlFor="fname">Fullname</label>
          <input type='text' name='fname' id='fname' ref={nameRef} required/>
          <label htmlFor="url">Profile Photo URL</label>
          <input type='text' name='url' id='url' ref={photoUrlRef} required/>
          <button  className={classes['update-btn']} type="submit">Update</button>
          <button className={classes['cancel-btn']} onClick={hideProfileForm}>Cancel</button>
        </form>
      </section>}
    </div>
  );
};
export default Home;
