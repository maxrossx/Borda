import * as React from 'react'
import { Link, NavLink, useLocation } from '@remix-run/react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TemplateIcon, UserCircleIcon } from '@heroicons/react/outline'
import { MakaraIcon } from './icons/MakaraIcon'
import clsx from 'clsx'

const activeStyle = {
    backgroundColor: "#000",
};

function DropdownMenu(props) {
    const menuButton = props.menuButton
    const menuItems = props.menuItems
    const align = props.align

    return (
        <Menu as='div' className={'relative mr-3'}>
            {({ open }) => (
                <>
                    <Menu.Button
                    // as='div'
                    // // className={`flex items-center h-full hover:bg-blue-600 '${open ? 'bg-black' : ''}`}
                    // className={clsx('flex items-center h-full hover:bg-black', { ['bg-black']: open })}

                    >
                        <div className={clsx('flex items-center h-14 hover:bg-black', { ['bg-black']: open })}
                        >
                            {props.children}
                            <div className='w-5 h-full flex flex-row justify-center items-center'>
                                <ChevronDownIcon
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    strokeWidth={1}
                                />
                            </div>
                        </div>
                    </Menu.Button>

                    <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            as="div"
                            className={`absolute z-50 mt-2 m${Array.from(align)[0]}-3 ${align}-0 w-60 min-w-full shadow-2xl bg-zinc-800 focus:outline-none`}
                        >
                            <div className="flex flex-col py-2">
                                {menuItems.map((item, idx) => (
                                    // <DropDownMenuItem label={item} />
                                    <Menu.Item key={idx}>
                                        {({ active }) => (
                                            <NavLink
                                                style={({ isActive }) =>
                                                    isActive ? activeStyle : undefined
                                                }
                                                to={`/${item}`}
                                                className={`px-2 ${active ? "bg-blue-600" : ""} hover:bg-blue-600`}
                                            >
                                                <div className="h-8 flex flex-row items-center">
                                                    <div className="normal-case text-sm pl-3">
                                                        {item.charAt(0).toUpperCase() + item.slice(1).split('-').join(' ')}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

const locations = ["/tasks", "/cards"]

function Navigation() {
    let actualLocation = useLocation()
    return (
        <div className='flex-none flex flex-row items-center'>
            <DropdownMenu
                menuItems={["home", "cards/1"]}
                align='left'
                className='flex-none'
            >
                <MakaraIcon className="w-10 h-10 ml-3" />
            </DropdownMenu>
            {locations.map((location) => (
                actualLocation.pathname.includes(location) ?
                    (<div className='capitalize text-sm border-x border-gray-500 px-4'>
                        {location.slice(1)}
                    </div>) : null
            ))}
        </div>
    )
}

function Profile({ player }) {
    let location = useLocation()
    console.log(player)
    return (
        <>
            {player ? (
                <DropdownMenu menuItems={['settings', "sign-out"]} align='right'>
                    <div className='flex flex-row items-center h-full pl-3 mr-3'>
                        <UserCircleIcon className="h-9 w-9" strokeWidth={1} />
                        <div className='w-48 pl-4 flex flex-col items-start'>
                            <div className=" text-gray-200 text-sm font-semibold">{player.displayName}</div>
                            <div className='text-xs'>{player.Team ? player.Team : 'No Team'}</div>
                        </div>
                    </div>
                </DropdownMenu>
            ) : null}
        </>
    )
}

function Navbar({ data }) {
    let location = useLocation()
    if (location.pathname === "" || location.pathname === "/") return null

    return (
        <header className='w-full h-14 bg-zinc-800 text-white flex flex-row items-center justify-between'>
            <Navigation />
            <div className='flex-auto text-center px-4 text-red-500 text-sm justify-self-center'>Timer</div>
            <Profile className='flex-none' player={data} />
        </header>
    )
}

export { Navbar }