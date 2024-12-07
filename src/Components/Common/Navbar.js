import { Disclosure,  DisclosurePanel } from '@headlessui/react'
import {  useNavigate } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const navigate = useNavigate()
  return (
    <Disclosure as="nav" className="bg-white border-b shadow-md">
      <div className=" max-w-7xl px-2 sm:px-6 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center" onClick={() => navigate('/')}>
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-2xl font-semibold">
                Book Management System
              </div>
            </div>
          </div>
     
        </div>
      </div>
    </Disclosure>
  )
}
