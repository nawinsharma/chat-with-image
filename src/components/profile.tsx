"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import GoogleSignInButton from "./GoogleSignInButton";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Profile = () => {
    const { data: session } = useSession();
    console.log(session);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }
    return (
        <div>
            {session ? (
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage className="rounded-full h-13 w-13" src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                        <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{session.user?.name}</span>
                    <Button
                        variant='destructive'
                        className='bg-red-500 hover:bg-red-600'
                        size='icon'
                        onClick={handleSignOut}
                    >
                        <LogOut className='h-5 w-5' />
                    </Button>

                </div>
            ) : (
                <GoogleSignInButton>Sign in</GoogleSignInButton>
            )}
        </div>
    );
};

export default Profile;
