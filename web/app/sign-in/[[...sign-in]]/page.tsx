import { SignIn } from '@clerk/nextjs'

export default function Page() {

  return  <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
  <div className="inline-block max-w-lg text-center justify-center">
  <SignIn />
  </div>
</section>
}
