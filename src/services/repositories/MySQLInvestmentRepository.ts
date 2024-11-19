import type Investment from "@/models/Investment";
import type InvestmentRepository from "@/models/InvestmentRepository";
import type Project from "@/models/Project";
import MySQLPool from "@/services/MySQLPool";
import type { RowDataPacket } from "mysql2";

interface DBInvestment extends RowDataPacket {
    user_email: string;
    project: number;
    amount: number;
    date: Date;
}

class MySQLInvestmentRepository implements InvestmentRepository {
    async investProject(
        project: Project,
        email: string,
        amount: number,
    ): Promise<void> {
        await MySQLPool.execute(
            "INSERT INTO investment (user_email, project, amount) VALUES (?, ?, ?)",
            [email, project.id, amount],
        );
        await MySQLPool.execute(
            "UPDATE project SET total = total + ? WHERE idproject = ?",
            [amount, project.id],
        );
    }

    async findByEmail(email: Investment["userEmail"]): Promise<Investment[]> {
        const [result] = await MySQLPool.query<DBInvestment[]>(
            "SELECT * FROM investment WHERE user_email = ?",
            [email],
        );

        return result.map(this.adaptInvestment);
    }

    adaptInvestment(dbInvestment: DBInvestment): Investment {
        return {
            userEmail: dbInvestment.user_email,
            amount: dbInvestment.amount,
            projectId: dbInvestment.project,
            date: dbInvestment.date,
        };
    }
}

export default MySQLInvestmentRepository;
