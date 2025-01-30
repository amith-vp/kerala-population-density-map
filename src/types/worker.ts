import type { Feature, Geometry } from 'geojson';
import type { BlockProperties } from '../pages/Index';

export type WorkerMessage = {
  type: 'success';
  data: Feature<Geometry, BlockProperties>[];
} | {
  type: 'progress';
  loaded: number;
  total: number;
} | {
  type: 'error';
  error: string;
};
