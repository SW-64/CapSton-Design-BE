export const MESSAGES = {
  AUTH: {
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다.',
      NOT_MATCHED_WITH_PASSWORD: '비밀번호가 일치하지 않습니다.',
      EXISTED_EMAIL: '중복된 이메일입니다.',
    },
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
      NOT_FOUND: '사용자 정보가 없습니다.',
    },
  },
  USER: {
    GET_MY_INFO: {
      SUCCEED: '정보 확인이 성공했습니다.',
      NOT_FOUND_ID: '해당되는 유저 ID가 없습니다.',
    },
  },
  CITY: {
    SET_SPOT: {
      SUCCEED: '명소 등록에 성공했습니다.',
      EXISTED_SPOT_NAME: '중복되는 명소 이름이 있습니다.',
      NOT_FOUND_CITY: '해당되는 대도시가 없습니다.',
      NOT_FOUND_DISTRICT: '해당 도시에 맞는 행정구역이 없습니다.',
    },
    GET_CITY_SPOTS: {
      SUCCEED: '해당 도시의 전체 명소 조회 성공했습니다.',
      NOT_FOUND_CITY: '해당되는 대도시가 없습니다.',
    },
    GET_DISTRICT_SPOTS: {
      SUCCEED: '해당 행정구역의 전체 명소 조회 성공했습니다.',
      NOT_FOUND_DISTRICT: '해당 행정구역이 없습니다.',
    },
    GET_FREE_IMAGES_API: {
      SUCCEED: '저작권 무료 API 사진 조회에 성공했습니다.',
      REQUEST_API_ERROR: 'API 요청 중 오류가 발생했습니다.',
    },
  },
};
