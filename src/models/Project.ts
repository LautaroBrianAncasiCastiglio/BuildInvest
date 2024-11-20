export type ProjectId = number;

interface Project {
    id: ProjectId;
    architectId: number;
    name: string;
    description: string;
    latitude: string;
    lengthCoord: string;
    interestRate: number;
    minAmountRequired: number;
    maxToInvest: number;
    startDate: Date;
    estimatedEndDate: Date;
    total: number;
}

export default Project;
