import { Camera } from "@/components/Camera";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Business Card Scanner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the Business Card Scanner!
        </h1>

        <p className="mt-3 text-2xl">
          Capture and process business cards easily.
        </p>

        <div className="mt-6">
          <Camera />
        </div>
      </main>
    </div>
  );
}
