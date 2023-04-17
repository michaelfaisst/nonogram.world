import { useRouter } from "next/router";
import { LogOut, Sun } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

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
    const router = useRouter();

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
                                    <div className="text-xs text-gray-400">
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
                <Button
                    variant="subtle"
                    onClick={() => void router.push("/auth/sign-up")}
                >
                    Sign up
                </Button>
                <Button onClick={() => void signIn()}>Sign in</Button>
            </>
        );
    };

    return (
        <div className="flex justify-center border-b border-b-slate-100 dark:border-b-slate-800">
            <div className="mx-auto flex h-16 w-full max-w-6xl flex-row items-center justify-between py-4">
                <h1 className="font-light text-slate-900 dark:text-white">
                    nonogram.world
                </h1>
                <div className="flex flex-row gap-2">{renderUserSection()}</div>
            </div>
        </div>
    );
};

export default Header;
