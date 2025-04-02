import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const MODEL = 'gpt-4-turbo-preview';

if (!apiKey) {
  throw new Error('OpenAI API key is missing');
}

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

interface PaperGenerationParams {
  title: string;
  outline?: string;
  educationLevel: 'vocational' | 'undergraduate' | 'graduate';
  wordCount: number;
  language: 'cn' | 'en';
  additionalInfo?: string;
}

export async function generatePaper(params: PaperGenerationParams) {
  const { title, outline, educationLevel, wordCount, language, additionalInfo } = params;

  const systemPrompt = `你是一个专业的学术论文写作助手。请根据以下要求生成论文：
- 教育程度：${educationLevel === 'graduate' ? '研究生' : educationLevel === 'undergraduate' ? '本科' : '专科'}
- 预期字数：${wordCount}字
- 语言：${language === 'cn' ? '中文' : '英文'}
- 要求：
  1. 保持学术严谨性
  2. 结构清晰完整
  3. 论述有理有据
  4. 符合学术写作规范
  5. 包含必要的引用和参考文献`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `标题：${title}\n大纲：${outline || '请自动生成合适的大纲'}\n补充信息：${additionalInfo || '无'}` }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 4000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });

    return {
      content: completion.choices[0].message.content,
      outline: outline || generateOutlineFromContent(completion.choices[0].message.content)
    };
  } catch (error) {
    console.error('论文生成错误:', error instanceof Error ? error.message : error);
    throw error;
  }
}

function generateOutlineFromContent(content: string): string {
  // 从生成的内容中提取大纲结构
  const lines = content.split('\n');
  const outlineLines = lines.filter(line => 
    line.match(/^[0-9]+\./) || // 匹配数字编号
    line.match(/^[一二三四五六七八九十]、/) || // 匹配中文数字编号
    line.match(/^第[一二三四五六七八九十]章/) // 匹配章节标题
  );
  
  return outlineLines.join('\n');
}

export async function generateReference(topic: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "你是一个学术参考文献生成助手。请为给定主题生成合适的学术参考文献列表，包含中英文文献，按照学术规范格式化。" 
        },
        { 
          role: "user", 
          content: `请为主题"${topic}"生成10条高质量的学术参考文献。` 
        }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('参考文献生成错误:', error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function improveWriting(content: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "你是一个学术写作优化助手。请改进提供的学术文本，提升其学术性、逻辑性和表达准确性，同时保持原有的核心观点。" 
        },
        { 
          role: "user", 
          content: `请优化以下学术文本：\n${content}` 
        }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('文本优化错误:', error instanceof Error ? error.message : error);
    throw error;
  }
}