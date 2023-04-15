import { AnimatePresence, motion } from "framer-motion";

interface Props {
    error?: string;
}

const InputError = ({ error }: Props) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    className="text-xs text-red-500"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InputError;
