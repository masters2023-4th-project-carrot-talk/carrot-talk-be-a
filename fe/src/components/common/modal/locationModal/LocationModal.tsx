import { Modal } from '@components/common/modal/Modal';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/usePopups';
import { useDeleteLocation, usePatchMainLocation } from '@queries/location';
import { useRegisteredLocationsStore } from '@stores/locationStore';
import { useState } from 'react';
import { ControlLocation } from './content/ControlLocation';
import { SearchLocation } from './content/SearchLocation';

type Props = {
  locationList?: LocationType[];
};

export const LocationModal: React.FC<Props> = ({ locationList }) => {
  const { isLogin } = useAuth();
  const patchMainLocationById = usePatchMainLocation();
  const deleteLocationById = useDeleteLocation();
  const { addLocation, deleteLocation } = useRegisteredLocationsStore();
  const { isModalOpen, currentDim } = useModal();
  const [toggleContent, setToggleContent] = useState<'control' | 'search'>(
    'control',
  );

  const onToggleContent = (content: 'control' | 'search') => {
    setToggleContent(content);
  };

  const onPatchLocationByAuth = (location: LocationType) => {
    if (isLogin) {
      patchMainLocationById(location, () => {
        onToggleContent('control');
      });
    } else {
      addLocation(location);
    }
  };

  const onDeleteLocationByAuth = isLogin ? deleteLocationById : deleteLocation;

  return (
    <Modal isOpen={isModalOpen} currentDim={currentDim}>
      {toggleContent === 'control' ? (
        <ControlLocation
          locationList={locationList}
          onToggleContent={onToggleContent}
          onPatchLocationByAuth={onPatchLocationByAuth}
          onDeleteLocationByAuth={onDeleteLocationByAuth}
        />
      ) : (
        <SearchLocation
          onToggleContent={onToggleContent}
          onPatchLocationByAuth={onPatchLocationByAuth}
        />
      )}
    </Modal>
  );
};
