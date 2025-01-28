import { SignIn } from '@clerk/react-router'
import './signInPage.css'

const SignInPage  = () => {
    return(
        <div className='signInPage'>
            <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard"/>
            </div>
    )
}

export default  SignInPage