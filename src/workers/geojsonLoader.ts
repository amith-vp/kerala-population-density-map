self.onmessage = async (e) => {
  const url = e.data;
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features) {
      const total = data.features.length;
      const batchSize = 100;
      const features = [];

      for (let i = 0; i < total; i += batchSize) {
        const batch = data.features.slice(i, i + batchSize);
        features.push(...batch);
        self.postMessage({ type: 'progress', loaded: Math.min(i + batchSize, total), total });
        // Small delay to allow UI updates
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      self.postMessage({ type: 'success', data: features });
    } else {
      throw new Error('Invalid GeoJSON format');
    }
  } catch (error) {
    self.postMessage({ type: 'error', error: (error as Error).message });
  }
};

export {};
