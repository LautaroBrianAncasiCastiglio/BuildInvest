import type { ProjectId } from "@/models/Project";
import type User from "@/models/User";

interface Investment {
    userEmail: User["email"];
    projectId: ProjectId;
    amount: number;
    date: Date;
}

export default Investment;
