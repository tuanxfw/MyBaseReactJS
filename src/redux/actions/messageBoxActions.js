export const toggleMessageBox = (isOpen) => {
  return {
    type: 'messageBox/toggleMessageBox',
    payload: isOpen,
  };
};

export const setMessageData = (messageData) => {
  return {
    type: 'messageBox/setMessageData',
    payload: messageData,
  };
};