import type { ArchitectId } from "@/models/Architect";
import type { ProjectId } from "@/models/Project";
import type Project from "@/models/Project";

interface ProjectRepository {
    create(project: Project): Promise<Project>;
    findOne(projectId: ProjectId): Promise<Project | null>;
    findByArchitect(architectId: ArchitectId): Promise<Project[]>;
    findAll(): Promise<Project[]>;
    findLimited(limit: number): Promise<Project[]>;
    update(project: Project): Promise<Project>;
    delete(projectId: ProjectId): Promise<void>;
}

export default ProjectRepository;
