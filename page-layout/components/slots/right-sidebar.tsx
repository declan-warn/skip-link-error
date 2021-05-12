/** @jsx jsx */
import { useEffect } from 'react';

import { jsx } from '@emotion/core';

import {
  DEFAULT_RIGHT_SIDEBAR_WIDTH,
  VAR_RIGHT_SIDEBAR_WIDTH,
} from '../../common/constants';
import { SlotWidthProps } from '../../common/types';
import {
  getPageLayoutSlotSelector,
  resolveDimension,
} from '../../common/utils';
import { publishGridState, useSkipLinks } from '../../controllers';

import SlotDimensions from './slot-dimensions';
import { fixedRightSidebarInnerStyles, rightSidebarStyles } from './styles';

const RightSidebar = (props: SlotWidthProps) => {
  const {
    children,
    width = DEFAULT_RIGHT_SIDEBAR_WIDTH,
    isFixed,
    shouldPersistWidth,
    testId,
    id,
    skipLinkTitle,
  } = props;

  const rightSidebarWidth = resolveDimension(
    VAR_RIGHT_SIDEBAR_WIDTH,
    width,
    shouldPersistWidth,
  );

  const { registerSkipLink, unregisterSkipLink } = useSkipLinks();

  useEffect(() => {
    publishGridState({ [VAR_RIGHT_SIDEBAR_WIDTH]: rightSidebarWidth });
    return () => {
      publishGridState({ [VAR_RIGHT_SIDEBAR_WIDTH]: 0 });
      unregisterSkipLink(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSidebarWidth, id]);

  useEffect(() => {
    if (id && skipLinkTitle) {
      registerSkipLink({ id, skipLinkTitle });
    }
  }, [id, skipLinkTitle, registerSkipLink]);

  return (
    <div
      data-testid={testId}
      css={rightSidebarStyles(isFixed)}
      id={id}
      {...getPageLayoutSlotSelector('right-sidebar')}
    >
      <SlotDimensions
        variableName={VAR_RIGHT_SIDEBAR_WIDTH}
        value={rightSidebarWidth}
      />
      <div css={fixedRightSidebarInnerStyles(isFixed)}>{children}</div>
    </div>
  );
};

export default RightSidebar;
