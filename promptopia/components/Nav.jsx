"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;
    const [provider, setProvider] = useState(null);
    const [toogleDropdown, setToogleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProvider(providers);
        };
        fetchProviders();
    }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
            src="/assets/images/logo.svg" 
            alt="Promptopia Logo"
            width={30}
            height={30}
            />
            <p className="logo_text">Promptopia</p>
        </Link>
        {/*Web Navigation*/}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className="black_btn">
                        Create Post
                    </Link>
                    <button type="button" 
                        className="outline_btn" onClick={signOut}>
                        Sign Out
                    </button>
                    <Link href='/profile'>
                        <Image
                            src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                        />
                    </Link>
                </div>
            ):
            (
                <div>
                    {provider && Object.values(provider).map((provider) => (
                        <button type="button"
                            key={provider.name}
                            className="black_btn" 
                            onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
        {/*Mobile Navigation*/}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    <Image 
                        src="/assets/images/logo.svg"
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="Profile"
                        onClick={() => setToogleDropdown((prev)=>!prev)}
                    />

                    {toogleDropdown && (
                        <div className="dropdown">
                            <Link
                                href='/profile'
                                className="dropdown_link"
                                onClick={() => setToogleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                                href='/create-prompt'
                                className="dropdown_link"
                                onClick={() => setToogleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                                className="mt-5 w-full black_btn"
                                onClick={()=>{
                                    signOut();
                                    setToogleDropdown(false);
                                }}>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ):
            (
                <div>
                    {provider && Object.values(provider).map((provider) => (
                            <button type="button"
                                key={provider.name}
                                className="black_btn" 
                                onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        ))}
                </div>
            )
            }
        </div>
    </nav>
  )
}

export default Nav