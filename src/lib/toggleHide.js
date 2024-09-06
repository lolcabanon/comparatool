/**
 * @type {(tool: Tool) => Promise<void>}
 */
export const toggleHide = async (tool) => {
  tool.hide = !tool.hide;
  await fetch(`/hide/${tool.id}`, {
    method: 'POST',
    body: JSON.stringify({ hide: tool.hide })
  });
};
