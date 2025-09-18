# Azure AI Speech & OpenAI Integration Showcase

This repository demonstrates the powerful capabilities of Azure Cognitive Services (Speech-to-Text, Text-to-Speech) integrated with OpenAI's language models, showcasing multiple AI conversational pipelines and a comprehensive RAG (Retrieval-Augmented Generation) implementation.

## 🚀 What This Repository Demonstrates

### Azure Cognitive Services Integration
- **Speech-to-Text (STT)**: Real-time voice recognition using Azure Speech Services
- **Text-to-Speech (TTS)**: Natural voice synthesis with Azure's neural voices
- **End-to-end Voice Pipelines**: Complete conversation flows from speech input to AI response to speech output

### OpenAI Language Models
- **GPT-3.5-Turbo**: Fast, efficient conversational AI
- **GPT-4o**: Advanced reasoning and enhanced capabilities
- **Microsoft Bing Chat Model (7B)**: Alternative language model integration
- **Embeddings**: Semantic search using OpenAI's text-embedding-3-large

### Advanced AI Techniques
- **RAG Implementation**: Retrieval-Augmented Generation with Pinecone vector database
- **Context-Aware Conversations**: Maintaining conversation history and context
- **Multi-Modal Interfaces**: Voice, text, and web-based interactions

## 📁 Repository Structure

```
├── AI-Talk-GPT4o/          # Voice pipeline using GPT-4o
├── AI-Talk-M7B/            # Voice pipeline using Microsoft 7B model
├── AI-Talk-RAG/            # RAG implementation with ice cream vendor demo
├── AI-Talk-Turbo/          # Voice pipeline using GPT-3.5-Turbo
├── Azures-Repo-Files/      # Standalone Azure STT/TTS examples
└── package.json            # Dependencies for all projects
```

## 🎯 Project Highlights

### 1. AI Voice Conversation Pipelines
Four different implementations showcasing various AI models:

- **AI-Talk-GPT4o**: Premium conversational experience with GPT-4o
- **AI-Talk-Turbo**: Fast conversations with GPT-3.5-Turbo
- **AI-Talk-M7B**: Alternative using Microsoft's 7B model (fastest model)
- **AI-Talk-RAG**: Context-enhanced conversations with vector database

### 2. RAG (Retrieval-Augmented Generation) System
A complete RAG implementation featuring:
- **Vector Database**: Pinecone integration for semantic search
- **Knowledge Base**: Ice cream vendor scenario with product information
- **Embeddings**: OpenAI text-embedding-3-large for query vectorization
- **Context Retrieval**: Relevant information injection into AI responses

### 3. Standalone Azure Components
- **STT.html**: Pure Speech-to-Text implementation
- **TTS.html**: Pure Text-to-Speech implementation

## 🛠️ Prerequisites

### Required Services & API Keys
1. **Azure Speech Services**
   - Create a Speech Services resource in Azure Portal
   - Note your API key and region (e.g., 'swedencentral')

2. **OpenAI API**
   - Sign up for OpenAI API access
   - Generate an API key from your OpenAI dashboard

3. **Pinecone (for RAG implementation)**
   - Create a Pinecone account 
      - Metric: Cosine
      - Dimentions: 3072
      - Cloud: AWS
      - Region: us-east-1
      - Type: Dense
      - Capacity Mode: Serverless
   - Set up a vector database index
   - Note your API key and index details

### Development Environment
- Node.js (v14 or higher)
- A local web server (Live Server extension for VS Code recommended)
- Modern web browser with microphone access

## 🚀 Quick Start Guide

### Option 1: Voice Conversation Pipelines

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo-url>
   cd AI
   npm install
   ```

2. **Choose Your Pipeline**
   Navigate to any of these directories:
   - `AI-Talk-GPT4o/` (Premium experience)
   - `AI-Talk-Turbo/` (Fast responses)
   - `AI-Talk-M7B/` (Alternative model)

3. **Configure API Keys**
   Open `pipeline.html` in your chosen directory and locate the configuration section:
   ```javascript
   // Add your API keys here
   const AZURE_SPEECH_KEY = "your-azure-speech-key";
   const AZURE_REGION = "your-region"; // e.g., "swedencentral"
   const OPENAI_API_KEY = "your-openai-api-key";
   ```

4. **Run the Application**
   - Open `pipeline.html` with a local server (Live Server in VS Code)
   - Click "Talk to AI" and start speaking
   - Experience the complete voice-to-AI-to-voice pipeline

### Option 2: RAG Implementation (Advanced)

1. **Navigate to RAG Directory**
   ```bash
   cd AI-Talk-RAG/
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file:
   ```env
   OPENAI_API_KEY=your-openai-key
   PINECONE_API_KEY=your-pinecone-key
   PINECONE_INDEX=your-index-name
   PINECONE_HOST=your-pinecone-host
   ```

3. **Initialize Knowledge Base**
   ```bash
   node flavours.js
   ```
   This populates your Pinecone database with ice cream knowledge.

4. **Start the RAG Server**
   ```bash
   node server.js
   ```

5. **Launch Frontend**
   Open `pipeline.html` with Live Server and configure your API keys in the interface.

### Option 3: Standalone Azure Components

1. **Speech-to-Text**
   - Open `Azures-Repo-Files/STT.html`
   - Add your Azure Speech key and region
   - Test voice recognition

2. **Text-to-Speech**
   - Open `Azures-Repo-Files/TTS.html`
   - Add your Azure Speech key and region
   - Test voice synthesis

## 🎯 Use Cases & Learning Opportunities

### For Developers
- **Azure Integration**: Learn how to integrate Azure Cognitive Services
- **OpenAI API Usage**: Understand various OpenAI model implementations
- **RAG Architecture**: Build context-aware AI applications
- **Voice Interfaces**: Create natural voice-driven applications

### For Businesses
- **Customer Service**: Voice-enabled AI assistants
- **Knowledge Management**: RAG systems for internal documentation
- **Accessibility**: Voice interfaces for diverse user needs
- **Prototyping**: Rapid development of AI-powered features

### For Students & Researchers
- **AI Pipeline Development**: End-to-end AI system architecture
- **Vector Databases**: Semantic search and retrieval systems
- **Multimodal AI**: Combining speech, text, and context
- **API Integration**: Real-world service integration patterns

## 🔧 Technical Implementation Details

### Speech Pipeline Architecture
```
User Voice → Azure STT → OpenAI Processing → Azure TTS → Audio Output
```

### RAG Pipeline Architecture
```
User Query → Embedding → Vector Search → Context Retrieval → Enhanced LLM Response
```

### Key Technologies
- **Frontend**: Vanilla JavaScript, HTML5 Web Speech API
- **Backend**: Node.js, Express.js
- **AI Services**: OpenAI GPT models, Azure Speech Services
- **Vector Database**: Pinecone
- **Embeddings**: OpenAI text-embedding-3-large

## 🎨 Features Showcase

### Voice Conversation Features
- ✅ One-button operation
- ✅ Real-time status feedback
- ✅ Conversation history
- ✅ Professional UI design
- ✅ Error handling and recovery
- ✅ Multiple AI model support

### RAG System Features
- ✅ Semantic knowledge retrieval
- ✅ Context-enhanced responses
- ✅ Vector database integration
- ✅ Scalable knowledge base
- ✅ Real-time query processing

## 🔍 Understanding the Code

### Critical Files to Explore

1. **pipeline.html** (in any AI-Talk directory)
   - Complete voice conversation implementation
   - Azure Speech Services integration
   - OpenAI API calls
   - UI/UX design patterns

2. **server.js** (AI-Talk-RAG/)
   - RAG backend implementation
   - Vector database queries
   - Context retrieval logic

3. **flavours.js** (AI-Talk-RAG/)
   - Knowledge base population
   - Embedding generation
   - Vector storage patterns

## 🚨 Important Notes

### Security Best Practices
- Never commit API keys to version control
- Use environment variables for production
- Implement proper error handling
- Validate user inputs

### Performance Considerations
- GPT-4o provides better responses but is slower than GPT-3.5-Turbo
- Vector database queries add latency but improve response quality
- Consider caching strategies for production use

### Browser Compatibility
- Requires HTTPS for microphone access in production
- Modern browsers with Web Speech API support
- Enable microphone permissions

## 🎓 Learning Path

### Beginner Level
1. Start with standalone STT.html and TTS.html
2. Explore AI-Talk-Turbo for simplest pipeline
3. Understand API integration patterns

### Intermediate Level
1. Compare different AI models (GPT-3.5 vs GPT-4o vs M7B)
2. Modify conversation flows and UI
3. Implement error handling improvements

### Advanced Level
1. Build custom RAG implementations
2. Integrate additional vector databases
3. Develop production-ready deployments
4. Create custom knowledge domains

## 🤝 Contributing

This repository serves as an educational showcase. Feel free to:
- Fork and experiment with different AI models
- Implement additional Azure services
- Create new RAG knowledge domains
- Improve UI/UX designs
- Add comprehensive testing

## 📄 License

This project is intended for educational and demonstration purposes. Please ensure you comply with the terms of service for:
- Azure Cognitive Services
- OpenAI API
- Pinecone
- Any other third-party services used

## 🔗 Useful Resources

- [Azure Speech Services Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Pinecone Documentation](https://docs.pinecone.io/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 👨‍💻 Author

**Josh Croly**
- 📧 Email: jcroly1998@gmail.com
- 💼 LinkedIn: [linkedin.com/in/JoshCroly](https://linkedin.com/in/JoshCroly)

---

**Built with ❤️ to showcase the incredible possibilities when Azure AI meets OpenAI technology**

*This repository demonstrates production-ready patterns for voice AI applications, RAG systems, and multimodal AI interfaces. Perfect for developers looking to understand and implement cutting-edge AI integration techniques.*