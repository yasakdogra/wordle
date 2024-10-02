import { WordType } from "../../state/wordleSlice";
import Letter from "../Letter";

interface WordProps {
    value: WordType
}

export default function Word(props:WordProps) {
    let word = props.value;
    if(word.length === 0)
    {
        for(let i = 0; i < 5; i++)
        {
            word.push({value: "", loc:"unknown"})
        }
    }
    return (
        <div class="flex my-1">
            {[...word].map(letter => (<Letter value={letter.value} loc={letter.loc} />))}
        </div>
    )
}
