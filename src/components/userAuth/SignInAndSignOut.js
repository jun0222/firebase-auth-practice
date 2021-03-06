import app from '../../firebase';
import {useState, useEffect} from 'react';
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';

const SignInAndSignOut = () => {
    const [isSignedIn, setIsSignedIn] = useState();
    const auth = getAuth(app);

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
            console.log(email.value, password.value)
            alert("Success sign in!!")
        }catch (error) {
            console.log(error.message);
            alert("sign in error!!")
        }
    }
    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const result = await signOut(auth);
            console.log(result);
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);
                console.log(user);
            } else {
                setIsSignedIn(false);
                console.log('User is signed out');
            }
        })
    }, []);
    return (
        <>
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
        <form onSubmit={handleSignOut} >
            <input type="submit" value="sign out" />
        </form>
        <div>
            {isSignedIn ? (
                <p>user is signed in</p>
            ):(
                <p>user is signed out</p>
            )}
        </div>
        </>
    )
}

export default SignInAndSignOut;