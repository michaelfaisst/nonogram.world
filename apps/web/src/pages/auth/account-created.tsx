const AccountCreated = () => {
    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
            <h2 className="mb-4 text-sm font-light text-slate-900 dark:text-white">
                nonogram.world
            </h2>
            <div className="flex max-w-lg flex-col rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h1 className="mb-6 text-center text-lg font-semibold">
                    Account created 🎉
                </h1>
                <p className="mb-3">Awesome, thank you for signing up!</p>
                <p className="mb-6">
                    We&apos;ve just sent you an email with a link to active your
                    account.
                </p>

                <p className="text-sm text-slate-500">
                    Didn&apos;t receive a confirmation mail? <br />
                    <span className="cursor-pointer text-slate-900">
                        Click here
                    </span>{" "}
                    to get another one.
                </p>
            </div>
        </div>
    );
};

export default AccountCreated;
