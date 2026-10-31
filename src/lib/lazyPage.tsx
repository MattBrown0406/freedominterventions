import { lazy as reactLazy, type ComponentType } from "react";

type PageModule<P> = { default: ComponentType<P> };

export type PreloadablePage<P = Record<string, never>> = ComponentType<P> & {
  preload: () => Promise<PageModule<P>>;
};

/**
 * Drop-in replacement for React.lazy for route pages.
 *
 * - `Page.preload()` starts (or reuses) the chunk download.
 * - Once the chunk has loaded, the page renders synchronously instead of
 *   suspending, so preloading the current route before the first render means
 *   no "Loading..." flash on first paint.
 *
 * Named `lazy` on import in App.tsx so the build scripts that read
 * `const X = lazy(() => import("./pages/X"))` keep working.
 */
export function lazy<P = Record<string, never>>(
  factory: () => Promise<PageModule<P>>,
): PreloadablePage<P> {
  let loaded: ComponentType<P> | null = null;
  let pending: Promise<PageModule<P>> | null = null;

  const preload = () => {
    if (!pending) {
      pending = factory().then(
        (module) => {
          loaded = module.default;
          return module;
        },
        (error) => {
          // Allow a retry (e.g. after a network blip) on the next attempt.
          pending = null;
          throw error;
        },
      );
    }
    return pending;
  };

  const Lazy = reactLazy(preload);

  const Page = ((props: P) => {
    const Loaded = loaded;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Loaded ? <Loaded {...(props as any)} /> : <Lazy {...(props as any)} />;
  }) as PreloadablePage<P>;
  Page.preload = preload;
  return Page;
}
