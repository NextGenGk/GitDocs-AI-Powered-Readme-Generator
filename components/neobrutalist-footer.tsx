import { Github, Twitter, Mail, Heart } from "lucide-react"
import { NeobrutalistButton } from "@/components/ui/neobrutalist-button"

interface NeobrutalistFooterProps {
  noPadding?: boolean;
}

export default function NeobrutalistFooter({ noPadding = false }: NeobrutalistFooterProps) {
    return (
        <footer className="bg-[#05e17a] text-white w-full">
            <div className="py-8 px-4">
                <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-black mb-2 transform -rotate-1">
                    <span className="inline-block px-2 py-1 bg-black text-white">GITDOCS</span>
                </h3>
                <p className="text-lg mb-2">
                    Making documentation fun, one README at a time.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                    <span>by developers</span>
                </div>
                
                <div className="border-t-2 border-white/20 mt-6 pt-4 text-center">
                    <p className="text-sm">&copy; 2024 GITDOCS</p>
                </div>
                </div>
            </div>
        </footer>
    );
}
