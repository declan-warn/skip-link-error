/** @jsx jsx */
import { useEffect } from 'react';

import { jsx } from '@emotion/core';

import { VAR_LEFT_SIDEBAR_WIDTH } from '../../common/constants';
import { SlotWidthProps } from '../../common/types';
import {
  getPageLayoutSlotSelector,
  resolveDimension,
} from '../../common/utils';
import { publishGridState, useSkipLinks } from '../../controllers';

import {
  fixedLeftSidebarInnerStyles,
  leftSidebarStyles,
} from './left-sidebar-styles';
import SlotDimensions from './slot-dimensions';

const LeftSidebarWithoutResize = (props: SlotWidthProps) => {
  const {
    children,
    id,
    width,
    isFixed,
    shouldPersistWidth,
    testId,
    skipLinkTitle,
  } = props;

  const leftSidebarWidth = resolveDimension(
    VAR_LEFT_SIDEBAR_WIDTH,
    width,
    shouldPersistWidth,
  );

  const { registerSkipLink, unregisterSkipLink } = useSkipLinks();

  useEffect(() => {
    publishGridState({ [VAR_LEFT_SIDEBAR_WIDTH]: leftSidebarWidth });
    return () => {
      publishGridState({ [VAR_LEFT_SIDEBAR_WIDTH]: 0 });
      unregisterSkipLink(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftSidebarWidth, id]);

  useEffect(() => {
    if (id && skipLinkTitle) {
      registerSkipLink({ id, skipLinkTitle });
    }
  }, [id, skipLinkTitle, registerSkipLink]);

  return (
    <div
      id={id}
      data-testid={testId}
      css={leftSidebarStyles(isFixed)}
      {...getPageLayoutSlotSelector('left-sidebar')}
    >
      <SlotDimensions
        variableName={VAR_LEFT_SIDEBAR_WIDTH}
        value={leftSidebarWidth}
      />
      <div css={fixedLeftSidebarInnerStyles(isFixed)}>{children}</div>
    </div>
  );
};

export default LeftSidebarWithoutResize;
