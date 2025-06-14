interface ErrorStateProps {
    message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({message}) => (
    <div className="flex justify-center items-center mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold">{message}</h1>
        </div>
    </div>
);