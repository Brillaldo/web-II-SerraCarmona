export default function MyInput(params) {
    const { type, placeholder, valor, funcion, name } = params;
    return (
        <input className="myInput" name={name} type={type} placeholder={placeholder} value={valor} onChange={funcion} />
    )
}