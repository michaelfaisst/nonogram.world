import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
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
        <div className="w-screen min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center flex-col">
            <h2 className="text-sm font-light text-slate-900 dark:text-white mb-4">
                nonogram.world
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-lg flex flex-col">
                <h1 className="font-semibold text-center text-lg mb-6">
                    Sign in
                </h1>

                <form
                    className="flex flex-col w-80"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-4">
                        <Label htmlFor="email" className="block mb-2">
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
                        <Label htmlFor="password" className="block mb-2">
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
                    <div className="my-3 flex flex-row items-center justify-between text-slate-400 text-sm">
                        <Link href="/auth/sign-up">Create account</Link>

                        <Link href="/auth/forgot-password">
                            Forgot password
                        </Link>
                    </div>
                </form>

                <div className="my-4 flex flex-row items-center gap-4 text-slate-500">
                    <div className="flex-1 border-t border-t-slate-300 dark:border-t-slate-700 h-px"></div>
                    <div>or</div>
                    <div className="flex-1 border-t border-t-slate-300 dark:border-t-slate-700 h-px"></div>
                </div>

                <Button variant="subtle" onClick={signInWithDiscord}>
                    <DiscordIcon className="w-5 fill-slate-900 dark:fill-slate-300 mr-2" />
                    Sign in with Discord
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
