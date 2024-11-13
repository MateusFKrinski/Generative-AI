import { openai } from '../config/OpenAi.ts';
// @ts-ignore
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';

async function handleChatFlow(userMessage: string) {
  let phraseEnglish: string | null = null;
  let response = '';

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key != null) {
      phraseEnglish = sessionStorage.getItem(key);
    }
  }

  const closeRequest = await validateState([
    {
      role: 'system',
      content:
        'Sou um assistente virtual. Verifico se o usuário deseja encerrar o contato. Retorno "true" para sim e "false" para não.',
    },
    {
      role: 'user',
      content: `Solicitação do usuário: ${userMessage}`,
    },
  ]);
  if (closeRequest === 'true') {
    return 'Quando precisar de mim, estarei aqui!';
  }

  const nextPhraseRequest = await validateState([
    {
      role: 'system',
      content:
        'Sou um assistente de idiomas. Verifico se o usuário solicitou uma nova frase em inglês, respondendo "true" ou "false".',
    },
    {
      role: 'user',
      content: `Solicitação do usuário: ${userMessage}`,
    },
  ]);
  if (nextPhraseRequest === 'true') {
    response = await validateState([
      {
        role: 'system',
        content:
          'Sou um assistente de idioma, retorno uma frase em inglês sem introdução.',
      },
      {
        role: 'user',
        content: 'Forneça uma frase simples em inglês, por favor.',
      },
    ]);

    sessionStorage.setItem(new Date().toString(), response);

    return `Aqui está uma nova frase: "${response}"`;
  }

  const grammarRequest = await validateState([
    {
      role: 'system',
      content:
        'Sou um assistente virtual. Verifico se a resposta do usuário corresponde a uma solicitação de entender o contexto e as regras gramaticais.Eu respondo validando com "true" ou "false".',
    },
    {
      role: 'user',
      content: `Solicitação do sistema: entender contexto e regras gramaticais. Resposta do usuário: ${userMessage}`,
    },
  ]);
  if (grammarRequest === 'true' && phraseEnglish) {
    response = await validateState([
      {
        role: 'system',
        content:
          'Sou um assistente de aprendizado de inglês. Explico o contexto e as regras gramaticais da frase fornecida.',
      },
      {
        role: 'user',
        content: `Explique o contexto e as regras gramaticais para a frase: ${phraseEnglish}. Retorne apenas um breve parágrafo, explicando de forma mais rápida possível, sem títulos ou outras sessões que não seja um parágrafo`,
      },
    ]);
    return `Contexto gramatical: ${response}`;
  }

  const translationCheck = await validateState([
    {
      role: 'system',
      content:
        'Sou um assistente de tradução. Verifico se a tradução fornecida corresponde à frase em inglês e respondo com "true" ou "false".',
    },
    {
      role: 'user',
      content: `Frase em inglês: ${phraseEnglish}. Tradução fornecida: ${userMessage}`,
    },
  ]);
  if (translationCheck === 'true') {
    return 'Correto! Sua tradução está exata.';
  } else if (translationCheck === 'false' && phraseEnglish) {
    return 'Parece que a tradução não está correta. Tente novamente!';
  }

  return 'Desculpe, não entendi sua solicitação. Posso ajudá-lo com a tradução, contexto gramatical ou fornecer uma nova frase!';
}

async function validateState(
  messagesInput: Array<ChatCompletionMessageParam>
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messagesInput,
    });
    return response.choices?.[0]?.message?.content?.trim() ?? '';
  } catch (error) {
    return 'Tivemos um erro, por favor aguarde e tente novamente!';
  }
}

export default handleChatFlow;
