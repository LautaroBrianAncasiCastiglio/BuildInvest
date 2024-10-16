export type ProjectId = number;

export type ProjectNameSchema = string;
export type ProjectLatitudeSchema = number;
export type ProjectLenghtCoordsSchema = number;
export type ProjectMinAmountRequired = number;

interface Project {
    id: number;
    architectId: number;
    name: string;
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
