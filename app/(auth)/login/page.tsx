"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from "next/image";
import { login } from "@/core/authentication/api";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login function from the authentication API
      await login({ email, password });
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-green-500 to-green-700 animate-gradient-x" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621955964441-c173e01c135b')] mix-blend-overlay opacity-10" />

      <Card className="w-[400px] relative z-10 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <Image
              src="/images/logo.png"
              height={300}
              width={300}
              alt="Yunesta"
            />
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
