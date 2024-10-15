import NewArchitectForm from "@/components/new-architect/NewArchitectForm";

function NewArchitectPage() {
    return (
        <main className="flex flex-col gap-6 md:gap-12 justify-center items-center w-full py-16 px-4 md:py-24">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Registrarme como arquitecto
                </h1>
            </header>
            <NewArchitectForm />
        </main>
    );
}

export default NewArchitectPage;
