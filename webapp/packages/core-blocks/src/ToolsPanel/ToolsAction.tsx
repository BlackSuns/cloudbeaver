/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { ButtonHTMLAttributes } from 'react';

import { IconOrImage } from '../IconOrImage';
import { s } from '../s';
import { useS } from '../useS';
import style from './ToolsAction.m.css';

interface Props extends ButtonHTMLAttributes<any> {
  icon?: string;
  viewBox?: string;
  className?: string;
}

export const ToolsAction: React.FC<Props> = function ToolsAction({ icon, viewBox, children, className, ...rest }) {
  const styles = useS(style);

  return (
    <button type="button" {...rest} className={s(styles, { button: true }, className)}>
      {icon && <IconOrImage className={s(styles, { iconOrImage: true })} icon={icon} viewBox={viewBox} />}
      {children && <div className={s(styles, { buttonLabel: true })}>{children}</div>}
    </button>
  );
};
