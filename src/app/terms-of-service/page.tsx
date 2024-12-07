import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold">Repostly</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-4 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the Repostly service, you agree to be bound by
            these Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            2. Description of Service
          </h2>
          <p>
            Repostly provides a tool for posting content simultaneously to
            Instagram, YouTube, and TikTok.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            3. User Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">4. Content</h2>
          <p>
            You retain all ownership rights to your content. By using our
            service, you grant us a license to use, modify, and distribute your
            content on the platforms you choose.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            5. Prohibited Activities
          </h2>
          <p>
            You agree not to use the service for any unlawful purpose or in any
            way that interrupts, damages, or impairs the service.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account at any
            time for any reason without notice.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Your
            continued use of the service after changes constitutes acceptance of
            those changes.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            8. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided &quot;as is&quot; without any warranties,
            expressed or implied.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            9. Limitation of Liability
          </h2>
          <p>
            Repostly shall not be liable for any indirect, incidental, special,
            consequential or punitive damages resulting from your use of the
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by the laws of [Your Jurisdiction],
            without regard to its conflict of law provisions.
          </p>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          © 2024 Repostly. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
