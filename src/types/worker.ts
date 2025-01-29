import type { Feature, Geometry } from 'geojson';
import type { BlockProperties } from '../pages/Index';

export type WorkerMessage = {
  type: 'success';
  data: Feature<Geometry, BlockProperties>[];
} | {
  type: 'error';
  error: string;
};
