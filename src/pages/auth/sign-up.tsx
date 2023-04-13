import { useForm } from "react-hook-form";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button, Input, Label } from "~/components/ui";
import InputError from "~/components/ui/input-error";
import { api } from "~/utils/api";

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
    const signUpMutation = api.auth.signUp.useMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        await signUpMutation.mutateAsync({
            email: data.email,
            userName: data.userName,
            password: data.password
        });
    };

    return (
        <div className="w-screen min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center flex-col">
            <h2 className="text-sm font-light text-slate-900 dark:text-white mb-4">
                nonogram.world
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-lg flex flex-col">
                <h1 className="font-semibold text-center text-lg mb-6">
                    Sign up
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
                        <Label htmlFor="userName" className="block mb-2">
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

                    <div className="mb-4">
                        <Label
                            htmlFor="passwordConfirmation"
                            className="block mb-2"
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
                    <div className="my-3 text-center text-slate-400 text-sm">
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
