import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Collections } from "@/components/product/collections";
import { AssistantShowcase } from "@/components/product/assistant-showcase";
import { Operations, Setup } from "@/components/product/operations";
import { PageEnd } from "@/components/product/page-end";
export default function App() {
  return <><Nav /><main><Hero /><Collections /><AssistantShowcase /><Operations /><Setup /><PageEnd /></main></>;
}
