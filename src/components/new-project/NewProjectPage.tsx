import NewProjectForm from "@/components/new-project/NewProjectForm";

function NewProjectPage() {
    return (
        <main className="flex flex-col gap-6 md:gap-12 justify-center items-center w-full py-16 px-4 md:py-24">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Crear nuevo proyecto
                </h1>
            </header>
            <NewProjectForm />
        </main>
    );
}

export default NewProjectPage;
