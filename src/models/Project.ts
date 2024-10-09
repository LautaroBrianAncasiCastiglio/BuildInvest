export type ProjectId = number;

interface Project {
    id: number
    architectId: number
    name: string
    latitude: string
    length: string
    interestRate: number
    minAmountRequired: number
    maxToInvest: number
    startDate: Date
    estimatedEndDate: Date
    total: number
}

export default Project