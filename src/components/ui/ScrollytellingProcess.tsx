import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code2, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Descubrimiento & Estrategia",
        description: "Analizamos tu negocio a fondo. No escribimos una sola línea de código hasta entender perfectamente qué problema estamos resolviendo y cuál es el impacto esperado.",
        icon: Lightbulb,
        color: "bg-yellow-500",
        stats: "Fase de Planificación"
    },
    {
        id: 2,
        title: "Ingeniería & Desarrollo",
        description: "Arquitectura escalable desde el día uno. Utilizamos stacks modernos como React, Node.js y Python para construir sistemas robustos, seguros y ultrarrápidos.",
        icon: Code2,
        color: "bg-blue-500",
        stats: "Fase de Desarrollo"
    },
    {
        id: 3,
        title: "Despliegue & CI/CD",
        description: "Infraestructura automatizada. Configuramos pipelines de integración continua para que cada actualización llegue a producción en segundos, sin tiempos de inactividad.",
        icon: Rocket,
        color: "bg-purple-500",
        stats: "Fase de Lanzamiento"
    },
    {
        id: 4,
        title: "Escalado & Crecimiento",
        description: "Tu software crece con vos. Monitoreamos el rendimiento y optimizamos la infraestructura para soportar miles de usuarios concurrentes sin transpirar.",
        icon: TrendingUp,
        color: "bg-green-500",
        stats: "Fase de Crecimiento"
    }
];

export const ScrollytellingProcess = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(1);

    // We keep the progress line purely visual
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    return (
        <section id="methodology" className="relative bg-black text-white" ref={containerRef}>
            <div className="relative">

                {/* STICKY CONTAINER (Background + Left Visuals) */}
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                    {/* BACKGROUND */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {/* Very subtle grid, barely visible */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        {/* Connecting Line */}
                        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />

                        {/* Progress Line */}
                        <motion.div
                            style={{ scaleY: smoothProgress }}
                            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-blue-500 -translate-x-1/2 origin-top"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full h-full">

                        {/* LEFT VISUALS - Controlled by activeStep state */}
                        <div className="hidden md:flex justify-center items-center h-full">
                            <div className="relative w-[400px] h-[400px]">
                                <AnimatePresence mode="popLayout">
                                    {steps.map((step) => {
                                        return activeStep === step.id ? (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, y: -50, rotateX: 20 }}
                                                transition={{
                                                    duration: 0.8,
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                                className="absolute inset-0 flex items-center justify-center p-8 perspective-1000"
                                            >
                                                <div className="relative w-full aspect-square glass rounded-[2.5rem] border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_80px_-20px_rgba(120,60,200,0.3)] bg-black/40 backdrop-blur-md">
                                                    {/* Glowing Background Blob */}
                                                    <div className={`absolute inset-0 opacity-20 blur-[80px] ${step.color}`}></div>

                                                    <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-2xl shadow-black/50 relative z-10`}>
                                                        <step.icon size={48} className="text-white drop-shadow-md" />
                                                    </div>

                                                    <h3 className="text-4xl font-bold font-display mb-3 relative z-10 text-white">{step.stats}</h3>
                                                    <div className="flex items-center gap-2 text-green-400 text-xs font-mono bg-green-900/30 px-4 py-1.5 rounded-full border border-green-500/20 relative z-10 tracking-wider uppercase">
                                                        <CheckCircle2 size={12} />
                                                        <span>Active Phase</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : null;
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* RIGHT SIDE SPACER */}
                        <div></div>
                    </div>
                </div>

                {/* SCROLLING OVERLAY - Triggers updates */}
                <div className="relative z-20 -mt-[100vh]">
                    <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="hidden md:block"></div> {/* Spacer */}

                        <div className="flex flex-col pb-[40vh]"> {/* Added more bottom padding for end scroll */}
                            {steps.map((step, i) => (
                                <motion.div
                                    key={step.id}
                                    initial={i === 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                                    onViewportEnter={() => setActiveStep(step.id)}
                                    className={`flex flex-col justify-center py-10 ${i === 0 ? 'min-h-[60vh] mt-[20vh]' : 'min-h-[60vh]'}`}
                                >
                                    <div
                                        className={`p-8 rounded-[2rem] border transition-all duration-500 ease-out ${activeStep === step.id ? 'bg-black border-primary/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] opacity-100 scale-100' : 'bg-white/5 border-white/5 opacity-40 grayscale scale-100'}`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className={`text-5xl font-black font-display select-none transition-colors duration-700 ${activeStep === step.id ? 'text-white/10' : 'text-white/5'}`}>0{step.id}</span>
                                            <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center md:hidden shadow-lg`}>
                                                <step.icon size={20} className="text-white" />
                                            </div>
                                        </div>
                                        <h3 className={`text-2xl md:text-4xl font-bold mb-4 font-display leading-tight transition-colors duration-500 ${activeStep === step.id ? 'text-white' : 'text-slate-600'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-lg leading-relaxed transition-colors duration-500 ${activeStep === step.id ? 'text-slate-400' : 'text-slate-700'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
