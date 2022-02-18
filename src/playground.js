const type = "someActionType";
const payload = {};

dispatch({
  type: 'someActionType',
  payload,
});

dispatch(someAction());
dispatch(someThunkAction());

const someAction = () => {
  return {
    type: 'someActionType',
    payload,
  }
}

const someActionOther = () => ({
    type: 'someActionType',
    payload,
})

const someThunkAction = () => {
  return async function(dispatch, getState) {
    try {
      dispatch(fetchSomethingStarted()); // loading = true

      const response = await fetchSomething();

      dispatch(fetchSomethingSuccess(response.data)); // store response.data, loading: false
    } catch(e) {
      dispatch(fetchSomethingFailed(e)); // loading: false
    }
  }
}

const someOtherThunkAction = () => (dispatch, getState) => {
  try {
    dispatch(fetchSomethingStarted());

    const response = await fetchSomething();

    dispatch(fetchSomethingSuccess(response.data));
  } catch(e) {
    dispatch(fetchSomethingFailed());
  }
}
