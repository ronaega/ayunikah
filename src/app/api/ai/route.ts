import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';

const extractOutputText = (data: any) => {
  if (typeof data.output_text === 'string') return data.output_text;

  return data.output
    ?.flatMap((item: any) => item.content ?? [])
    ?.filter((content: any) => content.type === 'output_text' && typeof content.text === 'string')
    ?.map((content: any) => content.text)
    ?.join('\n')
    ?.trim();
};

export async function POST(req: Request) {
  try {
    const { prompt, coupleState } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-5.2';

    if (!apiKey) {
      return NextResponse.json({
        reply: 'OpenAI is not configured yet. Add OPENAI_API_KEY to your environment variables, then restart the app.'
      });
    }

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        store: false,
        instructions: [
          'You are Ayunikah Coach, a warm and practical marriage preparation assistant.',
          'Use the couple state as context for budgeting, profile completion, course progress, invitations, and wedding planning.',
          'Keep answers concise, kind, and actionable. Do not invent private facts when fields are blank.',
        ].join(' '),
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `Couple state:\n${JSON.stringify(coupleState ?? {}, null, 2)}\n\nUser question:\n${prompt}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `OpenAI request failed: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = extractOutputText(data);

    return NextResponse.json({
      reply: reply || 'I could not generate a response this time. Please try again.'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
