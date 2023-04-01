import express from "express"
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"



config()

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })

)


const app = express();
app.use(express.static('public'));


app.get('/prompt/:input?', promptGptResponse);

async function promptGptResponse(request, response) {
    let input = JSON.stringify(request.params);


    const res = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
    })

    response.send(res.data.choices[0].message.content);
}



app.listen(3000, (() => {
    console.log(`Listening on port: ${process.env.PORT}`)
}))