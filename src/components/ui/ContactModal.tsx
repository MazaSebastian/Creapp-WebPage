import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-4"
                    >
                        <div className="bg-surface-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 right-0 p-4 z-10">
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {isSubmitted ? (
                                <div className="p-12 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-2">¡Mensaje Enviado!</h3>
                                    <p className="text-slate-400">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                                </div>
                            ) : (
                                <div className="p-8">
                                    <div className="text-center mb-8">
                                        <h2 className="font-display text-2xl font-bold mb-2">Hablemos de tu Proyecto</h2>
                                        <p className="text-slate-400 text-sm">Cuéntanos tus ideas y te ayudaremos a construirlas.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input placeholder="Nombre" required />
                                            <Input placeholder="Teléfono" type="tel" required />
                                        </div>
                                        <Input placeholder="Email" type="email" required />

                                        <textarea
                                            placeholder="Describe la problemática o idea..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none h-24 text-sm"
                                            required
                                        ></textarea>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Presupuesto</label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="0.00"
                                                        type="number"
                                                        className="flex-1"
                                                        required
                                                    />
                                                    <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors font-bold w-24 text-center">
                                                        <option className="bg-surface-dark">USD</option>
                                                        <option className="bg-surface-dark">ARS</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Urgencia</label>
                                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors">
                                                    <option className="bg-surface-dark text-slate-400">Seleccionar...</option>
                                                    <option className="bg-surface-dark">Baja (1-3 meses)</option>
                                                    <option className="bg-surface-dark">Media (1 mes)</option>
                                                    <option className="bg-surface-dark">Alta (ASAP)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full mt-4 h-12 text-base shadow-lg shadow-primary/20"
                                            size="lg"
                                            isLoading={isLoading}
                                        >
                                            Enviar Solicitud
                                            {!isLoading && <Send className="ml-2 w-4 h-4" />}
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
