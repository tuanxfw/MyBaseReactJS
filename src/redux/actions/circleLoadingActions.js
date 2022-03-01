export const toggleCircleLoading = (isOpen) => {
  return {
    type: 'circleLoading/toggleCircleLoading',
    payload: isOpen,
  };
};