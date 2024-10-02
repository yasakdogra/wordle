import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Key from "../Key"


const KeyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["DEL", "Z", "X", "C", "V", "B", "N", "M", "ENTER"]
]

interface KeyboardProps {
    onKeyPress: (key: string) => void;
}

export default function Keyboard(props: KeyboardProps) {
    const present = useSelector((state: RootState) => state.wordle.present)
    const absent = useSelector((state: RootState) => state.wordle.absent)
    const correct = useSelector((state: RootState) => state.wordle.correct)

    return(
        <div className="keyboard">
            {KeyboardLayout.map((row, i) => (
                <div key={i} className="flex justify-center">
                    {row.map((key, j) => (
                        <Key key={j} value={key} onKeyPress={props.onKeyPress} known={correct.includes(key) ? 'correct' : present.includes(key) ? 'present' : absent.includes(key) ? 'absent' : ''} />
                    ))}
                </div>
            ))}
        </div>
    )
}