import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { LogOut, Sun } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Switch
} from "../ui";

const Header = () => {
    const { data: session, status } = useSession();
    const { theme, setTheme } = useTheme();

    const renderAvatar = (className?: string) => {
        return (
            <Avatar className={className}>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        );
    };

    const renderUserSection = () => {
        if (status === "loading") {
            return null;
        }

        if (session) {
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {renderAvatar()}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex flex-row gap-3">
                                {renderAvatar("h-6 w-6")}
                                <div>
                                    <div className="mb-0.5">
                                        {session.user.name}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        {session.user.email}
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    );
                                }}
                            >
                                <Sun className="mr-2 h-4 w-4" />
                                <span className="mr-4">Dark Mode</span>
                                <Switch checked={theme === "dark"} />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => void signOut()}
                                className="cursor-pointer"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        }

        return (
            <>
                <Button variant="subtle" onClick={() => void signIn()}>
                    Sign in
                </Button>
                <Button>Sign up</Button>
            </>
        );
    };

    return (
        <div className="flex flex-row py-4 justify-between items-center h-20">
            <h1 className="font-light text-slate-900 dark:text-white">
                nonogram.world
            </h1>
            <div className="flex flex-row gap-2">{renderUserSection()}</div>
        </div>
    );
};

export default Header;
