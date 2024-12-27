/* eslint-disable prettier/prettier */

import ListController from "@/components/list-controller";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-12 py-2 md:py-4 w-full">
        <section className="flex flex-col gap-0 items-center justify-center w-full">
          <h1 className="text-4xl font-bold font-mono text-foreground p-0 m-0">Randmlist</h1>
          <h2 className="text-md font-mono text-foreground-500 p-0 m-0">Una lista de selecciones aleatorias...</h2>
        </section>
        <section className="w-full">
          <ListController />
        </section>
      </section>
    </DefaultLayout>
  );
}
