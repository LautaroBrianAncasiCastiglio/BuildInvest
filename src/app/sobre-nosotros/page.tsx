import { Users, Target, Heart } from "lucide-react";

export const metadata = {
    title: "Sobre nosotros - BuildInvest",
    description: "Sobre nosotros, la historia de BuildInvest.",
};

export default function AboutUs() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <section className="text-center py-12 md:py-24 px-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                            Acerca de BuildInvest
                        </h1>
                        <p className="mx-auto max-w-2xl mt-6 text-foreground/90 text-lg">
                            BuildInvest es una startup en crecimiento formada
                            por un equipo de desarrolladores apasionados por la
                            innovación tecnológica. Nos enfocamos en crear
                            soluciones centradas en el cliente, siempre buscando
                            la excelencia y el impacto positivo en cada proyecto
                            que emprendemos.
                        </p>
                    </section>

                    <section className="py-6 px-4">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900">
                                    <Users
                                        className="h-6 w-6 text-primary"
                                        aria-hidden="true"
                                    />
                                    Nuestra Misión
                                </dt>
                                <dd className="mt-4 text-base text-gray-600">
                                    Nos especializamos en ofrecer soluciones
                                    disruptivas que ponen al cliente en el
                                    centro de todo lo que hacemos. Nuestro
                                    equipo de desarrolladores trabaja
                                    incansablemente para crear productos y
                                    servicios que no solo resuelvan problemas,
                                    sino que también impulsen el progreso y la
                                    eficiencia en diversos sectores.
                                </dd>
                            </div>

                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900">
                                    <Target
                                        className="h-6 w-6 text-primary"
                                        aria-hidden="true"
                                    />
                                    Nuestros Valores
                                </dt>
                                <dd className="mt-4 text-base text-gray-600">
                                    Nos guiamos por principios fundamentales:
                                    integridad, innovación, colaboración y
                                    excelencia. Estos valores son la base de
                                    todo lo que hacemos y cómo interactuamos con
                                    nuestros clientes y entre nosotros.
                                </dd>
                            </div>

                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900">
                                    <Heart
                                        className="h-6 w-6 text-primary"
                                        aria-hidden="true"
                                    />
                                    Nuestro Compromiso
                                </dt>
                                <dd className="mt-4 text-base text-gray-600">
                                    Estamos comprometidos con la satisfacción
                                    del cliente, la responsabilidad social y el
                                    desarrollo sostenible. Creemos en hacer
                                    negocios de una manera que beneficie tanto a
                                    la sociedad como al medio ambiente.
                                </dd>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
