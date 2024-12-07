import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold">Repostly</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-4 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, use our services, or communicate with us. This
            may include your name, email address, and social media account
            information.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, to communicate with you, and to comply with legal
            obligations.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            3. Information Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information. We may share your
            information with third-party service providers who perform services
            on our behalf, or when required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            4. Data Retention
          </h2>
          <p>
            We retain your information for as long as necessary to provide our
            services and comply with our legal obligations.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">5. Security</h2>
          <p>
            We implement reasonable security measures to protect your
            information from unauthorized access, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. You may also have the right to object to or restrict
            certain processing of your data.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            7. Children&apos;s Privacy
          </h2>
          <p>
            Our service is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">9. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at [Your Contact Information].
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
