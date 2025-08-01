"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!file || !jobDesc.trim()) {
      alert("Please upload a resume and enter the job description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDesc);

    try {
      // Call your backend here - e.g. n8n endpoint or API route
      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Save result to localStorage or state (basic approach)
      localStorage.setItem("ai_result", JSON.stringify(data));

      router.push("/result");
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1e0038] to-[#3b82f6] text-white p-6">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center mb-10 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 shadow-md">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
          KOKO AI Dashboard
        </h1>
        <Button variant="ghost" className="text-white hover:text-blue-300">
          Logout
        </Button>
      </nav>

      {/* MAIN SECTION */}
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Tailor Your Resume
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Upload your CV and the job description — let our smart system do the magic!
        </p>
      </div>

      {/* FORM SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Resume Upload */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl text-white shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold">Upload Your Resume</h3>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-white/10 text-white placeholder:text-gray-400"
            />
          </CardContent>
        </Card>

        {/* JD Input */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 space-y-4 w-full max-w-2xl mx-auto">
          <label className="text-white font-semibold text-lg">Paste the Job Description ✍️</label>
          <Textarea
            placeholder="Paste the job description here..."
            className="bg-white/10 border border-white/20 text-white placeholder-gray-400"
            rows={6}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          {loading ? "Working magic..." : "Tailor My Resume"}
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-6 text-center animate-pulse text-sm text-gray-300">
          🧠 Generating tailored resume with AI...
        </div>
      )}

      {/* What We Do Cards */}
      <div className="mt-16 text-center space-y-6">
        <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
          What We Do
        </h4>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl text-white shadow-md">
            <CardContent className="p-6 space-y-3">
              <h5 className="text-xl font-semibold">Smart Resume Matching</h5>
              <p className="text-sm text-gray-300">
                Our AI reads your CV and matches key skills with the job description.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl text-white shadow-md">
            <CardContent className="p-6 space-y-3">
              <h5 className="text-xl font-semibold">Keyword Optimisation</h5>
              <p className="text-sm text-gray-300">
                Adds relevant keywords to help your CV pass applicant tracking systems (ATS).
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl text-white shadow-md">
            <CardContent className="p-6 space-y-3">
              <h5 className="text-xl font-semibold">Professional Tailoring</h5>
              <p className="text-sm text-gray-300">
                Get a polished version of your resume fit for each job.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
