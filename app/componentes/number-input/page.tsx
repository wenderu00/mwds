import { doc } from "@/app/_docs/catalog/number-input";
import { ComponentPage, componentMetadata } from "@/app/_docs/component-page";

export const metadata = componentMetadata(doc);

export default function Page() {
  return <ComponentPage doc={doc} />;
}
