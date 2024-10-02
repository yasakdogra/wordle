interface KeyProps {
    value: string;
    known: string;
    onKeyPress: (key: string) => void;
}

export default function Key(props: KeyProps) {
    return (
        <kbd class="px-4 py-2 m-1 text-2xl font-semibold text-gray-800 
        bg-gray-100 border border-gray-200 rounded-lg 
        dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        className={`
            px-4 py-2 m-1 text-2xl font-semibold text-gray-800 
            bg-gray-100 border border-gray-200 rounded-lg 
            dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500
            ${props.known === 'correct' ? 'bg-green-500 text-white' : props.known === 'present' ? 'bg-yellow-400 text-white' : props.known === "absent" ? 'bg-neutral-400 text-white' : 'bg-white'}
            `}
        onClick={() => props.onKeyPress(props.value)}
        >
            {props.value}
        </kbd>
    )
}
