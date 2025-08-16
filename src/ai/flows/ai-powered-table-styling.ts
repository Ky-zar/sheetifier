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
- Use a clean, professional, and modern design.
- The table should have a width of 100%.
- Apply a subtle box-shadow to the table for depth.
- Use a light gray border for the table and cells.
- The header row should have a slightly darker background color and bold text.
- Use alternating row colors (zebra-striping) for the table body to improve readability.
- Add padding to cells for spacing.
- Align text to the left in all cells.
- Use a common, readable font like Arial or Helvetica.
- Ensure there is no vertical alignment style applied to cells.

Ensure that the output is valid HTML that includes the <table> tag and inline CSS styles.

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
