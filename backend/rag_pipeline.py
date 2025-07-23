from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama  # Real LLM via Ollama
from PyPDF2 import PdfReader
import os
import tempfile

class RAGPipeline:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.llm = Ollama(model="mistral")  # Uses your local Ollama LLM
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.db = None
        self.qa_chain = None

    def load_pdf(self, content: bytes, filename: str):
        temp_path = os.path.join(tempfile.gettempdir(), filename)
        with open(temp_path, "wb") as f:
            f.write(content)

        reader = PdfReader(temp_path)
        text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])

        chunks = self.text_splitter.split_text(text)

        self.db = Chroma.from_texts(chunks, embedding=self.embeddings)
        retriever = self.db.as_retriever()
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            retriever=retriever,
            return_source_documents=False
        )

    def query(self, question: str) -> str:
        if not self.qa_chain:
            return "No document loaded. Please upload a PDF first."
        result = self.qa_chain.invoke({"query": question})
        return result
