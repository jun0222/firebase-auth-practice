import app from '../../firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const SignIn = () => {
    const handleSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const auth = getAuth(app);
        try {
            signInWithEmailAndPassword(auth, email.value, password.value)
            alert("Success sign in!!")
        }catch (error) {
            alert(error);
        }
    }
    return (
        <form style={{marginTop: '150px'}} onSubmit={handleSignIn}>
            <div>
                <label>Enter your email:</label>
                <input name="email" type="email"/>
            </div>
            <div>
                <label>Enter your passoword:</label>
                <input name="password" type="password"/>
            </div>
            <div>
                <label></label>
                <input type="submit" value="Sign in"/>
            </div>
        </form>
    )
}

export default SignIn;