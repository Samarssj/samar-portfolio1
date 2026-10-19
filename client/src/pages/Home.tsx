import { Download } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          Available for work
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI Engineer &<br />
              Full-Stack Developer
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              I build intelligent systems, agentic workflows, and scalable software that turn ideas into production-ready products.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:ssjsamar453@gmail.com"
                className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                Get in Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1ygq4aSNoREhRY-VxNdygpeVU2-_NCUVX/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-medium text-white transition hover:border-emerald-500 hover:text-emerald-300"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_0_30px_rgba(16,185,129,0.12)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Profile</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                Online
              </span>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                <span className="font-semibold text-white">Focus:</span> AI systems, cloud architecture, and full-stack product engineering.
              </p>
              <p>
                <span className="font-semibold text-white">Stack:</span> TypeScript, React, Node.js, MongoDB, Gemini, GCP, Docker.
              </p>
              <p>
                <span className="font-semibold text-white">Goal:</span> Build impactful, intelligent, user-centered software.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
