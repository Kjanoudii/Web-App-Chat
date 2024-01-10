
import LoginButtons from "../control/LoginButtons"
export default function LoginFooter(prop) {

    const { noAccount, setNoAccount } = prop
    return (
        <>
            <div className="pass">Forgot Password?</div>

            <LoginButtons
                register={prop.register}
                signInWithGoogle={prop.signInWithGoogle}
                signInWithFacebook={prop.signInWithFacebook}
                logIn={prop.logIn}
                state={prop.state}
                Login={prop.Login}
                noAccount={noAccount}
            />


            <div className="signup_link">
                {noAccount ? " Already have an account?" : " Dont have an account?" }
                <a href="#" onClick={() => setNoAccount(!noAccount)}>
                    {noAccount ?  " Login " : " Register "}
                </a>
            </div>

        </>
    )
}