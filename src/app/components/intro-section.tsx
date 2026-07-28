import Image from "next/image";

export function IntroSection() {
  return (
    <section>
      <div className="mb-6">
        <Image src="/me.png" alt="me" width={80} height={80} />
      </div>
      <p className="font-medium">
        I am Daishi Mishima, a front-end engineer.
      </p>
      <p className="font-medium">
        Focusing on web application development, I work on a wide range of tasks from new development to feature improvements. I enjoy building UIs and value creating experiences that not only look good but also feel great to interact with.
      </p>
      <p className="font-medium">
        On <a href="https://zenn.dev/islaree" className="text-color-[#014AF8]">Zenn</a>, I compile my daily learnings and implementation insights through technical articles and scraps. On <a href="https://sizu.me/3d41" className="text-color-[#014AF8]">sizu.me</a>, I write about my thoughts at my own pace, without limiting myself to technical topics.
      </p>
    </section>
  );
}
