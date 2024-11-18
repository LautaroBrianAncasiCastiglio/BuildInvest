import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
    title: "Preguntas frecuentes - BuildInvest",
    description: "Preguntas frecuentes, dudas y comentarios de los usuarios.",
};

export default function FrecuentAsks() {
    const faqs = [
        {
            question: "¿Cómo puedo registrarme como arquitecto o inversor?",
            answer: "Puedes registrarte seleccionando el tipo de usuario en el formulario de registro. Si eres arquitecto, podrás crear y gestionar tus proyectos. Si eres inversor, podrás ver y aportar a los proyectos disponibles.",
        },
        {
            question: "¿Cómo funcionan los intereses en pesos y dólares?",
            answer: "Los inversores pueden obtener rendimientos en pesos o en dólares, según la modalidad de inversión seleccionada. Los intereses se calculan de acuerdo al tipo de cambio actual y las condiciones del proyecto.",
        },
        {
            question: "¿Es seguro invertir a través de esta plataforma?",
            answer: "La plataforma utiliza estándares de seguridad para proteger la información y las transacciones de los usuarios. Además, cada proyecto cuenta con detalles y análisis de viabilidad para que los inversores puedan tomar decisiones informadas.",
        },
        {
            question:
                "¿Qué requisitos debe cumplir un arquitecto para publicar un proyecto?",
            answer: "Los arquitectos deben completar su perfil profesional y enviar la documentación necesaria que valide su experiencia. Cada proyecto será revisado antes de ser publicado en la plataforma.",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col items-center py-8 md:py-16 lg:py-24">
                <div className="max-w-2xl mx-auto p-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
                        Preguntas Frecuentes
                    </h1>

                    <div className="block md:hidden">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg shadow"
                            >
                                <h3 className="text-lg font-medium my-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-700">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
