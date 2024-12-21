"use client"
import { useRouter } from "next/navigation";
import SignupForm from "../_components/SignupForm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (session) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [status, session, router]);

  if (loading) {
    return (
      <span className='text-blue-400'>
        <Loading />
      </span>
    );
  }

  return (
    <section className='w-full flex items-center justify-center mt-20'>
      <SignupForm />
    </section>
  );
}