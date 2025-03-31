import MyInput from "./MyInput"
import "../../style/form.css"
import { useContext } from "react"
import { UserContext } from "../../context/user-context"



export default function Form() {

    return (

        <FormContent />

    )
}


function FormContent() {
    const { user, setUser } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };
    const inputName = {
        type: "text",
        placeholder: "Name",
        valor: user.name,
        funcion: handleChange,
        name: "name"
    }
    const inputEmail = {
        type: "email",
        placeholder: "Email",
        valor: user.email,
        funcion: handleChange,
        name: "email"
    }
    const inputAge = {
        type: "number",
        placeholder: "Age",
        valor: user.age,
        funcion: handleChange,
        name: "age"
    }
    return (
        <form className="myForm">
            <div>
                <MyInput {...inputName} />
            </div>
            <div>
                <MyInput {...inputEmail} />
            </div>
            <div>
                <MyInput {...inputAge} />
            </div>
        </form>
    )
}