import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store'
import { LocType, addChar, delChar, newGame, submitGuess } from '../../state/wordleSlice'
import Word from "../Word"
import Keyboard from '../Keyboard'
import { useEffect } from 'preact/hooks'


export default function Wordle () {
    const current = useSelector((state: RootState) => state.wordle.current)
    const guesses = useSelector((state: RootState) => state.wordle.guesses)
    const finished = useSelector((state: RootState) => state.wordle.finished)
    const secret = useSelector((state: RootState) => state.wordle.secret)
    const dispatch = useDispatch<AppDispatch>()

    const handleNewGameButton = () => {
        dispatch(newGame())

    }

    const handleKeyPress = (key: string) => {
        if(key === "ENTER")
            dispatch(submitGuess())
        else if(key === "DEL")
            dispatch(delChar())
        else
            dispatch(addChar(key))
    }

    useEffect(() => {
        document.addEventListener("keyup", (e) => {
            if(e.key === "Enter")
                dispatch(submitGuess())
            else if(e.key === "Backspace")
                dispatch(delChar())
            else if((e.key >= "A" && e.key <= "Z") || (e.key >= "a" && e.key <= "z"))
                dispatch(addChar(e.key.toUpperCase()))
        })
    }, [])

    return (
        <div class="flex flex-col mx-auto items-center">
            {finished && <div class="py-2"><h1 class="bg-gray-600 text-white px-2 py-2 rounded-md">{secret}</h1></div>}
            <button type="button" class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            onClick={(e) => {handleNewGameButton(); e.currentTarget.blur()}}
            >New Game</button>
            
            { guesses.map(guess => <Word value={guess} />) }
            {guesses.length < 6 && 
            <Word value={
                [...current].map((val) => {return {value: val as string, loc: "unknown" as LocType }})
                .concat(Array(5-current.length).fill({value: "" as string, loc: "unknown" as LocType }))
            } />
            }
            {guesses.length < 5 && Array(5 - guesses.length).fill(<Word value={[]}/>)}            
            
            <br />
            
            <Keyboard onKeyPress={handleKeyPress} />
        </div>
    )
}
