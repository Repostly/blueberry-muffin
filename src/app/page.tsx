import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube, Video } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-200/20 dark:from-emerald-900/30 dark:to-emerald-800/30"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-800 dark:text-white">
                  Post Once, Reach Everywhere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
                  Effortlessly share your content across Instagram, YouTube, and
                  TikTok simultaneously. Save time and maximize your reach.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-900/20"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-800 dark:text-white">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Instagram className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Instagram Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seamlessly post photos, videos, and stories to Instagram.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Youtube className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">YouTube Uploads</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automatically upload and schedule videos to your YouTube
                  channel.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Video className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">TikTok Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your short-form videos directly to TikTok with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-800 dark:text-white">
                  Ready to Amplify Your Reach?
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Join thousands of content creators who are saving time and
                  growing their audience with our tool.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 text-emerald-600 dark:text-emerald-400"
                    href="/terms-of-service"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Repostly. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

