import { Check, LayoutTemplate, Pencil } from "lucide-react";

// prettier-ignore
const features = [
  {
    Icon: Pencil,
    title: "Easy Editing",
    description: "Our user-friendly editor makes it easy to update your resume anytime you need.",
  },
  {
    Icon: LayoutTemplate,
    title: "Professional Templates",
    description: "Choose from a variety of resume templates designed to fit any job.",
  },
  {
    Icon: Check,
    title: "Expert Guidance",
    description: "Get step-by-step guidance and helpful tips from our resume experts.",
  },
]

function Feature({
  Icon,
  title,
  description,
}: {
  Icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 sm:w-1/2 lg:w-1/3">
      <Icon size={45} className="mb-2" />
      <h3 className="mb-2 text-center text-xl font-semibold">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="m-10 space-y-12 sm:m-20">
      <h2 className="text-center text-3xl font-bold">Features</h2>
      <div className="flex flex-wrap items-center justify-center gap-20">
        {features.map((feature) => (
          <Feature {...feature} key={feature.title} />
        ))}
      </div>
    </section>
  );
}
