self.onmessage = async (e) => {
  const url = e.data;
  try {
    const response = await fetch(url);
    if (!response.body) {
      throw new Error('Streaming not supported in this browser');
    }
    const totalBytes = Number(response.headers.get('Content-Length')) || 0;
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let loadedBytes = 0;
    let { value, done } = await reader.read();
    let rawText = "";
    while (!done) {
      loadedBytes += value.byteLength;
      // Report progress by bytes if totalBytes is known
      if (totalBytes) {
        self.postMessage({ type: 'progress', loaded: loadedBytes, total: totalBytes });
      }
      rawText += decoder.decode(value, { stream: true });
      ({ value, done } = await reader.read());
    }
    rawText += decoder.decode(); // flush

    let features = [];
    const trimmed = rawText.trim();
    // If a full GeoJSON object, it should contain a top-level "features" key.
    if (trimmed.startsWith('{') && trimmed.includes(`"features":`)) {
      const data = JSON.parse(trimmed);
      if (!data.features) {
        throw new Error('Invalid GeoJSON format');
      }
      // Force final progress update to complete
      if (totalBytes) {
        self.postMessage({ type: 'progress', loaded: totalBytes, total: totalBytes });
      }
      features = data.features;
    } else {
      // Otherwise, assume NDJSON format of arrays [density, coordinates]
      const lines = trimmed.split('\n').filter(line => line.trim());
      const total = lines.length;
      for (let i = 0; i < total; i++) {
        // Parse each line as an array: [density, coordinates]
        const rawArr = JSON.parse(lines[i]);
        const feature = {
          type: 'Feature',
          properties: { density: rawArr[0] },
          geometry: { type: 'Polygon', coordinates: rawArr[1] }
        };
        features.push(feature);
        if (i % 100 === 0) {
          self.postMessage({ type: 'progress', loaded: i + 1, total });
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
    }
    self.postMessage({ type: 'success', data: features });
  } catch (error) {
    self.postMessage({ type: 'error', error: (error as Error).message });
  }
};

export {};
