import OpenAI from 'openai';

const API_KEY =
  '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';

export const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});
