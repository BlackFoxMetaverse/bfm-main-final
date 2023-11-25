"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
const pathname = usePathname()

  return (
    <main
      className={`${pathname.startsWith("/auth") || pathname.startsWith("/profile/editProfile") ? "hidden" : "flex"} flex-col justify-end items-center pt-[57px] pb-[1.113px] px-0 w-full`}
    >
      <div className='mx-auto w-11/12'>Hello</div>
    </main>
  );
}

export default Header
