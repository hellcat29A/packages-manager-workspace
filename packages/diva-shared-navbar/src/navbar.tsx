'use client'
import React from 'react'
import { Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NextUIProvider } from '@nextui-org/react'
export default function SharedNavbar() {
    const navItems: { label: string, link: string }[] = [
        { label: "Home", link: '/home' },
        { label: "About Us", link: '/about-us' },
        { label: "Services", link: '/services' },
    ]
    const scrollToTop = () => {
        window.scroll(0, 0)
    }
    const [isMenuOpen, setIsMenuOpen] = React.useReducer((current) => !current, false)



    return (
        <NextUIProvider>
            <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} position='sticky'>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}

                        className='sm:hidden' />
                </NavbarContent>
                <NavbarBrand>
                    <Image src='/public/images/logo.png' className='grayscale w-12' />
                </NavbarBrand>

                <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                    {
                        navItems.map((item: { label: string, link: string }, index: number) => (
                            <NavbarItem key={index}>
                                <Link size='lg' href={item.link} onClick={() => { scrollToTop() }} color="foreground" className="font-semibold text-red-500 hover:text-blue-500  ">{item.label}</Link>
                            </NavbarItem>
                        ))
                    }


                </NavbarContent>
                <NavbarMenu>
                    {navItems.map((item, index) => (
                        <NavbarMenuItem key={`${index}`}>
                            <Link color="foreground" href={item.link} onClick={() => { setIsMenuOpen() }}>{item.label}</Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>


        </NextUIProvider>
    )
}