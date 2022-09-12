import { FlagIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { Link, useSearchParams } from '@remix-run/react'

const taskColors = new Map([
    // ["WEB", "bg-yellow-500"],
    // ["CRYPTO", "bg-lime-500"],
    // ["FORENSICS", "bg-fuchsia-500"],
    // ["OSINT", "bg-blue-500"],
    // ["REVERSE", "bg-rose-500"],
    // ["BINARY", "bg-red-500"],
    // ["OTHER", "bg-violet-500"],
    ["WEB", "yellow"],
    ["CRYPTO", "lime"],
    ["FORENSICS", "fuchsia"],
    ["OSINT", "blue"],
    ["REVERSE", "rose"],
    ["BINARY", "red"],
    ["OTHER", "violet"],
]);

export default ({ task, isToggled }) => {
    const categoryIcon = Array.from(task.category)[0];
    const color = taskColors.get(task.category)
    const [searchParams] = useSearchParams();

    return (
        <Link
            to={`./${task.id}?${searchParams}`}
            className="grid grid-rows-2 gap-2 py-4 px-5 border border-gray-300 rounded-md"
        >
            <div className=" h-10 flex flex-row items-center">
                <div className={`capitalize flex-none h-10 w-10 bg-${color}-500 font-semibold text-base text-center text-white leading-10 capitalize rounded-sm`}>
                    {categoryIcon}
                </div>
                <div className="grow ml-2 overflow-hidden">
                    <p className="font-medium whitespace-nowrap">{task.name}</p>
                    <p className="text-gray-400 text-sm">{task.category}</p>
                </div>
                <div className="flex-none font-medium text-2xl">
                    {task.points}
                </div>
            </div>
            <div className="h-10 flex flex-row justify-between items-center text-gray-400 font-normal">
                <div className="flex felx-row items-end">
                    <FlagIcon className='w-5 h-5' strokeWidth={1} />
                    <p className="ml-2"><span className="mr-1">1</span>solve(s)</p>
                </div>
                <div className="flex flex-row items-end">
                    <ThumbUpIcon className="w-5 h-5" strokeWidth={1} />
                    <p className="ml-2">5</p>
                </div>
            </div>
        </Link>
    )
}