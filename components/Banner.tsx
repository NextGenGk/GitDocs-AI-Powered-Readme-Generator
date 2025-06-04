import Image from "next/image";

export default function () {
    return (
        <div>
            <Image
                src="/banner.jpg"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                z-index={-1}
                style={{ width: '100%', height: '100vh', opacity: 0.85, objectFit: 'cover'}}
            />
        </div>
    )
}
