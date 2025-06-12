import BasicFeature from "@/components/BasicFeature"; // Ensure BasicFeature is imported

export default async function Dashboard() {

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div>
                <BasicFeature />
                {/*<Link href="/pricing" className="mt-4 text-blue-500 hover:underline">*/}
                {/*    Upgrade to Pro*/}
                {/*</Link>*/}
            </div>
        </main>
    );
}

