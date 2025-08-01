"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);


  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage({ type: "error", text: "Login error: " + error.message });
    } else {
      setMessage({ type: "success", text: "✅ Magic link sent! Check your email." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1e0038] to-[#3b82f6] flex items-center justify-center p-6 text-white relative">
      <div className="absolute top-10 text-5xl font-extrabold text-center w-full tracking-wide bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Login Page
      </div>

      <Card className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white rounded-2xl z-10">
        <CardContent className="space-y-6 py-8 px-6">
          <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-white/10 backdrop-blur text-white placeholder:text-gray-400"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>

          {message && (
            <div
              className={`text-sm text-center mt-2 transition-all duration-500 ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          
        </CardContent>
      </Card>
    </div>
  );
}
