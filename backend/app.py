### PDF RAG Chatbot - Backend (FastAPI)
# Folder: backend/app.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import RAGPipeline

app = FastAPI()
rag = RAGPipeline()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename
    rag.load_pdf(content, filename)
    return {"message": f"{filename} uploaded and processed"}

@app.post("/ask")
async def ask_question(payload: dict):
    question = payload.get("question")
    if not question:
        return {"error": "No question provided"}
    answer = rag.query(question)
    return {"question": question, "answer": answer}