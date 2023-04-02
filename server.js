import express, { response } from "express"
import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import { readFileSync, writeFile } from "fs"
import { finished } from "stream";


let data = readFileSync('msgs.json');
let msgs = JSON.parse(data);


config()

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })

)


const app = express();
app.use(express.static('public'));


app.get('/prompt/:role?/:content?', promptGptResponse);

async function promptGptResponse(request, response) {

    let msgs = JSON.parse(readFileSync('msgs.json'))

    //update msgs with user prompt
    msgs.msgs.push({ role: request.params.role, content: request.params.content });
    let data = JSON.stringify(msgs);
    writeFile('msgs.json', data, finished)

    function finished(err) {
        console.log("ADDED MSG")
    }

    //call API
    const res = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: msgs.msgs.slice(1).slice(-5),
        max_tokens: 4000,
    })

    //update msgs with response prompt
    msgs.msgs.push({ role: "system", content: res.data.choices[0].message.content });
    let resdata = JSON.stringify(msgs);
    writeFile('msgs.json', resdata, finished)

    response.send(res.data.choices[0].message.content);
}

app.get('/all', sendAllMessages);

function sendAllMessages(request, response) {
    response.send(JSON.stringify(msgs));
}


app.get('/add/:role?/:content?', addMessage);

function addMessage(request, response) {

    msgs.msgs.push({ role: request.params.role, content: request.params.content });
    let data = JSON.stringify(msgs);
    writeFile('msgs.json', data, finished)
    response.send("added to msgs");

    function finished(err) {
        console.log("ADDED MSG")
    }
}



app.listen(3000, (() => {
    console.log(`Listening on port: ${process.env.PORT}`)
}))