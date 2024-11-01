import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { START_AGE, MAX_AGE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	desiredAnnualRetirementIncome: z.coerce.number().min(1),
	monthlyEmployerContribution: z.coerce.number().min(1),
	monthlyPersonalContribution: z.coerce.number().min(1),
	retirementAge: z.coerce.number().min(START_AGE).max(MAX_AGE),
	pensionPots: z
		.object({
			name: z.string().min(1, { message: "Name is required" }),
			balance: z.coerce.number().min(0),
		})
		.array(),
});
export type PensionFormData = z.infer<typeof formSchema>;

export default function PensionForm({
	onSubmit,
}: { onSubmit: (data: PensionFormData) => void }) {
	const form = useForm<PensionFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			desiredAnnualRetirementIncome: 0,
			monthlyEmployerContribution: 0,
			monthlyPersonalContribution: 0,
			retirementAge: START_AGE,
			pensionPots: [],
		},
	});

	const addPensionPot = () => {
		const currentPots = form.getValues("pensionPots") as {
			name: string;
			balance: number;
		}[];
		form.setValue("pensionPots", [...currentPots, { name: "", balance: 0 }]);
	};

	const removePensionPot = (index: number) => {
		const currentPots = form.getValues("pensionPots") as {
			name: string;
			balance: number;
		}[];
		form.setValue(
			"pensionPots",
			currentPots.filter((_, i) => i !== index),
		);
	};

	return (
		<Form {...form}>
			<form className="space-y-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="desiredAnnualRetirementIncome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Desired Annual Retirement Income</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="monthlyEmployerContribution"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Monthly Employer Contribution</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="monthlyPersonalContribution"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Monthly Personal Contribution</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="retirementAge"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Retirement Age</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="space-y-2">
					{form.watch("pensionPots").map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} className="items-center space-x-2 flex">
							<FormField
								control={form.control}
								name={`pensionPots.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pension Pot Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`pensionPots.${index}.balance`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Balance</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="button"
								variant="destructive"
								onClick={() => removePensionPot(index)}
								className="h-fit mt-8"
							>
								Delete
							</Button>
						</div>
					))}
				</div>
				<Button type="button" onClick={addPensionPot}>
					Add Pension Pot
				</Button>
				<div className="w-full">
					<Button className="w-full" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
