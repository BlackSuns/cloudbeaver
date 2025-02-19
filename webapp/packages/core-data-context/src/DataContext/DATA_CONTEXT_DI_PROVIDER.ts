/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { IServiceInjector } from '@cloudbeaver/core-di';

import { createDataContext } from './createDataContext';

export const DATA_CONTEXT_DI_PROVIDER = createDataContext<IServiceInjector>('DI Provider');
