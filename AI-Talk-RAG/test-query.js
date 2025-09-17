import 'dotenv/config';

const testQuery = async () => {
  try {
    const response = await fetch('http://localhost:3000/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "What flavors of ice cream do you know about?",
        openaiKey: process.env.OPENAI_API_KEY,
        pineconeKey: process.env.PINECONE_API_KEY,
        indexName: process.env.PINECONE_INDEX
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testQuery();