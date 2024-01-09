import { api } from "~/trpc/server";

export default async function Home() {
  const _ = await api.post.hello.query({ text: "from tRPC" });

  return <main></main>;
}
