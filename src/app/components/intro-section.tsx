import Image from "next/image";

export function IntroSection() {
  return (
    <section>
      <div className="mb-6">
        <Image src="/me.png" alt="me" width={80} height={80} />
      </div>
      <p className="font-medium">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
        dolorum sed amet fugit porro voluptate aspernatur doloribus incidunt!
        Velit fugit non aliquid alias, vel quaerat facere! Eveniet, adipisci?
        Iure, recusandae?
      </p>
      <p className="font-medium">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aut odio
        magni ipsa non laboriosam qui numquam, suscipit ipsum? Eius, soluta
        culpa asperiores libero in tenetur! Rem eius voluptatibus
        necessitatibus?
      </p>
    </section>
  );
}
