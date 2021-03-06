import { useState } from "react"
import { Button, BUTTON_TYPE_CLASSES} from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";
import {ButtonsContainer, SignInContainer} from './sign-in-form.styles.jsx'
import { useDispatch } from "react-redux";
import { googleSignInStart } from "../../store/user/user.action";
import { emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email:'',
    password:'',
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch()

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    
    const signInWithGoogle = () => {
        dispatch(googleSignInStart())
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found': 
                    alert('no user associated with this email')
                    break
                default: console.log(error)
            }
        }
    }
    return (
        <SignInContainer>
            <h2>Already Have an account?</h2>
            <span>Sign in with your email and pasword</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                    required
                    />

                <FormInput 
                    label="Password"
                    type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                    required
                />
                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}