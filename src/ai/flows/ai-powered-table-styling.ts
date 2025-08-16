'use server';
/**
 * @fileOverview An AI-powered table styling flow.
 *
 * - aiPoweredTableStyling - A function that styles an HTML table using AI.
 * - AIPoweredTableStylingInput - The input type for the aiPoweredTableStyling function.
 * - AIPoweredTableStylingOutput - The return type for the aiPoweredTableStyling function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredTableStylingInputSchema = z.object({
  tableHtml: z
    .string()
    .describe('The HTML of the table to be styled. Must include <table> tags.'),
});
export type AIPoweredTableStylingInput = z.infer<typeof AIPoweredTableStylingInputSchema>;

const AIPoweredTableStylingOutputSchema = z.object({
  styledTableHtml: z
    .string()
    .describe('The AI-styled HTML of the table, including <table> tags.'),
});
export type AIPoweredTableStylingOutput = z.infer<typeof AIPoweredTableStylingOutputSchema>;

export async function aiPoweredTableStyling(input: AIPoweredTableStylingInput): Promise<AIPoweredTableStylingOutput> {
  return aiPoweredTableStylingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredTableStylingPrompt',
  input: {schema: AIPoweredTableStylingInputSchema},
  output: {schema: AIPoweredTableStylingOutputSchema},
  prompt: `You are an AI expert in HTML table styling. Your job is to take an HTML table as input and style it to be more readable and visually appealing.

You should apply the following styling guidelines:
- Use alternating row colors to improve readability.
- Adjust column widths to fit the content appropriately.
- Make font adjustments (size, family) for better aesthetics.
- use periwinkle as a subtle accent color for headers, rules, or borders.

Ensure that the output is valid HTML that includes the <table> tag.

Input HTML Table:
{{{tableHtml}}}

Output styled HTML Table:`,
});

const aiPoweredTableStylingFlow = ai.defineFlow(
  {
    name: 'aiPoweredTableStylingFlow',
    inputSchema: AIPoweredTableStylingInputSchema,
    outputSchema: AIPoweredTableStylingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
