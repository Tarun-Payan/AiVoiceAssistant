import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
    const { userMessage } = await request.json();

    console.log(userMessage)

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: userMessage }] }],
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        const audioBuffer = Buffer.from(data, 'base64');
        // console.log(data)
        // console.log(async data.blob())
        const blob = await data.blob();
        console.log(blob)

        return Response.json({
            success: true,
            messages: audioBuffer
        }, { status: 200 })
    } catch (err) {
        return Response.json({
            success: false,
            message: "Failed to generate AI suggessions" + err
        }, { status: 500 })
    }
}