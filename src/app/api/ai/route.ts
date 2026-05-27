import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, coupleState } = await req.json();

    // Template showing how to integrate real Gemini API inside route handler:
    /*
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Ayunikah Marriage Preparation Coach. Current couple state: ${JSON.stringify(coupleState)}. Answer the user prompt: ${prompt}`
            }]
          }]
        })
      });
      const data = await response.json();
      return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
    }
    */

    // Fallback Mock AI responses for demonstration
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    return NextResponse.json({ 
      reply: `Hi! This is a secure server-side message from Ayunikah AI assistant API endpoint on Vercel. Database is fully synced and prepared for your big day!` 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
