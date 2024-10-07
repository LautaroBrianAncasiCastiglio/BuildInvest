import type { ArchitectId } from "@/models/Architect";
import type Architect from "@/models/Architect";
import type ArchitectRepository from "@/models/ArchitectRepository";
import MySQLPool from "@/services/MySQLPool";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

interface DBArchitect extends RowDataPacket {
    idarchitect: number;
    complete_name: string;
    dni: string;
    n_matricula: string;
    email: string;
}

class MySQLArchitectRepository implements ArchitectRepository {
    /**
     * Creates a new architect in the database.
     *
     * @param architect The architect to create.
     * @returns The created architect with its ID.
     * @throws If the underlying MySQL operation fails.
     */
    async create(architect: Architect): Promise<Architect> {
        const [result] = await MySQLPool.execute<ResultSetHeader>(
            "INSERT INTO architect (complete_name, dni, n_matricula, email) VALUES (?, ?, ?, ?)",
            [
                architect.name,
                architect.dni,
                architect.registrationNumber,
                architect.email,
            ],
        );
        return {
            id: result.insertId,
            name: architect.name,
            dni: architect.dni,
            registrationNumber: architect.registrationNumber,
            email: architect.email,
        };
    }

    /**
     * Retrieve all architects from the database.
     *
     * @returns An array of all architects in the database.
     * @throws If the underlying MySQL operation fails.
     */
    async findAll(): Promise<Architect[]> {
        const [rows] = await MySQLPool.execute<DBArchitect[]>(
            "SELECT idarchitect AS id, complete_name AS name, dni, n_matricula AS registrationNumber, email FROM architect",
        );

        const architects = rows.map((architect) => ({
            id: architect.idarchitect,
            name: architect.complete_name,
            dni: architect.dni,
            registrationNumber: architect.n_matricula,
            email: architect.email,
        }));

        return architects;
    }

    /**
     * Find an architect by their ID.
     *
     * @param id The ID of the architect to find.
     * @returns The architect if found, or null if not found.
     * @throws If the underlying MySQL operation fails.
     */
    async findOne(id: ArchitectId): Promise<Architect | null> {
        const [row] = await MySQLPool.execute<DBArchitect[]>(
            "SELECT idarchitect AS id, complete_name AS name, dni, n_matricula AS registrationNumber, email FROM architect WHERE idarchitect = ? LIMIT 1",
            [id],
        );

        if (!row.length) {
            return null;
        }

        const foundArchitect = row[0];

        return {
            id: foundArchitect.idarchitect,
            name: foundArchitect.complete_name,
            dni: foundArchitect.dni,
            registrationNumber: foundArchitect.n_matricula,
            email: foundArchitect.email,
        };
    }

    /**
     * Update an architect in the database.
     *
     * @param architect The architect with the updates. The `id` property must be the same as the one in the database.
     * @returns The updated architect.
     * @throws If the underlying MySQL operation fails.
     */
    async update(architect: Architect): Promise<Architect> {
        await MySQLPool.execute(
            "UPDATE architect SET complete_name = ?, dni = ?, n_matricula = ?, email = ? WHERE idarchitect = ?",
            [
                architect.name,
                architect.dni,
                architect.registrationNumber,
                architect.email,
                architect.id,
            ],
        );
        return architect;
    }

    /**
     * Deletes an architect from the database.
     *
     * @param id The ID of the architect to delete.
     * @throws If the underlying MySQL operation fails.
     */
    async delete(id: ArchitectId): Promise<void> {
        await MySQLPool.execute("DELETE FROM architect WHERE idarchitect = ?", [
            id,
        ]);
    }
}

export default MySQLArchitectRepository;
