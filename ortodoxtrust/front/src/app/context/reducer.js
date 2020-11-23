export const initialState = {
  modalAuth: {
    showModalAuth: false,
    authFormType: 'login',
    loginType: 'email',
    transactionToken: '',
    notification: '',
    animated: true,
    username: ''
  }
};

// authFormType: 'login', 'signUp', 'social', 'password', 'codeSMS', 'codeEmail'
// animated: true, false
// loginType (login form tabs): 'sms', 'email', 'password', 'signUp', 'social'

export const reducer = (state, action) => {
  const { type, authFormType, transactionToken, notification } = action;

  switch(type) {
    case 'openAuthModal':
      return {...state, modalAuth: {...state.modalAuth,
          showModalAuth: true,
          authFormType: 'login',
          loginType: 'email',
          notification: '',
          animated: true}};
    
    case 'openSignUpAuthModal':
      return {...state, modalAuth: {...state.modalAuth,
          showModalAuth: true,
          authFormType: 'signUp',
          loginType: 'email',
          notification: '',
          animated: true}};

    case 'closeAuthModal':
      return {...state, modalAuth: {...state.modalAuth, showModalAuth: false}};

    case 'reStartAuthForm':
      return {...state, modalAuth: {...state.modalAuth,
          authFormType:'login',
          loginType: 'email',
          animated: false,
          notification: ''}};

    case 'setNotification':
      return {...state, modalAuth: {...state.modalAuth, notification}};

    case 'changeLoginTabs':
      return {...state, modalAuth: {...state.modalAuth, ...action.pack}};

    case 'setAuthFormType':
      return {...state, modalAuth: {...state.modalAuth, authFormType, notification: ''}};

    case 'setTransactionToken':
      return {...state, modalAuth: {...state.modalAuth, transactionToken, authFormType}};

    default:
      return state;
  }
};
