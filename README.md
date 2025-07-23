# 🧠 PDF RAG Chatbot using FastAPI + Local LLM (Ollama)

This project demonstrates how to build a **Retrieval-Augmented Generation (RAG)** chatbot that answers questions from uploaded PDF files. It uses **FastAPI** as the backend API server, integrates **LangChain**, and leverages **local embeddings** with **Ollama** running LLMs like Mistral — all on your machine with no external OpenAI usage.

---

## 📌 Key Features

- Upload PDF documents via API
- Extract text and split into chunks
- Embed chunks using HuggingFace model
- Store and search via Chroma vector store
- Query using a local LLM via Ollama (e.g., Mistral)
- Optional Angular 17+ chatbot frontend

---

## 📁 Project Structure

```
pdf-rag-chatbot/
├── backend/
│   ├── app.py              # FastAPI server
│   ├── rag_pipeline.py     # RAG logic (embeddings, retrieval, QA)
│   ├── requirements.txt    # Python dependencies
└── frontend/               # Optional Angular chatbot UI
```

---

## 🧱 Setup Instructions

### ✅ Prerequisites

- Python 3.10+
- [Ollama installed](https://ollama.com/download) on your machine
- Git
- Postman or HTTP client
- (Optional) Angular CLI for UI

---

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/babasokale/pdf-rag-chatbot-local-LLM-Ollama.git
cd pdf-rag-chatbot-local-LLM-Ollama/backend
```

---

### 🧪 2. Setup Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # macOS/Linux
```

---

### 📦 3. Install Python Dependencies

Ensure this is in `requirements.txt`:

```
fastapi
uvicorn
langchain
langchain-community
langchain-core
chromadb
pypdf
python-multipart
tiktoken
PyPDF2
huggingface-hub
```

Then install:

```bash
pip install -r requirements.txt
```

---

### 🤖 4. Run Ollama LLM

Start a local model (e.g., Mistral):

```bash
ollama run mistral
```

This runs a local LLM at `http://localhost:11434`.

---

### ▶️ 5. Start FastAPI Server

```bash
uvicorn app:app --reload
```

Server URL: http://127.0.0.1:8000

---

## 📤 Upload PDF

### Endpoint

```
POST /upload
```

**Form-data:**

| Key  | Type | Description     |
|------|------|-----------------|
| file | File | Your PDF file   |

---

## 💬 Ask a Question

### Endpoint

```
POST /ask
```

**JSON Payload:**

```json
{
  "question": "What is the leave policy?"
}
```

**Response:**

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

## 🌐 Angular Frontend (Optional)

Optional chatbot UI built in Angular 17+ includes:

- 📄 PDF Upload UI
- 💬 Chat interface
- 🎨 Material Design with API Integration

Connects to backend using `POST /upload` and `POST /ask`.

---

## ⚠️ Common Issues

| Issue                                   | Fix                                                              |
|----------------------------------------|------------------------------------------------------------------|
| OpenAI quota/429 error                 | You're still using OpenAI — switch to HuggingFace embeddings     |
| `langchain_community` not found        | `pip install langchain-community`                                |
| Long wait on first LLM query           | Ollama cold start — model loads on demand                        |
| API key leaked in commit               | Rotate key, use `.env`, and scrub history using BFG              |

---

## ☁️ Deploy to Azure (Optional)

- Use GitHub Actions or FTP
- Use Linux App Service
- Startup command:
  ```bash
  uvicorn app:app --host=0.0.0.0 --port=8000
  ```
- For Ollama, use Docker/container-based deployment with preloaded model (advanced)

---

## 🙋‍♂️ Author

**Babaso Kale**  
[Upwork Profile »](https://www.upwork.com/freelancers/~01yourid)  
[LinkedIn »](https://linkedin.com/in/yourprofile)  
Email: `your@email.com`

---

## 📄 License

Open for learning, experimentation, and portfolio use.  
Commercial use requires attribution to the original repository.

---
