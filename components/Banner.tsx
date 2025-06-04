import Image from "next/image";
import GitHubToMarkdown from "./GitHubToMarkdown";

export default function Banner() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <Image
                src="/banner.jpg"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%', opacity: 0.85, objectFit: 'cover', position: 'absolute', zIndex: -1 }}
            />


            <div className="absolute inset-0 flex flex-col items-center justify-center w-full pt-32">
                <h1 className="text-5xl font-semibold mb-4 text-slate-950">Your Code Deserves a Better README.</h1>
                <p className="text-lg mb-4 text-center max-w-2xl text-slate-950">
                    One Link. One Click. One Perfect README.
                </p>
                <div className="p-10 rounded-lg shadow-xl max-w-4xl w-full bg-transparent" style={{ zIndex: 10 }}>
                    <GitHubToMarkdown />
                </div>
            </div>
        </div>
    )
}
