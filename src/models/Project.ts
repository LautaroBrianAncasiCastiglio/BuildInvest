export type ProjectId = number;

export type ProjectNameSchema = string;
export type ProjectEstimatedEndDate = Date;
export type minAmountRequired = Number;

interface Project {
    id: ProjectId;
    architectId: number;
    name: ProjectNameSchema;
    latitude: string;
    lengthCoord: string;
    interestRate: number;
    minAmountRequired: minAmountRequired;
    maxToInvest: number;
    startDate: Date;
    estimatedEndDate: ProjectEstimatedEndDate;
    total: number;
}

export default Project;
