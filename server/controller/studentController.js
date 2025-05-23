import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { redisClient } from "../config/redis.js";
import Student from "../models/Student.js";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  addStudentSchema,
  chatWithAISchema,
} from "../validation/validationSchema.js";

//adding student logic ✅
export const addStudent = async (req, res) => {
  const { registration, name, phone } = req.body;
  const result = addStudentSchema.safeParse({ registration, name, phone });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, message: "Fields format invalids" });
  }
  if (!registration || !name || !phone) {
    return res.json({ success: false, message: "All Fields Required" });
  }
  try {
    const studentExist = await Student.findOne({ registration });
    if (studentExist) {
      return res.json({ success: false, message: "Already Student Exist" });
    }
    await Student.create({
      registration: registration,
      name: name,
      phone: phone,
    });
    res.json({ success: true, message: "Student Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// student upload the pdf ✅
export const uploadResumePdf = async (req, res) => {
  /* steps to follow 
      1. get the uploaded pdf file
      2. push to the event driven queue system
      3. response with the successfully uploaded
   */
  const resumefile = req.file;

  if (!resumefile) {
    return res
      .status(404)
      .json({ success: false, message: "File not found!!" });
  }

  if (resumefile.mimetype !== "application/pdf") {
    return res
      .status(400)
      .json({ success: false, message: "upload pdf file only!!" });
  }
  try {
    const file = {
      filename: resumefile.originalname,
      destination: resumefile.destination,
      path: resumefile.path,
    };
    console.log(file);
    await redisClient.lPush("resumeFiles", JSON.stringify(file));
    res
      .status(201)
      .json({ success: true, message: "Successfully uploaded the file" });
  } catch (error) {
    res
      .status(500)
      .json({ success: true, message: "Failed to upload the file" });
  }
};

// student chat with ai
export const chatWithAI = async (req, res) => {
  const { query } = req.body;
  const result = chatWithAISchema.safeParse(query);
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, message: "Query format invalids" });
  }
  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "provide job description" });
  }
  // console.log(query);
  /* steps to follows
   1. get the query
   2. create a embedding model and get the vector data from database
   3. give the context to the llm to get the data
   4. respond with ai message
  */
  try {
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

    //retriever instance is created
    const ret = vectorStore.asRetriever({
      k: 5,
    });
    // console.log(ret);
    const data = await ret.invoke(query);
    console.log(data);

    const template = `
  You are an ATS (Applicant Tracking System) expert analyzing resumes against job descriptions.
  
  JOB DESCRIPTION:
  ${query}
  
  CANDIDATE'S RESUME:
  ${JSON.stringify(data)}
  
  Please provide:
  1. An ATS compatibility score from 0-100
  2. Key missing skills or qualifications
  3. Keyword analysis (missing important keywords)
  4. Specific suggestions to improve the resume for this job
  
  Format your response in clear sections.
  `;

    console.log(template);
    const llm = new ChatOllama({
      model: "gemma3:1b",
      temperature: 0.2,
      maxRetries: 2,
    });

    const result = await llm.invoke(template);

    res.status(200).json({ success: true, message: result.content });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "llm not working" });
  }
};
