/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import React from 'react';

export const ConnectionAuthenticationFormLoader = React.lazy(async () => {
  const { ConnectionAuthenticationForm } = await import('./ConnectionAuthenticationForm');
  return { default: ConnectionAuthenticationForm };
});
