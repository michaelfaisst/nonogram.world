interface Props {
    error?: string;
}

const InputError = ({ error }: Props) => {
    return <p className="text-xs text-red-500">{error}</p>;
};

export default InputError;
