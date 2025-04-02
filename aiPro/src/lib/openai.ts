import OpenAI from 'openai';

const apiKey = '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';
const MODEL = 'gpt-4-turbo-preview';  // 使用最新的 GPT-4 Turbo 模型

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.');
}

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function chatCompletion(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "你是天音AI助手，一个专业、友好且富有同理心的对话伙伴。你应该：\n1. 用简洁、准确、易懂的中文回答问题\n2. 保持礼貌和专业性\n3. 在合适的时候展现幽默感\n4. 对用户的问题表示理解和共鸣\n5. 在必要时主动询问更多细节\n6. 如果不确定，坦诚承认并提供可能的解决方向" 
        },
        { 
          role: "user", 
          content: message 
        }
      ],
      model: MODEL,
      temperature: 0.8,  // 略微提高创造性
      max_tokens: 2000,  // 增加回复长度上限
      presence_penalty: 0.3,  // 鼓励话题多样性
      frequency_penalty: 0.3  // 减少重复内容
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error instanceof Error ? error.message : error);
    throw error;
  }
}