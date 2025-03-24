const getErrorMessage = (status: number) => {
    switch (status) {
      case 409:
      case 500:
      default:
        return {
          title: '서비스에 접속할 수 없습니다.',
          content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
        };
    }
};

export const getErrorContent = (error:any) => {
  // status 코드 있는 경우
  if (error?.response) {
    const { status } = error.response;
    return getErrorMessage(status);
  }

  // 없는 경우는 api 요청 함수에서 throw new Error() 필요
  return {
    title: '서비스에 접속할 수 없습니다.',
    content: error.message,
  };
};