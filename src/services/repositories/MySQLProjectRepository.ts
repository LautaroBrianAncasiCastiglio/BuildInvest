import type { ArchitectId } from "@/models/Architect";
import type Project from "@/models/Project";
import type { ProjectId } from "@/models/Project";
import type ProjectRepository from "@/models/ProjectRepository";
import MySQLPool from "@/services/MySQLPool";
import { ResultSetHeader, type RowDataPacket } from "mysql2";

interface DBProject extends RowDataPacket {
    idproject: number;
    architect: number;
    name: string;
    latitude: string;
    length: string;
    interest_rate: number;
    min: number;
    max: number;
    start_date: Date;
    estimated_end: Date;
    total: number;
}

class MySQLProjectRepository implements ProjectRepository {
    async create(project: Project): Promise<Project> {
        try {
            const [res] = await MySQLPool.execute<ResultSetHeader>(
                "INSERT INTO project (`architect`, `name`, `latitude`, `length`, `interest_rate`, `min`, `max`, `start_date`, `estimated_end`, `total`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    project.architectId,
                    project.name,
                    project.latitude,
                    project.lengthCoord,
                    project.interestRate,
                    project.minAmountRequired,
                    project.maxToInvest,
                    project.startDate,
                    project.estimatedEndDate,
                    project.total,
                ],
            );
            return {
                ...project,
                id: res.insertId,
            };
        } catch (err) {
            throw err;
        }
    }
    async findOne(projectId: ProjectId): Promise<Project | null> {
        const [result] = await MySQLPool.query<DBProject[]>(
            "SELECT * FROM project WHERE idproject = ?",
            [projectId],
        );

        const foundProject = result[0];

        if (!foundProject) return null;

        return this.adaptProject(foundProject);
    }
    async findByIdProject(projectId: ProjectId): Promise<Project | null> {
        const [result] = await MySQLPool.query<DBProject[]>(
            "SELECT * FROM project WHERE idproject = ?",
            [projectId],
        );
        const foundProject = result[0];

        if (!foundProject) return null;
        return this.adaptProject(foundProject);
    }
    async findByArchitect(architectId: ArchitectId): Promise<Project[]> {
        const [result] = await MySQLPool.query<DBProject[]>(
            "SELECT * FROM project WHERE architect = ?",
            [architectId],
        );

        return result.map((project) => this.adaptProject(project));
    }
    async findAll(): Promise<Project[]> {
        const [result] = await MySQLPool.query<DBProject[]>(
            "SELECT * FROM project",
        );

        return result.map((project) => this.adaptProject(project));
    }
    async update(project: Project): Promise<Project> {
        await MySQLPool.execute(
            "UPDATE project SET architect = ?, name = ?, latitude = ?, length = ?, interest_rate = ?, min = ?, max = ?, start_date = ?, estimated_end = ?, total = ? WHERE idproject = ?",
            [
                project.architectId,
                project.name,
                project.latitude,
                project.lengthCoord,
                project.interestRate,
                project.minAmountRequired,
                project.maxToInvest,
                project.startDate,
                project.estimatedEndDate,
                project.total,
                project.id,
            ],
        );
        return project;
    }

    async delete(projectId: ProjectId): Promise<void> {
        await MySQLPool.execute("DELETE FROM project WHERE idproject = ?", [
            projectId,
        ]);
    }

    private adaptProject(dbProject: DBProject): Project {
        return {
            id: dbProject.idproject,
            architectId: dbProject.architect,
            name: dbProject.name,
            latitude: dbProject.latitude,
            lengthCoord: dbProject.length,
            interestRate: dbProject.interest_rate,
            minAmountRequired: dbProject.min,
            maxToInvest: dbProject.max,
            startDate: dbProject.start_date,
            estimatedEndDate: dbProject.estimated_end,
            total: dbProject.total,
        };
    }
}

export default MySQLProjectRepository;
