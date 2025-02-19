/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { createDataContext } from '@cloudbeaver/core-data-context';

export interface IResultSetGroupingData {
  getColumns(): string[];
  setColumns(columns: string[]): void;
  removeColumn(...columns: string[]): void;
  addColumn(column: string): void;
  clear(): void;
  getFunctions(): string[];
  setFunctions(functions: string[]): void;
  getShowDuplicatesOnly(): boolean;
  setShowDuplicatesOnly(showDuplicatesOnly: boolean): void;
}

export const DATA_CONTEXT_DV_DDM_RS_GROUPING = createDataContext<IResultSetGroupingData>('data-viewer-database-data-model-result-set-grouping-data');
