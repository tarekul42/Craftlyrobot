/**
 * Barrel export for MDX components.
 * These are passed to the MDX renderer as the components map.
 */
export { Callout } from "./callout";
export { YouTube } from "./youtube";
export { CodeBlock } from "./code-block";
export { Image } from "./image";
export { Quote } from "./quote";

/**
 * The full component map for MDX rendering.
 * Import this and spread into the MDX renderer:
 *
 *   import { mdxComponents } from "@/components/mdx";
 *   <MDXRemote source={content} components={mdxComponents} />
 */
export { default as mdxComponents } from "./mdx-components";
