import { createClient } from "redis";

const redisClient = createClient();
function embbedingResumeFile(pdfFile) {
  console.log(pdfFile);
  /*
    Steps to follow
    1. load the pdf file
    2. embbed the text (langchain use ollama for local llm)
    3. conver to vectore and add to database(cromaDB or qdrant) 
  */
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
