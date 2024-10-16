import type Architect from "@/models/Architect";
import type { ArchitectDni, ArchitectId } from "@/models/Architect";

interface ArchitectRepository {
    create(architect: Architect): Promise<Architect>;
    findAll(): Promise<Architect[]>;
    findOne(id: ArchitectId): Promise<Architect | null>;
    findByDni(dni: ArchitectDni): Promise<Architect | null>;
    update(architect: Architect): Promise<Architect>;
    delete(id: ArchitectId): Promise<void>;
}

export default ArchitectRepository;
