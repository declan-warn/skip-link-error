/** @jsx jsx */
import { useEffect } from 'react';

import { jsx } from '@emotion/core';

import {
  DEFAULT_BANNER_HEIGHT,
  VAR_BANNER_HEIGHT,
} from '../../common/constants';
import { SlotHeightProps } from '../../common/types';
import {
  getPageLayoutSlotSelector,
  resolveDimension,
} from '../../common/utils';
import { publishGridState, useSkipLinks } from '../../controllers';

import SlotDimensions from './slot-dimensions';
import { bannerStyles } from './styles';

const Banner = (props: SlotHeightProps) => {
  const {
    children,
    height = DEFAULT_BANNER_HEIGHT,
    isFixed = true,
    shouldPersistHeight,
    testId,
    skipLinkTitle,
    id,
  } = props;

  const bannerHeight = resolveDimension(
    VAR_BANNER_HEIGHT,
    height,
    shouldPersistHeight,
  );

  const { registerSkipLink, unregisterSkipLink } = useSkipLinks();

  useEffect(() => {
    publishGridState({ [VAR_BANNER_HEIGHT]: bannerHeight });
    return () => {
      publishGridState({ [VAR_BANNER_HEIGHT]: 0 });
      unregisterSkipLink(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerHeight, id]);

  useEffect(() => {
    if (id && skipLinkTitle) {
      registerSkipLink({ id, skipLinkTitle });
    }
  }, [id, skipLinkTitle, registerSkipLink]);

  return (
    <div
      css={bannerStyles(isFixed)}
      data-testid={testId}
      id={id}
      {...getPageLayoutSlotSelector('banner')}
    >
      <SlotDimensions variableName={VAR_BANNER_HEIGHT} value={bannerHeight} />
      {children}
    </div>
  );
};

export default Banner;
