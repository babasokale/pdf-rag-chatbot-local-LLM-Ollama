# 🧠 PDF RAG Chatbot with FastAPI + Local LLM (Ollama)

A **Retrieval-Augmented Generation (RAG)** chatbot that answers questions based on uploaded PDF documents. Built using **FastAPI** and **LangChain**, and powered by **local embeddings** + **Ollama (e.g., Mistral)** as the LLM backend.

---

## 📁 Project Structure

```
pdf-rag-chatbot/
├── backend/
│   ├── app.py                # FastAPI app
│   ├── rag_pipeline.py       # RAG logic
│   └── requirements.txt      # Python dependencies
└── frontend/ (optional Angular UI)
```

---

## 🚀 Setup Instructions

### ✅ Prerequisites

- Python 3.10+ installed
- Git installed
- [Ollama installed](https://ollama.com/download) on your local machine
- Postman or any HTTP client for testing API
- Optional: Angular CLI (for frontend UI)

---

### 🧱 1. Clone the Repository

```bash
git clone https://github.com/your-name/pdf-rag-chatbot.git
cd pdf-rag-chatbot/backend
```

---

### 📦 2. Create & Activate Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate  # On Linux/macOS
```

---

### 📥 3. Install Dependencies

Make sure `requirements.txt` includes:

```txt
fastapi
uvicorn
langchain
langchain-community
langchain-core
langchainhub
chromadb
pypdf
python-multipart
tiktoken
PyPDF2
openai
huggingface-hub
```

Then run:

```bash
pip install -r requirements.txt
```

---

### 🤖 4. Run Ollama Locally

Download and start a local model like **Mistral**:

```bash
ollama run mistral
```

Ollama will listen at `http://localhost:11434`. Keep this running in the background.

---

### 🔧 5. Set Up `RAGPipeline`

Use local embeddings + Ollama model:

```python
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama

self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
self.llm = Ollama(model="mistral")
```

Also use `RecursiveCharacterTextSplitter`, `Chroma`, and `RetrievalQA` from `langchain`.

---

### ▶️ 6. Run the FastAPI Server

```bash
uvicorn app:app --reload
```

API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📤 PDF Upload API

### Endpoint

```
POST /upload
```

### Form-Data Body

| Key  | Type | Value       |
|------|------|-------------|
| file | File | PDF file    |

---

## 💬 Ask Question API

### Endpoint

```
POST /ask
```

### JSON Body

```json
{
  "question": "What is the leave policy?"
}
```

### Response Format

```json
{
  "question": "What is the leave policy?",
  "answer": {
    "query": "What is the leave policy?",
    "result": "The company provides paid time off, holidays, and other benefits as described in Section 3."
  }
}
```

---

## 🌐 Optional Angular Chatbot UI

You can add a separate Angular 17/19 frontend with:

- 📄 PDF upload
- 💬 Chat interface
- ✅ Material Design + API integration

This frontend can talk to the FastAPI backend using:
- `POST /upload`
- `POST /ask`

---

## 🛠 Common Errors & Fixes

| Error                                  | Fix                                                              |
|---------------------------------------|------------------------------------------------------------------|
| `openai.RateLimitError`               | You're using OpenAI embeddings. Switch to HuggingFace.          |
| `ModuleNotFoundError: langchain_...`  | Install `langchain-community`: `pip install langchain-community` |
| `No response or timeout`              | Ollama model may be cold-starting. First run takes time.        |

---

## 📦 Deployment to Azure (Optional)

You can deploy the FastAPI app to Azure Web App using:
- GitHub Actions or FTP publish
- Startup command: `uvicorn app:app --host=0.0.0.0 --port=8000`
- Environment: Linux Python 3.10 or above

For local LLM support, you must use **containerized deployment** with Ollama set up inside the image (advanced).

---

## 📄 License

This project is open for learning and prototyping. Commercial use should credit the base template if you reuse as-is.

---

## 📬 Contact

Created by **Babaso Kale**  
[Upwork Profile](https://www.upwork.com/freelancers/~01yourid) | [Email](mailto:your@email.com)