"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type Project from "@/models/Project";
import { addMonths, differenceInMonths, format } from "date-fns";
import { es } from "date-fns/locale";

const chartConfig = {
    amount: {
        label: "Monto acumulado",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function InterestChart(props: { project: Project; amount: number }) {
    const { project, amount } = props;

    const numberOfMonths = differenceInMonths(
        project.estimatedEndDate,
        project.startDate,
    );

    const chartData = new Array(numberOfMonths || 1)
        .fill(0)
        .map((_, index) => ({
            month: addMonths(new Date(project.startDate), index),
            amount:
                amount * Math.pow(1 + project.interestRate / 12 / 100, index),
        }));

    if (amount === 0)
        return (
            <Card>
                <CardContent className="p-4">
                    <p>Ingrese un monto para calcular las ganancias</p>
                </CardContent>
            </Card>
        );

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {props.project.interestRate}% de interés anual
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                format(value, "LLL", { locale: es })
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="amount"
                            type="linear"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
