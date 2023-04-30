import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(undefined);

        const response = await signIn("credentials", {
            ...data,
            redirect: false,
            callbackUrl: router.query.callbackUrl as string
        });

        setLoading(false);

        if (response?.ok) {
            router.push(response.url ?? "/");
        } else {
            setError(response?.error);
        }
    };

    const signInWithDiscord = async () => {
        await signIn("discord", {
            callbackUrl: router.query.callbackUrl as string
        });
    };

    const renderError = () => {
        if (!error) {
            return null;
        }

        const errorMessage =
            error === "CredentialsSignin"
                ? "Invalid user or credentials"
                : "An error occurred";

        return (
            <motion.div
                className="mb-4 flex flex-row items-center gap-2 rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-sm text-red-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <AlertCircle />
                {errorMessage}
            </motion.div>
        );
    };

    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
            <div className="mb-6 flex flex-col items-center">
                <Image
                    alt="nonogram.world logo"
                    src="/logo.png"
                    className="mb-2 h-10 w-10"
                    width={40}
                    height={40}
                />
                <h2 className="text-sm tracking-tighter">nonogram.world</h2>
            </div>
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h1 className="mb-6 text-center text-lg font-semibold tracking-tight">
                    Sign in
                </h1>

                <AnimatePresence>{renderError()}</AnimatePresence>

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
                            autoComplete="email"
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
                            autoComplete="current-password"
                        />
                        <InputError error={errors.password?.message} />
                    </div>

                    <Button type="submit" loading={loading}>
                        Sign in
                    </Button>
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
