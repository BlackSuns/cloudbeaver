/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { App } from '@cloudbeaver/core-di';

import { DATA_CONTEXT_DI_PROVIDER } from './DATA_CONTEXT_DI_PROVIDER';
import type { IDataContext } from './IDataContext';

export function dataContextAddDIProvider(context: IDataContext, app: App): IDataContext {
  context.set(DATA_CONTEXT_DI_PROVIDER, app.getServiceInjector());
  return context;
}
