import type Investment from "@/models/Investment";
import type Project from "@/models/Project";

interface InvestmentRepository {
    investProject(
        project: Project,
        email: string,
        amount: number,
    ): Promise<void>;
    findByEmail(email: Investment["userEmail"]): Promise<Investment[]>;
}

export default InvestmentRepository;
