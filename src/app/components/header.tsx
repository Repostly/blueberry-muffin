'use client';

import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { Video, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="#">
                <Video className="h-6 w-6" />
                <span className="sr-only">Repostly</span>
            </Link>
            <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/"
                >
                    Home
                </Link>
                {status === "authenticated" && (
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="/upload"
                    >
                        Upload
                    </Link>
                )}
                {status === "unauthenticated" ? (
                    <Link
                        className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1"
                        href="/login"
                    >
                        Login
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Image
                                    src={session?.user?.image || '/placeholder.svg'}
                                    alt="Profile"
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link
                                    className="flex flex-row justify-center items-center"
                                    href="/connect"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    <h1>Connect</h1>
                                </Link> 
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => signOut()}>
                                <span className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1">
                                    Logout
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </nav>
        </header>
    );
}

