import { Suspense } from 'react';
import Chat from '@/components/chat/chat';

export default function Home() {
  return (
    <>
      <article className="sr-only">
        <h1>Iván Júdez Ráfales — AI/ML Engineer & Industrial Engineer</h1>
        <p>
          Iván Júdez Ráfales is an AI/ML Engineer based in Spain, currently working at
          Letsinnovate. He holds a degree in Industrial Engineering and an MSc in
          Connected Industry (now renamed MSc in Smart Industry) from Comillas ICAI
          University, Madrid.
        </p>
        <p>
          His work focuses on AI adoption, automation, machine learning, IoT systems
          and digital transformation, combining a strong industrial engineering
          background with applied artificial intelligence to deliver production-ready
          solutions that create measurable business impact.
        </p>
        <h2>Areas of expertise</h2>
        <ul>
          <li>AI Engineering and applied Machine Learning</li>
          <li>LLM applications, RAG and AI chatbots (LangChain, OpenAI, DeepSeek)</li>
          <li>Industrial automation and digital twin systems</li>
          <li>IoT systems and connected industry solutions</li>
          <li>Full-stack development with Next.js, React, FastAPI and Python</li>
          <li>MLOps and production deployment of AI systems</li>
        </ul>
        <h2>Education</h2>
        <ul>
          <li>
            MSc in Connected Industry (now Smart Industry) — Comillas ICAI, Madrid
          </li>
          <li>BSc in Industrial Engineering — Comillas ICAI, Madrid</li>
        </ul>
        <h2>Contact</h2>
        <p>
          For collaborations, freelance engagements or AI engineering opportunities,
          contact Iván at ijudezrafales@gmail.com.
        </p>
      </article>
      <Suspense fallback={<div>Loading chat...</div>}>
        <Chat />
      </Suspense>
    </>
  );
}
