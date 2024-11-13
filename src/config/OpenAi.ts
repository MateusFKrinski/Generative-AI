import OpenAI from 'openai';

const API_KEY = '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';

export const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});
