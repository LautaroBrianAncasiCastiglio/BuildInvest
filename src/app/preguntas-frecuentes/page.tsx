import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
    return (
        <section className="relative flex flex-col items-center w-full bg-foreground/5">
            <div className="max-w-4xl flex flex-col gap-12 items-center w-full py-24 lg:py-30 px-4">
                <h2 className="w-full text-center text-2xl md:text-3xl font-bold">
                    Preguntas frecuentes
                </h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-lg"
                >
                    <AccordionItem value="1">
                        <AccordionTrigger>
                            ¿Cómo puedo registrarme como arquitecto o inversor?
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                            Puedes comenzar registrándote como inversor y luego
                            enviar una petición para ser arquitecto. Si eres
                            arquitecto, podrás crear y gestionar tus proyectos.
                            Si eres inversor, podrás ver y aportar a los
                            proyectos disponibles.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="2">
                        <AccordionTrigger>
                            ¿Cómo funcionan los intereses en pesos y dólares?
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                            Los inversores pueden obtener rendimientos en pesos
                            o en dólares, según la modalidad de inversión
                            seleccionada. Los intereses se calculan de acuerdo
                            al tipo de cambio actual y las condiciones del
                            proyecto.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="3">
                        <AccordionTrigger>
                            ¿Es seguro invertir a través de esta plataforma?
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                            La plataforma utiliza estándares de seguridad para
                            proteger la información y las transacciones de los
                            usuarios. Además, cada proyecto cuenta con detalles
                            y análisis de viabilidad para que los inversores
                            puedan tomar decisiones informadas.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="4">
                        <AccordionTrigger className="text-start">
                            ¿Qué requisitos debe cumplir un arquitecto para
                            publicar un proyecto?
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                            Los arquitectos deben completar su perfil
                            profesional y enviar la documentación necesaria que
                            valide su experiencia. Cada proyecto será revisado
                            antes de ser publicado en la plataforma.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}

export default FAQ;
