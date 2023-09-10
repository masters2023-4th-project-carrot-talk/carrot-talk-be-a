import { checkNickname } from '@/api/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type NicknameInputType = {
  defaultWarning: string;
  initialNickname?: string;
  validateNickname?: (nickname: string) => boolean;
};

export const useNickname = ({
  defaultWarning,
  validateNickname = () => true,
}: NicknameInputType) => {
  const [isValidNicknameCheck, setIsValidNicknameCheck] = useState(false);
  const { nickname, onChangeNickname, isValidNickname, nicknameInputWarning } =
    useNicknameInput({
      validateNickname,
      defaultWarning,
    });
  const nicknameCheckResult = useNicknameCheckQuery(nickname);

  useEffect(() => {
    setIsValidNicknameCheck(false);
  }, [nickname]);

  const checkNicknameUnique = () => {
    nicknameCheckResult.refetch();
    setIsValidNicknameCheck(true);
  };

  return {
    nickname,
    isValidNickname,
    isUniqueNickname: isValidNicknameCheck && nicknameCheckResult.data?.isUnique,
    nicknameInputWarning: (isValidNickname && nicknameCheckResult.data?.message) || nicknameInputWarning,
    onChangeNickname,
    checkNicknameUnique,
  };
};

const useNicknameInput = ({
  defaultWarning,
  validateNickname = () => true,
}: NicknameInputType) => {
  const [nickname, setNickname] = useState('');

  const onChangeNickname = (value: string) => {
    setNickname(value);
  };

  const isValidNickname = validateNickname(nickname);
  const nicknameInputWarning = isValidNickname ? '' : defaultWarning;

  return {
    nickname,
    onChangeNickname,
    isValidNickname,
    nicknameInputWarning,
  };
};

const useNicknameCheckQuery = (nickname: string) =>
  useQuery({
    queryKey: ['uniqueNickname'],
    queryFn: () => checkNickname(nickname),
    select: (data) => ({
      isUnique: data.success,
      message: data?.errorCode?.message ?? '',
    }),
    enabled: false,
  });
