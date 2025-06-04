import Link from "next/link";
import Image from "next/image";
import React from "react";
import NavItems from "./NavItems";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="navbar flex justify-between items-center p-4 bg-transparent absolute top-0 left-0 right-0 z-10">
            <div className="flex-shrink-0">
                <Link href="/">
                    <div className="flex items-center justify-center gap-2.5 cursor-pointer">
                        {/*<Image src="/images/logo.svg" alt="Logo" width={46} height={44} />*/}
                        <div className="text-3xl font-semibold text-white">
                            GitDocs.
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="border border-white text-white hover:bg-white hover:text-black transition-colors rounded-4xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
