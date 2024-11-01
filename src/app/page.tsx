"use client";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {  useForm } from "react-hook-form";
import { z } from "zod";

const ANNUAL_INTEREST_RATE = 0.049;
const MAX_AGE = 81;
const START_AGE = 25;

const formSchema = z.object({
  desiredAnnualRetirementIncome: z.number().min(1),
  monthlyEmployerContribution: z.number().min(1),
  monthlyPersonalContribution: z.number().min(1),
  retirementAge: z.number().min(START_AGE).max(MAX_AGE),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredAnnualRetirementIncome: 0,
      monthlyEmployerContribution: 0,
      monthlyPersonalContribution: 0,
      retirementAge: START_AGE,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="desiredAnnualRetirementIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired Annual Retirement Income</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
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
                <Input type="number" placeholder="0" {...field} />
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
                <Input type="number" placeholder="0" {...field} />
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
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
      </Form>
    </main>
  );
}
