"use client";

import { useState } from "react";

import PensionForm, { type PensionFormData } from "./_components/pension-form";
import { START_AGE, MAX_AGE, ANNUAL_INTEREST_RATE } from "@/lib/constants";
import Chart from "./_components/chart";

export type PensionProjection = {
	year: number;
	age: number;
	pensionValue: number;
	phase: "Accumulation" | "Drawdown";
	targetValue?: number;
};

export default function HomePage() {
	const [pensionProjection, setPensionProjection] = useState<
		PensionProjection[]
	>([]);

	function onSubmit(values: PensionFormData) {
		calculatePensionProjection(values);
	}

	const calculatePensionProjection = ({
		desiredAnnualRetirementIncome,
		monthlyEmployerContribution,
		monthlyPersonalContribution,
		retirementAge,
		pensionPots,
	}: PensionFormData) => {
		const projection: PensionProjection[] = [];
		const currentYear: number = new Date().getFullYear();

		// calculate total value of pots
		let totalPot: number = pensionPots.reduce(
			(acc, pot) => acc + pot.balance,
			0,
		);

		const monthlyTotal: number =
			monthlyEmployerContribution + monthlyPersonalContribution;
		const yearsUntilRetirement: number = retirementAge - START_AGE;
		const yearsAfterRetirement: number = MAX_AGE - retirementAge;

		// calculate until retirement
		for (let year = 0; year <= yearsUntilRetirement; year++) {
			totalPot =
				totalPot * (1 + ANNUAL_INTEREST_RATE / 100) + monthlyTotal * 12;
			projection.push({
				year: currentYear + year,
				age: START_AGE + year,
				pensionValue: Math.round(totalPot),
				phase: "Accumulation",
			});
		}

		// calculate after retirement
		for (let year = 1; year <= yearsAfterRetirement; year++) {
			totalPot =
				(totalPot - desiredAnnualRetirementIncome) *
				(1 + ANNUAL_INTEREST_RATE / 100);
			projection.push({
				year: currentYear + yearsUntilRetirement + year,
				age: retirementAge + year,
				pensionValue: Math.round(totalPot),
				phase: "Drawdown",
			});
		}

		const requiredPot: number =
			desiredAnnualRetirementIncome * yearsAfterRetirement;
		const targetLine: PensionProjection[] = projection.map((point) => ({
			...point,
			targetValue: requiredPot,
		}));
		setPensionProjection(targetLine);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="min-w-[500px]">
				<PensionForm onSubmit={onSubmit} />
			</div>
			<Chart data={pensionProjection} />
		</main>
	);
}
