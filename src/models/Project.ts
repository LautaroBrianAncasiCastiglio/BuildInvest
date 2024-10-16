export type ProjectId = number;

export type ProjectNameSchema = name;
export type ProyectIntestRateSchema = interestRate;
export type ProjectLatitudeSchema = latitude;
export type ProjectLenghtCoordsSchema = lenghtCoords;

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
