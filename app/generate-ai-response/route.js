import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request) {
    // const searchParams = request.nextUrl.searchParams;
    // const userMessage = searchParams.get("user_message")
    // console.log(userMessage)
    // console.log(await request.json())
    const { userMessage } = await request.json();

    try{
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: "You are a friendly, helpful, and knowledgeable AI voice assistant designed to talk to users in a natural, human-like way. You speak in short, clear, and polite sentences, just like a real human assistant. Use a warm and conversational tone. When answering, keep your replies concise, informative, and easy to understand. If a user asks for help, respond with empathy. Feel free to ask clarifying questions if the user’s intent is unclear. Avoid sounding robotic. Speak like you're chatting with a friend." },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
        });
        
        // console.log(response);

        return Response.json({
            success: true,
            messages: response.choices[0].message.content
        }, { status: 200 })
    } catch (err) {
        return Response.json({
            success: false,
            message: "Failed to generate AI suggessions" + err
        }, { status: 500 })
    }
}