import Button from '@mui/material/Button';
import { ChangeEvent, useState } from 'react'
import { signIn } from '../../store/thunks/authThunks';
import { useAppDispatch } from '../../store/store';

export default function SignIn() {

    const [pass, setPass] = useState("");
    const [username, setUserName] = useState("");

    const dispatch = useAppDispatch();

    const handleUsernameChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setUserName(evt.target.value)
    }

    const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPass(evt.target.value)
    }

    const handleSignIn = (e: any) => {
        e.preventDefault();
        dispatch(signIn({
            email: username,
            password: pass
        })).then(resp => {
            console.log(resp)
            if (resp.payload.status === 401) {
                alert("Username or Password is incorrect!!")
            } else if (resp.payload.status && resp.payload.status !== 200) {
                alert("Request could not be completed !! Please try again later.")
            }
        });
    }

    return (
        <section className="signin-cmpnt w-full h-full flex justify-center mt-48">
            <div className="absolute top-2 left-2">
                <img src="/img/tecnita_logo.png" alt="tecnita logo" className='h-8 w-8' />
            </div>
            <form className="sic-box w-96 h-48 border border-gray-800/50 rounded-md p-4" onSubmit={handleSignIn}>
                <div className="sic-field flex items-center justify-start m-2">
                    <div className="label w-1/3">Email : </div>
                    <div className="inputf w-2/3">
                        <input type="text" name="username" id="username" onChange={handleUsernameChange} className='border border-gray-900/50 rounded-md w-full h-10 p-2' />
                    </div>
                </div>
                <div className="sic-field flex items-center justify-start m-2">
                    <div className="label w-1/3">Password : </div>
                    <div className="inputf w-2/3">
                        <input type="password" name="password" id="password" onChange={handlePasswordChange} className='border border-gray-900/50 rounded-md w-full h-10 p-2' />
                    </div>
                </div>
                <div className="btn flex justify-end m-4">
                    <Button variant="contained" className="ml-24" size='large' type="submit">Login</Button>
                </div>
            </form>
        </section>
    )
}
