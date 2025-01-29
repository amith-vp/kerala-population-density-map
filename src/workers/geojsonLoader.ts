self.onmessage = async (e) => {
  const url = e.data;
  try {
    const response = await fetch(url);
    const data = await response.json();
    self.postMessage({ type: 'success', data });
  } catch (error) {
    self.postMessage({ type: 'error', error: (error as Error).message });
  }
};

export {};
