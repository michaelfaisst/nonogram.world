import Link from "next/link";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { api } from "~/utils/api";
import { Button, Input, Label } from "~/components/ui";
import InputError from "~/components/ui/input-error";

const schema = z
    .object({
        email: z.string().min(1, "Email is required").email("Invalid email"),
        userName: z.string().min(1, "Username is required"),
        password: z
            .string()
            .min(8, "Passwords need to be at least 8 characters"),
        passwordConfirmation: z.string()
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    });

type FormData = z.infer<typeof schema>;

const SignUp = () => {
    const router = useRouter();
    const signUpMutation = api.auth.signUp.useMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        await signUpMutation.mutateAsync(
            {
                email: data.email,
                userName: data.userName,
                password: data.password
            },
            {
                onSuccess: () => {
                    router.push("/auth/account-created");
                }
            }
        );
    };

    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
            <h2 className="mb-4 text-sm font-light text-slate-900 dark:text-white">
                nonogram.world
            </h2>
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h1 className="mb-6 text-center text-lg font-semibold">
                    Sign up
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
                        <Label htmlFor="userName" className="mb-2 block">
                            Username
                        </Label>
                        <Input
                            id="userName"
                            {...register("userName")}
                            className="mb-1"
                        />
                        <InputError error={errors.userName?.message} />
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

                    <div className="mb-4">
                        <Label
                            htmlFor="passwordConfirmation"
                            className="mb-2 block"
                        >
                            Password confirmation
                        </Label>
                        <Input
                            id="passwordConfirmation"
                            className="mb-1"
                            {...register("passwordConfirmation")}
                            type="password"
                        />
                        <InputError
                            error={errors.passwordConfirmation?.message}
                        />
                    </div>

                    <Button type="submit">Create Account</Button>
                    <div className="my-3 text-center text-sm text-slate-400">
                        <span>Already have an account? </span>
                        <Link href="/auth/sign-in" className="text-slate-900">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
