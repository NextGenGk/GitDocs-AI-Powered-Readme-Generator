"use server"; // Required for hooks like useUser

import ProFeature from "@/components/ProFeature";
import BasicFeature from "@/components/BasicFeature"; // Ensure BasicFeature is imported
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Dashboard() {
    const { has } = await auth();

    const hasProFeature = has({plan: "pro"});

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            {hasProFeature ? (
                    <div>
                        <BasicFeature />
                        <Link href="/pricing" className="mt-4 text-blue-500 hover:underline">
                            Upgrade to Pro
                        </Link>
                    </div>
            ) : (
                <div>
                    <ProFeature />
                </div>
            )}
        </main>
    );
}

