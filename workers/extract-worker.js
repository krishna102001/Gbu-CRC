import { createClient } from "redis";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OllamaEmbeddings } from "@langchain/ollama";
import { QdrantVectorStore } from "@langchain/qdrant";
const redisClient = createClient();
async function embbedingResumeFile(pdfFile) {
  // console.log(pdfFile);
  /*
    Steps to follow
    1. load the pdf file ( use pdf-parser)
    2. embbed the text (langchain use ollama for local llm)
    3. conver to vector and add to database(cromaDB or qdrant) 
  */
  try {
    const loader = new PDFLoader(pdfFile.path);
    const docs = await loader.load();
    // console.log(docs);

    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://localhost:6333",
        collectionName: "resume-db",
      }
    );
    await vectorStore.addDocuments(docs);
    console.log("done with vector");
  } catch (error) {
    console.log("error occured", error);
  }
}

export async function extractWorker() {
  try {
    await redisClient.connect();
    console.log("worker started and redis client started!!");
    while (true) {
      const data = await redisClient.brPop("resumeFiles", 0);
      const resumeFiles = JSON.parse(data.element);
      embbedingResumeFile(resumeFiles);
      // console.log(data);
    }
  } catch (error) {
    console.log("failed to get the data", error);
  }
}

extractWorker();
