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
  prompt: `You are an expert in modern and accessible HTML table styling. Your task is to take a raw HTML table and apply inline CSS to make it clean, professional, and highly readable.

**Styling & Accessibility Requirements:**

1.  **Overall Table:**
    *   Set \`width: 100%;\` and \`border-collapse: collapse;\`.
    *   Apply a subtle shadow for depth: \`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);\`.
    *   Use a common, readable sans-serif font like 'Inter', 'Helvetica', or 'Arial'.
    *   Round the corners of the table container if possible, or ensure the final presentation appears in a rounded container.

2.  **Headers (\`<th>\`):**
    *   Set background color to a light gray (\`#f8f9fa\`).
    *   Text should be bold (\`font-weight: 600;\`) and aligned to the left.
    *   Add ample padding: \`padding: 12px 15px;\`.
    *   Add a bottom border: \`border-bottom: 2px solid #dee2e6;\`.
    *   **Crucially for accessibility, add the \`scope="col"\` attribute to each \`<th>\` element.**

3.  **Cells (\`<td>\`):**
    *   Add padding for spacing: \`padding: 12px 15px;\`.
    *   Align text to the left.
    *   Add a subtle border between rows: \`border-bottom: 1px solid #e9ecef;\`.

4.  **Rows (\`<tr>\`):**
    *   Implement zebra-striping for readability. Use \`#ffffff\` for odd rows and a very light gray (\`#f8f9fa\`) for even rows using the \`:nth-child(even)\` selector in a style block if necessary, or apply styles directly.
    *   Ensure there are no vertical borders between cells.
    *   Make sure the last row in the \`<tbody>\` does not have a bottom border.

5.  **Final Output:**
    *   Return ONLY the complete, valid HTML for the styled table, starting with \`<table>\` and ending with \`</table>\`.
    *   All styles must be inline CSS applied directly to the elements. Do not use \`<style>\` blocks unless absolutely necessary for pseudo-selectors.

**Input HTML Table:**
\`\`\`html
{{{tableHtml}}}
\`\`\`

**Output Styled and Accessible HTML Table:**`,
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
