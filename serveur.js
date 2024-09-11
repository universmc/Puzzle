const express = require('express');
const OpenAI = require("openai");
const openai = new OpenAI();

const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(express.json());

app.post('/api', async (req, res) => {
  try {
    const response = await openai.createCompletion("gpt-4o", {
      prompt: req.body.text,
      max_tokens: 150
    });
    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
