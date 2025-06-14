import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "../../types/product.ts";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface QuestionsAndAnswersModalProps {
    personName: string;
    items: NonNullable<Product["details"]>["questions_and_answers"];
    picture: string;
    isOpen: boolean;
    onClose: () => void;
}

export const QuestionsAndAnswersModal: React.FC<QuestionsAndAnswersModalProps> = ({ items, picture, isOpen, onClose, personName }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div
                ref={modalRef}
                className="relative bg-[#121212] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-white">Q&A</h2>

                <div className="space-y-6">
                    {items?.map((item, index) => (
                        <div key={index} className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-900/50 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                        className="text-pink-400 text-xl"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="p-4 bg-black/30 border border-pink-900/50 rounded-lg rounded-tl-none">
                                        <div className="text-white font-medium prose prose-invert">
                                            <ReactMarkdown>
                                                {item.question}
                                            </ReactMarkdown>
                                        </div>

                                    </div>
                                    <p className="text-xs text-white/50 mt-1 ml-1">Admin</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-pink-900/50">
                                    <img
                                        src={picture}
                                        alt="Owner"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="p-4 bg-black/30 border border-pink-900/50 rounded-lg rounded-tl-none">
                                        <div className="text-white/80 prose prose-invert">
                                            <ReactMarkdown>
                                                {item.answer}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/50 mt-1 ml-1">{personName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};