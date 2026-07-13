export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth'): () => void {
  const id = decodeURIComponent(hash.replace(/^#/, ''));

  if (!id) return () => undefined;

  let firstFrameId = 0;
  let secondFrameId = 0;

  firstFrameId = window.requestAnimationFrame(() => {
    secondFrameId = window.requestAnimationFrame(() => {
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior,
        block: 'start',
      });
    });
  });

  return () => {
    window.cancelAnimationFrame(firstFrameId);
    window.cancelAnimationFrame(secondFrameId);
  };
}
