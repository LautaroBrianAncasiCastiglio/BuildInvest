import HeroSection from "@/components/home/HeroSection";

export const metadata = {
    title: "BuildInvest",
    description:
        "Comenzá a invertir en proyectos inmobiliarios sin complicaciones técnicas, no necesitás una gran suma de dinero.",
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col items-center">
                <HeroSection />
            </main>
        </div>
    );
}
