// export const toggleDialog = (isOpen) => {
//   return {
//     type: 'dialog/toggleDialog',
//     payload: isOpen,
//   };
// };

// export const setContentDialog = (content) => {
//   return {
//     type: 'dialog/setContentDialog',
//     payload: content,
//   };
// };

// export const setOptionsDialog = (ontions) => {
//   return {
//     type: 'dialog/setOptionsDialog',
//     payload: ontions,
//   };
// };

export const setDialogItems = (items) => {
  return {
    type: 'dialog/setDialogItems',
    payload: items,
  };
};