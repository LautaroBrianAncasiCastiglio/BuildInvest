import FAQ from "@/components/home/FAQ";
import HeroSection from "@/components/home/HeroSection";
import RecentProjects from "@/components/home/RecentProjects";

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
                <RecentProjects />
                <FAQ />
            </main>
        </div>
    );
}
