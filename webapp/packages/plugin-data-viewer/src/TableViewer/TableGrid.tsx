/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import styled, { css } from 'reshadow';

import { TextPlaceholder } from '@cloudbeaver/core-blocks';
import type { ResultDataFormat } from '@cloudbeaver/core-sdk';

import type { IDatabaseDataModel } from '../DatabaseDataModel/IDatabaseDataModel';
import type { IDataPresentationOptions } from '../DataPresentationService';
import { TableStatistics } from './TableStatistics';

type TableGridProps = PropsWithChildren<{
  model: IDatabaseDataModel<any>;
  dataFormat: ResultDataFormat;
  presentation: IDataPresentationOptions;
  resultIndex: number;
}>;

const styles = css`
  Presentation {
    flex: 1;
    overflow: auto;
  }
`;

export const TableGrid = observer(function TableGrid({
  model,
  dataFormat,
  presentation,
  resultIndex,
}: TableGridProps) {
  if (
    (presentation.dataFormat !== undefined && dataFormat !== presentation.dataFormat)
    || !model.source.hasResult(resultIndex)
  ) {
    if (model.isLoading()) {
      return null;
    }

    // eslint-disable-next-line react/no-unescaped-entities
    return <TextPlaceholder>Current data can't be displayed by selected presentation</TextPlaceholder>;
  }

  const result = model.getResult(resultIndex);

  const Presentation = presentation.getPresentationComponent();

  if (result?.loadedFully && !result.data) {
    return <TableStatistics model={model} resultIndex={resultIndex} />;
  }

  return styled(styles)(
    <Presentation dataFormat={dataFormat} model={model} resultIndex={resultIndex} />
  );
});
