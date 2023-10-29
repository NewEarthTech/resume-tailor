export function Testimonials() {
  return (
    <section className="m-14 space-y-12 py-20">
      <h2 className="text-center text-3xl font-bold">Testimonials</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full rounded-lg p-4 shadow sm:w-1/2 lg:w-1/3">
          <p>
            &quot;Resume Tailor made it easy for me to write a high-quality
            resume that got me the job.&quot;
          </p>
          <p className="mt-4 ">- John Doe</p>
        </div>
        <div className="w-full rounded-lg p-4 shadow sm:w-1/2 lg:w-1/3">
          <p>
            &quot;The templates and editing tools were a lifesaver. Thank you
            Resume Tailor!&quot;
          </p>
          <p className="mt-4 ">- Jane Smith</p>
        </div>
        <div className="w-full rounded-lg p-4 shadow sm:w-1/2 lg:w-1/3">
          <p>
            &quot;With Resume Tailor, I was able to create a resume that truly
            showcased my skills.&quot;
          </p>
          <p className="mt-4 ">- Michael Johnson</p>
        </div>
      </div>
    </section>
  );
}
