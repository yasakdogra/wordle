import { LetterType } from "../../state/wordleSlice"

export default function Letter(props:LetterType) {
    return (
        <div className={`flex items-center justify-center h-14 w-14 p-4 m-1 text-2xl font-bold border-2 rounded-lg
            ${props.loc === 'correct' ? 'bg-green-500 text-white' : props.loc === 'present' ? 'bg-yellow-400 text-white' : props.loc === "absent" ? 'bg-neutral-400 text-white' : 'bg-white'}`}
        >{props.value}</div>
    )
}
