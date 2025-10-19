import Image from "next/image";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-primary rounded-xl">
          <Image
            src={"/zynx.png"}
            alt="Zynx"
            width={40}
            height={40}
            className="dark:invert"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">Verify Email</h1>
          <span>Please check your email inbox</span>
        </div>
      </div>
      <div className="rounded-2xl p-6 shadow-xl flex flex-col items-center min-w-md">
        <span>We have sent a verification link to email@gmail.com.</span>
        <span> This page will automatically continue after verification.</span>
      </div>
    </div>
  );
}
