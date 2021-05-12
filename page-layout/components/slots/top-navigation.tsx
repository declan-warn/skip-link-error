/** @jsx jsx */
import { useEffect } from 'react';

import { jsx } from '@emotion/core';

import {
  DEFAULT_TOP_NAVIGATION_HEIGHT,
  VAR_TOP_NAVIGATION_HEIGHT,
} from '../../common/constants';
import { SlotHeightProps } from '../../common/types';
import {
  getPageLayoutSlotSelector,
  resolveDimension,
} from '../../common/utils';
import { publishGridState, useSkipLinks } from '../../controllers';

import SlotDimensions from './slot-dimensions';
import { topNavigationStyles } from './styles';

const TopNavigation = (props: SlotHeightProps) => {
  const {
    children,
    height = DEFAULT_TOP_NAVIGATION_HEIGHT,
    isFixed = true,
    shouldPersistHeight,
    testId,
    id,
    skipLinkTitle,
  } = props;

  const topNavigationHeight = resolveDimension(
    VAR_TOP_NAVIGATION_HEIGHT,
    height,
    shouldPersistHeight,
  );

  const { registerSkipLink, unregisterSkipLink } = useSkipLinks();

  useEffect(() => {
    publishGridState({ [VAR_TOP_NAVIGATION_HEIGHT]: topNavigationHeight });
    return () => {
      publishGridState({ [VAR_TOP_NAVIGATION_HEIGHT]: 0 });
      unregisterSkipLink(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topNavigationHeight, id]);

  useEffect(() => {
    if (id && skipLinkTitle) {
      registerSkipLink({ id, skipLinkTitle });
    }
  }, [id, skipLinkTitle, registerSkipLink]);

  return (
    <div
      css={topNavigationStyles(isFixed)}
      data-testid={testId}
      id={id}
      {...getPageLayoutSlotSelector('top-navigation')}
    >
      <SlotDimensions
        variableName={VAR_TOP_NAVIGATION_HEIGHT}
        value={topNavigationHeight}
      />
      {children}
    </div>
  );
};

export default TopNavigation;
