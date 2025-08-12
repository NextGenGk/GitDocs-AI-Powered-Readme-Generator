'use client';

import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block mb-6">
            <h1 className="text-4xl font-black text-black transform -rotate-1">
              <span className="inline-block px-4 py-2 bg-[#05e17a] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                SIGN IN
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-700 font-medium">
            Welcome back to GitDocs! Sign in to continue generating amazing README files.
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
            <SignIn 
              appearance={{
                baseTheme: neobrutalism,
                variables: {
                  colorPrimary: "#05e17a",
                  colorBackground: "#ffffff",
                  colorText: "#000000",
                  colorInputBackground: "#ffffff",
                  colorInputText: "#000000",
                  borderRadius: "0px",
                },
                elements: {
                  formButtonPrimary: {
                    backgroundColor: "#05e17a",
                    border: "2px solid #000000",
                    boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
                    borderRadius: "0px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#05e17a",
                      boxShadow: "4px 4px 0px 0px rgba(5,225,122,1)",
                    },
                  },
                  card: {
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  },
                  headerTitle: {
                    display: "none",
                  },
                  headerSubtitle: {
                    display: "none",
                  },
                  socialButtonsBlockButton: {
                    border: "2px solid #000000",
                    boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
                    borderRadius: "0px",
                    fontWeight: "bold",
                    "&:hover": {
                      boxShadow: "3px 3px 0px 0px rgba(5,225,122,1)",
                    },
                  },
                  formFieldInput: {
                    border: "2px solid #000000",
                    borderRadius: "0px",
                    boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)",
                    "&:focus": {
                      boxShadow: "3px 3px 0px 0px rgba(5,225,122,1)",
                    },
                  },
                  footerActionLink: {
                    color: "#05e17a",
                    fontWeight: "bold",
                    "&:hover": {
                      color: "#000000",
                    },
                  },
                },
              }}
              redirectUrl="/dashboard"
              signUpUrl="/sign-up"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a 
              href="/sign-up" 
              className="font-bold text-[#05e17a] hover:text-black transition-colors underline decoration-2 underline-offset-2"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}