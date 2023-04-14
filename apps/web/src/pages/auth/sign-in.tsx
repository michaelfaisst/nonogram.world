import Link from "next/link";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";

import DiscordIcon from "~/components/icons";
import { Button, Input, Label } from "~/components/ui";
import InputError from "~/components/ui/input-error";

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required")
});

type FormData = z.infer<typeof schema>;

const SignIn = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) =>
        await signIn("credentials", {
            ...data,
            callbackUrl: router.query.callbackUrl as string
        });

    const signInWithDiscord = async () => {
        await signIn("discord", {
            callbackUrl: router.query.callbackUrl as string
        });
    };

    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
            <h2 className="mb-4 text-sm font-light text-slate-900 dark:text-white">
                nonogram.world
            </h2>
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h1 className="mb-6 text-center text-lg font-semibold">
                    Sign in
                </h1>

                <form
                    className="flex w-80 flex-col"
                    onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                >
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2 block">
                            Email
                        </Label>
                        <Input
                            id="email"
                            {...register("email")}
                            className="mb-1"
                        />
                        <InputError error={errors.email?.message} />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" className="mb-2 block">
                            Password
                        </Label>
                        <Input
                            id="password"
                            className="mb-1"
                            {...register("password")}
                            type="password"
                        />
                        <InputError error={errors.password?.message} />
                    </div>

                    <Button type="submit">Sign in</Button>
                    <div className="my-3 flex flex-row items-center justify-between text-sm text-slate-400">
                        <Link href="/auth/sign-up">Create account</Link>

                        <Link href="/auth/forgot-password">
                            Forgot password
                        </Link>
                    </div>
                </form>

                <div className="my-4 flex flex-row items-center gap-4 text-slate-500">
                    <div className="h-px flex-1 border-t border-t-slate-300 dark:border-t-slate-700"></div>
                    <div>or</div>
                    <div className="h-px flex-1 border-t border-t-slate-300 dark:border-t-slate-700"></div>
                </div>

                <Button
                    variant="subtle"
                    onClick={() => void signInWithDiscord()}
                >
                    <DiscordIcon className="mr-2 w-5 fill-slate-900 dark:fill-slate-300" />
                    Sign in with Discord
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
