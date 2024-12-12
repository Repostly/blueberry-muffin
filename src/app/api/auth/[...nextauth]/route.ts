import { authOptions } from "@/auth/options";
import NextAuth from "next-auth";

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
