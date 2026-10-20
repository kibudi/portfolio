import { notFound } from "next/navigation";

/** Sends every unknown path under a language to that language's 404 page. */
export default function CatchAll() {
  notFound();
}
