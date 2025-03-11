"use client";

import { useState } from 'react';

export default function Home() {
  return (
    <div className="app-container">
      <header>
        <h1>Mistral Document Chat</h1>
        <p className="subtitle">Analyze documents and images with AI-powered insights</p>
      </header>

      <div className="container">
        <div className="card">
          <p>Loading document chat interface...</p>
        </div>
      </div>
    </div>
  );
}
