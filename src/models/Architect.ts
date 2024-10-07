export type ArchitectId = number;
export type ArchitectName = string;
export type ArchitectEmail = string;
export type ArchitectDni = string;
export type ArchitectRegistrationNumber = string;

export interface Architect {
    id: ArchitectId;
    name: ArchitectName;
    email: ArchitectEmail;
    dni: ArchitectDni;
    registrationNumber: ArchitectRegistrationNumber;
}

export default Architect;
