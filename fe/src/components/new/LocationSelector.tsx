import { useAnimation } from '@/hooks/useAnimation';
import { Theme, css } from '@emotion/react';
import { useState } from 'react';
import { Button } from '../common/button/Button';
import { MapPinFilled } from '../common/icons';

type Props = {
  selectedLocation?: LocationType;
  locations?: LocationType[];
  onSelectLocation: (location: LocationType) => void;
};

export const LocationSelector: React.FC<Props> = ({
  selectedLocation,
  locations,
  onSelectLocation,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const { shouldRender, handleTransitionEnd, animationTrigger } =
    useAnimation(isListOpen);

  const openLocationContainer = () => {
    setIsListOpen(true);
  };

  const onSelectLocationButton = (locaiton: LocationType) => {
    onSelectLocation(locaiton);
    setIsListOpen(false);
  };

  return (
    <div css={(theme) => locationSelectorStyle(theme, animationTrigger)}>
      <Button variant="text" onClick={openLocationContainer}>
        <MapPinFilled className="location__pin-icon" />
        {selectedLocation?.name}
      </Button>
      {locations && shouldRender && (
        <ul
          className="location__container"
          onTransitionEnd={handleTransitionEnd}
        >
          {locations.map((location) => (
            <li key={location.id}>
              <Button
                variant="category"
                state={
                  selectedLocation?.id === location.id ? 'active' : 'default'
                }
                onClick={() => onSelectLocationButton(location)}
              >
                {location.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const locationSelectorStyle = (theme: Theme, animationTrigger: boolean) => css`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;

  .location__pin-icon {
    fill: ${theme.color.neutral.textStrong};
  }

  .location__container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    ${animationTrigger ? '' : 'transform: translateY(100%);'};
    background-color: ${theme.color.neutral.backgroundWeak};
    transition: 200ms ease;
  }
`;
