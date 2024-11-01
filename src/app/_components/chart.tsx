import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { PensionProjection } from "../page";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-4 border">
				<p className="font-bold mb-2">Age {label}</p>
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
				{payload.map((entry: any, index: number) => {
					// Custom names for each data key
					const nameMap: { [key: string]: string } = {
						pensionValue: "Projected Pension",
						targetValue: "Target Amount",
					};
					return (
						<p
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							style={{ color: entry.color }}
							className="text-sm"
						>
							{nameMap[entry.dataKey]}: £{entry.value.toLocaleString()}
						</p>
					);
				})}
			</div>
		);
	}
	return null;
};

export default function Chart({ data }: { data: PensionProjection[] }) {
	if (data.length === 0) {
		return null;
	}

	return (
		<div className="h-96 w-[1000px] flex items-center justify-center mt-8">
			<LineChart
				width={730}
				height={380}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="age" label={{ value: "Age", position: "bottom" }} />
				<YAxis
					tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
					label={{
						value: "Pension Value (£)",
						angle: -90,
						position: "insideLeft",
					}}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend
					formatter={(value) => {
						const nameMap: { [key: string]: string } = {
							pensionPot: "Projected Pension",
							targetPot: "Target Amount",
							withdrawals: "Annual Withdrawal",
						};
						return nameMap[value] || value;
					}}
				/>
				<Line type="monotone" dataKey="pensionValue" stroke="#8884d8" />
				<Line type="monotone" dataKey="targetValue" stroke="#82ca9d" />
			</LineChart>
		</div>
	);
}
